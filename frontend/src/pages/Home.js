import React from 'react';
import { Typography, Container, Box, Paper } from '@mui/material';

function Home() {
  return (
    <Container maxWidth="lg">
      <Box sx={{ my: 4 }}>
        <Typography variant="h3" component="h1" gutterBottom>
          Welcome to Route Optimization System
        </Typography>
        <Paper elevation={3} sx={{ p: 3, mt: 3 }}>
          <Typography variant="h5" gutterBottom>
            Features
          </Typography>
          <Typography variant="body1" paragraph>
            • Route Optimization using Genetic Algorithm
          </Typography>
          <Typography variant="body1" paragraph>
            • Vehicle Management
          </Typography>
          <Typography variant="body1" paragraph>
            • Analytics and Reporting
          </Typography>
        </Paper>
      </Box>
    </Container>
  );
}

export default Home; 