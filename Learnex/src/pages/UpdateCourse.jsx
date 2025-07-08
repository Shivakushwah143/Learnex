import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  CircularProgress,
  Container,
  TextField,
  Button,
} from "@mui/material";
import CourseItem from "./CourseItem"; 

const UpdateCourse = () => {
  let { courseId } = useParams();
  const [course, setCourse] = useState(null);
  useEffect(() => {
    const fetchSingleCourse = async () => {
      const res = await fetch(
        `http://localhost:8080/admin/courses/${courseId}`,
        {
          method: "GET",
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );
      const data = await res.json();
      setCourse(data.singleCourse);
      console.log(data);
    };
    fetchSingleCourse();
  }, [courseId]);

  if (!course) return <div>Loading...</div>;

  return (
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      <CourseItem course={course} />
      <UpdateForm course={course} />
    </Container>
  );
};

const UpdateForm = ({ course }) => {
  const [tittle, setTitle] = useState(course.title || "");
  const [description, setDescription] = useState(course.description || "");
  const [image, setImage] = useState(course.image || "");
  const navigate = useNavigate();
  const { courseId } = useParams();

  const handleUpdate = async () => {
    if (!tittle || !description || !image) {
      alert("All fields are required");
      return;
    }

    try {
      const res = await fetch(
        "http://localhost:8080/admin/courses/  " + courseId,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
          body: JSON.stringify({
            tittle,
            description,
            image,
            publish: true,
          }),
        }
      );

      const data = await res.json();
      console.log("Update response:", data);
      alert("Course updated successfully!");
      navigate("/admin/courses");
    } catch (error) {
      console.error("Error updating course:", error);
      alert("Failed to update course.");
    }
  };

  return (
    <Card sx={{ mt: 4, p: 2 }}>
      <Typography variant="h6" gutterBottom>
        Update Course Details
      </Typography>
      <TextField
        label="Tittle"
        fullWidth
        margin="normal"
        value={tittle}
        onChange={(e) => setTitle(e.target.value)}
      />
      <TextField
        label="description"
        fullWidth
        margin="normal"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <TextField
        label="Image"
        fullWidth
        margin="normal"
        value={image}
        onChange={(e) => setImage(e.target.value)}
      />
      <Button
        variant="contained"
        color="primary"
        sx={{ mt: 2 }}
        onClick={handleUpdate}
      >
        Update Course
      </Button>
    </Card>
  );
};

export default UpdateCourse;
