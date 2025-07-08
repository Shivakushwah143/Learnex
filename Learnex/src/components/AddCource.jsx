import { Typography, Button, TextField, Box } from "@mui/material";
import { useState } from "react";

const AddCourse = () => {
  const [tittle, settittle] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");
  const [discription, setdiscription] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!tittle || !price || !image || !discription) {
      alert("Please fill all fields");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("http://localhost:8080/admin/courses", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
        body: JSON.stringify({
          tittle: tittle,
          discription: discription,
          image: image,
          publish: true,
          price: price,
        }),
      });
      const data = await res.json();
      console.log(data);
      alert("Course added successfully!");
      // Reset form
      settittle("");
      setPrice("");
      setImage("");
      setdiscription("");
    } catch (error) {
      console.log("Error", error);
      alert("Error in adding course");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Add New Course
      </Typography>
      <Box
        sx={{ display: "flex", flexDirection: "column", gap: 2, maxWidth: 600 }}
      >
        <TextField
          fullWidth
          label="tittle"
          value={tittle}
          onChange={(e) => settittle(e.target.value)}
          required
        />
        <TextField
          fullWidth
          label="Price"
          type="number"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          required
        />
        <TextField
          fullWidth
          label="Image URL"
          value={image}
          onChange={(e) => setImage(e.target.value)}
          required
        />
        <TextField
          fullWidth
          label="discription
"
          multiline
          rows={4}
          value={discription}
          onChange={(e) => setdiscription(e.target.value)}
          required
        />
        <Button
          variant="contained"
          onClick={handleSubmit}
          disabled={loading}
          sx={{ mt: 2 }}
        >
          {loading ? "Adding..." : "Add Course"}
        </Button>
      </Box>
    </Box>
  );
};

export default AddCourse;
