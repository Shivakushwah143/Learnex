
const secret = process.env.JWT_SECRET || "your-strong-secret-key"; 
import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import cors from "cors";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;
// const secret = "shhh";

app.use(cors());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(express.json());

const userSchema = new mongoose.Schema({
  userName: { type: String },
  password: { type: String },
  purchaseCources:  [{ type: mongoose.Types.ObjectId, ref: "Course" }]
  ,
});

const adminSchema = new mongoose.Schema({
  userName: String,
  password: String,
});

const CourseSchema = new mongoose.Schema({
  tittle: String,
  discription: String,
  price: Number,
  publish: Boolean,
  image: String,
});

const User = mongoose.model("User", userSchema);
const Course = mongoose.model("Course", CourseSchema);

const Admin = mongoose.model("Admin", adminSchema);

const authenticateAdminJwt = (req, res, next) => {
  const authHeader = req.headers.authorization;
  console.log(authHeader);
  if (authHeader) {
    const token = authHeader.split(" ")[1];
    console.log(token);
    jwt.verify(token, secret, (err, user) => {
      if (err) {
        return res.sendStatus(403);
      }
      req.user = user;
      console.log(req.user);
      next();
    });
  } else {
    res.sendStatus(401);
  }
};



// Add this user authentication middleware
const authenticateUserJwt = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (authHeader) {
    const token = authHeader.split(' ')[1];
    jwt.verify(token, secret, (err, user) => {
      if (err) {
        return res.sendStatus(403);
      }
      req.user = user;
      next();
    });
  } else {
    res.sendStatus(401);
  }
};

// Get all published courses for users
app.get("/users/courses", authenticateUserJwt, async (req, res) => {
  try {
    const courses = await Course.find({ publish: true });
    res.json({ courses });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
});
// Purchase a course
app.post("/users/courses/:courseId", authenticateUserJwt, async (req, res) => {
  try {
    // Validate courseId format first
    if (!mongoose.Types.ObjectId.isValid(req.params.courseId)) {
      return res.status(400).json({ message: "Invalid course ID format" });
    }

    const course = await Course.findById(req.params.courseId);
    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    if (!course.publish) {
      return res.status(400).json({ message: "Course is not published" });
    }

    const user = await User.findOne({ userName: req.user.userName });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Check if already purchased - convert both to strings for comparison
    if (user.purchaseCources.some(purchasedId => purchasedId.toString() === course._id.toString())) {
      return res.status(400).json({ message: "Course already purchased" });
    }

    user.purchaseCources.push(course._id);
    await user.save();
    
    res.json({ message: "Course purchased successfully" });
  } catch (err) {
    console.error("Purchase error:", err);
    res.status(500).json({ message: "Internal server error", error: err.message });
  }
});
// Get user's purchased courses
app.get("/users/purchasedCourses", authenticateUserJwt, async (req, res) => {
  try {
    const user = await User.findOne({ userName: req.user.userName })
      .populate("purchaseCources");
      
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({ purchasedCourses: user.purchaseCources || [] });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
});
app.post("/admin/signup", async (req, res) => {
  const { userName, password } = req.body;
  console.log(req.body);
  const hashPass = await bcrypt.hash(password, 8);

  const newUser = new Admin({ userName, password: hashPass });
  await newUser.save();
  const token = jwt.sign({ userName, role: "admin" }, secret, {
    expiresIn: "1h",
  });

  res.status(200).json({ messag: "admin user created", token });
});

app.post("/admin/login", async (req, res) => {
  try {
    const { userName, password } = req.body;

    if (!userName || !password) {
      return res.status(400).json({ message: "All fields required" });
    }

    const admin = await Admin.findOne({ userName });
    if (!admin) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Compare hashed password
    const passwordValid = await bcrypt.compare(password, admin.password);
    if (!passwordValid) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign({ userName, role: "admin" }, secret, {
      expiresIn: "1h",
    });

    res.json({ message: "Admin logged in", token });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

app.post("/user/signup", async (req, res) => {
  try {
    const { userName, password } = req.body;

    if (!userName || !password) {
      return res.status(400).json({ message: "All fields required" });
    }

    const existingUser = await User.findOne({ userName });
    if (existingUser) {
      return res.status(409).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      userName,
      password: hashedPassword,
    });

    await newUser.save();

    const token = jwt.sign({ userName, role: "user" }, secret, {
      expiresIn: "1h",
    });

    res.status(201).json({ message: "User created", token });
  } catch (error) {
    console.error("User signup error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

app.post("/user/login", async (req, res) => {
  
  const { userName, password } = req.body;

    if (!userName || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const user = await User.findOne({ userName });

    if (!user) {
      return res.status(401).json({ message: "Invalid credentials (user not found)" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid credentials (wrong password)" });
    }

    const token = jwt.sign(
      { userName: user.userName, role: "user" },
      secret,
      { expiresIn: "1h" }
    );

    res.status(200).json({ message: "Login successful", token });

});

// // course created
app.post("/admin/courses", authenticateAdminJwt, async (req, res) => {
  try {
    console.log(`admin user name user: ${req.user.userName}`);
    console.log(req.user);

    const course = new Course(req.body);
    course.id = Course.length + 1;
    await course.save();
    res.status(201).json({
      message: "Course created",
      courseId: course.id,
    });
  } catch (error) {
    console.error("Course creation error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

app.post("/admin/signup", async (req, res) => {
  const { userName, password } = req.body;
  console.log(req.body);
  const hashedPassword = await bcrypt.hash(password, 8);
  const newuser = new Admin({ userName, password: hashedPassword });
  await newuser.save();
  const token = jwt.sign({ userName, role: "admin" }, secret, {
    expiresIn: "1h",
  });
  console.log(token);
  res.status(201).json({ message: " signup success", token });
});

app.get("/admin/courses", authenticateAdminJwt, async (req, res) => {
  const courses = await Course.find({});
  res.json({ courses });
  console.log(courses);
});
app.put("/admin/courses/:courseId", authenticateAdminJwt, async (req, res) => {
  try {
    const course = await Course.findByIdAndUpdate(
      req.params.courseId,
      req.body,
      { new: true }
    );
    console.log(req.params.courseId);
    console.log(course);
    res.json({ message: "course updated successfullu", course });
  } catch (error) {
    console.log("error in update");
  }
});

app.get("/admin/courses/:courseId", authenticateAdminJwt, async (req, res) => {
  try {
    const singleCourse = await Course.findById(req.params.courseId);
    if (!singleCourse) {
      return res.status(404).json({ message: "course not found" });
    }
    res.status(200).json({ message: "success", singleCourse });
  } catch (error) {
    console.log("course not found");
  }
});


app.get("/admin/me", authenticateAdminJwt, async (req, res) => {
  res.json({
    userName: req.user.userName,
  });
});



app.get("/users/courses", authenticateAdminJwt, async (req, res) => {
  const user = await User.findOne({ userName: req.user.userName }).populate("purchaseCources");
  if (user) {
    res.status(200).json({
      message: "Purchased courses",
      purchasedCourses: user.purchaseCources || [],
    });
  } else {
    res.status(404).json({ message: "User not found" });
  }
});


// DATABASE CONNECTION
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("Database connected");
  })
  .catch((err) => {
    console.log("Error connecting to database:", err);
  });

// START SERVER
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
