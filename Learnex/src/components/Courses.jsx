import { useEffect, useState } from "react";
import CourseItem from "../pages/CourseItem";
import { Alert, CircularProgress } from "@mui/material";

const Courses = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const token = localStorage.getItem("token");
        if (!token) {
          throw new Error("No authentication token found");
        }

        const res = await fetch("http://localhost:8080/users/courses", {
          method: "GET",
          headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json"
          },
        });

  
        // Check if the response is HTML (error case)
        const text = await res.text();
        if (text.startsWith("<!DOCTYPE html>")) {
          throw new Error("Server returned HTML error page");
        }

        // Try to parse as JSON
        const data = JSON.parse(text);
       
        if (!res.ok) {
          throw new Error(data.message || "Failed to fetch courses");
        }

        if (!Array.isArray(data.courses)) {
          throw new Error("Invalid courses data format");
        }

        setCourses(data.courses);
      } catch (err) {
        console.error("Fetch error:", err);
        setError(err.message);
        setCourses([]); // Reset courses on error
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  console.log(courses)
  if (loading) {
    return (
      <div className="flex justify-center mt-8">
        <CircularProgress />
      </div>
    );
  }

  if (error) {
    return (
      <Alert severity="error" className="m-4">
        Error loading courses: {error}
        <br />
        <Button 
          variant="outlined" 
          onClick={() => window.location.reload()}
          sx={{ mt: 2 }}
        >
          Try Again
        </Button>
      </Alert>
    );
  }

  if (courses.length === 0) {
    return (
      <Alert severity="info" className="m-4">
        No courses available
      </Alert>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-4 p-4">
      {courses.map((course) => (
        <CourseItem key={course._id} course={course} showPurchaseButton={true} />
      ))}
    </div>
  );
};

export default Courses;