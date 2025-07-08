import React from "react";
import { Box, Container, Grid, Typography, Link, Button } from "@mui/material";

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: "#2E3B55",
        color: "white",
        py: 6,
        mt: "auto",
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          {/* Company Info */}
          <Grid item xs={12} md={4}>
            <Typography variant="h5" gutterBottom sx={{ fontWeight: "bold" }}>
              Lernex
            </Typography>
            <Typography variant="body1" sx={{ mb: 2 }}>
              Empowering your learning journey with top-quality courses from industry experts.
            </Typography>
            <Box sx={{ display: 'flex', gap: 1 }}>
              <Button 
                variant="outlined" 
                size="small" 
                sx={{ 
                  color: 'white', 
                  borderColor: 'white',
                  '&:hover': { borderColor: '#ddd' }
                }}
                href="#"
              >
                Facebook
              </Button>
              <Button 
                variant="outlined" 
                size="small" 
                sx={{ 
                  color: 'white', 
                  borderColor: 'white',
                  '&:hover': { borderColor: '#ddd' }
                }}
                href="#"
              >
                Twitter
              </Button>
              <Button 
                variant="outlined" 
                size="small" 
                sx={{ 
                  color: 'white', 
                  borderColor: 'white',
                  '&:hover': { borderColor: '#ddd' }
                }}
                href="#"
              >
                LinkedIn
              </Button>
            </Box>
          </Grid>

          {/* Quick Links */}
          <Grid item xs={6} md={2}>
            <Typography variant="h6" gutterBottom sx={{ fontWeight: "bold" }}>
              Quick Links
            </Typography>
            <Link href="/courses" color="inherit" underline="hover" display="block" mb={1}>
              Browse Courses
            </Link>
            <Link href="/about" color="inherit" underline="hover" display="block" mb={1}>
              About Us
            </Link>
            <Link href="/instructors" color="inherit" underline="hover" display="block" mb={1}>
              Instructors
            </Link>
            <Link href="/contact" color="inherit" underline="hover" display="block" mb={1}>
              Contact
            </Link>
          </Grid>

          {/* Support */}
          <Grid item xs={6} md={2}>
            <Typography variant="h6" gutterBottom sx={{ fontWeight: "bold" }}>
              Support
            </Typography>
            <Link href="/faq" color="inherit" underline="hover" display="block" mb={1}>
              FAQ
            </Link>
            <Link href="/privacy" color="inherit" underline="hover" display="block" mb={1}>
              Privacy Policy
            </Link>
            <Link href="/terms" color="inherit" underline="hover" display="block" mb={1}>
              Terms of Service
            </Link>
            <Link href="/refund" color="inherit" underline="hover" display="block" mb={1}>
              Refund Policy
            </Link>
          </Grid>

          {/* Contact Info */}
          <Grid item xs={12} md={4}>
            <Typography variant="h6" gutterBottom sx={{ fontWeight: "bold" }}>
              Contact Us
            </Typography>
            <Typography variant="body1" sx={{ mb: 1 }}>
              <strong>Email:</strong> support@lernex.com
            </Typography>
            <Typography variant="body1" sx={{ mb: 1 }}>
              <strong>Phone:</strong> +1 (555) 123-4567
            </Typography>
            <Typography variant="body1" sx={{ mb: 1 }}>
              <strong>Address:</strong> 123 Learning St, Education City
            </Typography>
            <Typography variant="body1">
              <strong>Hours:</strong> Mon-Fri, 9am-5pm
            </Typography>
          </Grid>
        </Grid>

        {/* Copyright */}
        <Box sx={{ pt: 4, mt: 4, borderTop: "1px solid rgba(255, 255, 255, 0.1)" }}>
          <Typography variant="body2" align="center">
            © {new Date().getFullYear()} Lernex. All rights reserved.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;