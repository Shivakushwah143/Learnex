import {
  Button,
  Card,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const CourseItem = ({ course, showPurchaseButton = false }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handlePurchase = async (courseId) => {
    setLoading(true);
    setError(null);
    
    console.log(`this is your courseId:`, courseId); // Better logging
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/login");
        return;
      }

      console.log(token)
      // Extra validation to handle cases where courseId might be an object
      const actualCourseId = typeof courseId === 'object' ? courseId._id : courseId;
      
      if (typeof actualCourseId !== 'string' || actualCourseId.length !== 24) {
        throw new Error("Invalid course ID");
      }

      const response = await fetch(
        `http://localhost:8080/users/courses/${actualCourseId}`,
        {
          method: "POST",
          headers: {
            "Authorization": `Bearer ${token}`,
           
          }
        }
      );

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || "Purchase failed");
      }

      alert("Course purchased successfully!");
    } catch (err) {
      setError(err.message);
      alert(`Purchase error: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card sx={{ maxWidth: 345, mx: "auto" }}>
      <CardMedia
        component="img"
        height="200"
        image={course.image}
        alt="Course Image"
        sx={{ objectFit: "cover" }}
      />
      <CardContent>
        <Typography variant="h6">Title: {course.tittle}</Typography>
        <Typography variant="body1">Price: ₹{course.price}</Typography>
        <Typography color={course.publish ? "green" : "red"}>
          {course.publish ? "Published" : "Not Published"}
        </Typography>

        {showPurchaseButton && (
          <Button
            variant="contained"
            color="primary"
            fullWidth
            size="large"
            sx={{ mt: 2 }}
            disabled={!course.publish || loading}
            onClick={() => handlePurchase(course._id)} // Fixed: Pass course._id explicitly
          >
            {loading ? "Processing..." : "Purchase"}
          </Button>
        )}
        {error && <Typography color="error">{error}</Typography>}
      </CardContent>
    </Card>
  );
};

export default CourseItem;