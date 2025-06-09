import React from 'react';
import { Typography, Container, Box, Paper, Grid } from '@mui/material';

function Analytics() {
  return (
    <Container maxWidth="lg">
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Analytics Dashboard
        </Typography>

        <Grid container spacing={3}>
          {/* Route Optimization Stats */}
          <Grid item xs={12} md={6}>
            <Paper sx={{ p: 3 }}>
              <Typography variant="h6" gutterBottom>
                Route Optimization Statistics
              </Typography>
              <Typography variant="body1">
                Total Routes Optimized: 150
              </Typography>
              <Typography variant="body1">
                Average Distance Saved: 15%
              </Typography>
              <Typography variant="body1">
                Average Time Saved: 20%
              </Typography>
            </Paper>
          </Grid>

          {/* Vehicle Utilization */}
          <Grid item xs={12} md={6}>
            <Paper sx={{ p: 3 }}>
              <Typography variant="h6" gutterBottom>
                Vehicle Utilization
              </Typography>
              <Typography variant="body1">
                Total Vehicles: 25
              </Typography>
              <Typography variant="body1">
                Active Vehicles: 18
              </Typography>
              <Typography variant="body1">
                Utilization Rate: 72%
              </Typography>
            </Paper>
          </Grid>

          {/* Cost Analysis */}
          <Grid item xs={12} md={6}>
            <Paper sx={{ p: 3 }}>
              <Typography variant="h6" gutterBottom>
                Cost Analysis
              </Typography>
              <Typography variant="body1">
                Fuel Cost Saved: $5,000
              </Typography>
              <Typography variant="body1">
                Maintenance Cost: $2,500
              </Typography>
              <Typography variant="body1">
                Total Savings: $2,500
              </Typography>
            </Paper>
          </Grid>

          {/* Performance Metrics */}
          <Grid item xs={12} md={6}>
            <Paper sx={{ p: 3 }}>
              <Typography variant="h6" gutterBottom>
                Performance Metrics
              </Typography>
              <Typography variant="body1">
                On-time Deliveries: 95%
              </Typography>
              <Typography variant="body1">
                Customer Satisfaction: 92%
              </Typography>
              <Typography variant="body1">
                Route Efficiency: 85%
              </Typography>
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}

export default Analytics; 