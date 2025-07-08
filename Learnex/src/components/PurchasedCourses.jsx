import React, { useEffect, useState } from 'react';
import {
  Button,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Container,
  Grid,
  CircularProgress,
  Alert
} from "@mui/material";
import { useNavigate } from "react-router-dom";

const PurchasedCourses = () => {
  const [purchasedCourses, setPurchasedCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPurchasedCourses = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          navigate("/login");
          return;
        }

        const response = await fetch("http://localhost:8080/users/purchasedCourses", {
          headers: {
            "Authorization": `Bearer ${token}`,
          }
        });

        const data = await response.json();
        if (!response.ok) {
          throw new Error(data.message || "Failed to fetch purchased courses");
        }

        setPurchasedCourses(data.purchasedCourses || []);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPurchasedCourses();
  }, [navigate]);

  if (loading) {
    return (
      <Container sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
        <CircularProgress />
      </Container>
    );
  }

  if (error) {
    return (
      <Container sx={{ mt: 4 }}>
        <Alert severity="error">{error}</Alert>
      </Container>
    );
  }

  return (
    <Container sx={{ py: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom sx={{ mb: 4 }}>
        My Purchased Courses
      </Typography>
      
      {purchasedCourses.length === 0 ? (
        <Typography variant="body1">You haven't purchased any courses yet.</Typography>
      ) : (
        <Grid container spacing={3}>
          {purchasedCourses.map((course) => (
            <Grid item key={course._id} xs={12} sm={6} md={4}>
              <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                <CardMedia
                  component="img"
                  height="200"
                  image={course.image}
                  alt={course.title}
                  sx={{ objectFit: "cover" }}
                />
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography variant="h6">Title: {course.title}</Typography>
                  <Typography variant="body1">Price: ₹{course.price}</Typography>
                  <Typography color={course.publish ? "green" : "red"}>
                    {course.publish ? "Published" : "Not Published"}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </Container>
  );
};

export default PurchasedCourses;