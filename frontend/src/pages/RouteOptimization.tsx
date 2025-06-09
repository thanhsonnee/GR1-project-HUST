// frontend/src/pages/RouteOptimization.tsx

import React, { useState } from 'react';
import { 
  Typography, 
  Container, 
  Box, 
  Paper, 
  TextField, 
  Button,
  Grid,
  List,
  ListItem,
  ListItemText,
  Divider 
} from '@mui/material';

interface Location {
  name: string;
  address: string;
  warehouseAddress: string;
  orderWeight: number;
}

function RouteOptimization() {
  const [locations, setLocations] = useState<Location[]>([]);
  const [currentLocation, setCurrentLocation] = useState<Location>({
    name: '',
    address: '',
    warehouseAddress: '',
    orderWeight: 0
  });

  const handleAddLocation = () => {
    if (currentLocation.name && currentLocation.address) {
      setLocations([...locations, currentLocation]);
      setCurrentLocation({
        name: '',
        address: '',
        warehouseAddress: '',
        orderWeight: 0
      });
    }
  };

  const handleOptimizeRoute = () => {
    // API call để tối ưu tuyến đường
    console.log('Optimizing route for:', locations);
  };

  return (
    <Container maxWidth="lg">
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Route Optimization
        </Typography>

        <Grid container spacing={3}>
          {/* Form nhập thông tin */}
          <Grid item xs={12} md={6}>
            <Paper sx={{ p: 3 }}>
              <Typography variant="h6" gutterBottom>
                Add Locations
              </Typography>

              <TextField
                fullWidth
                label="Recipient Name"
                value={currentLocation.name}
                onChange={(e) => setCurrentLocation({
                  ...currentLocation,
                  name: e.target.value
                })}
                margin="normal"
              />

              <TextField
                fullWidth
                label="Delivery Address"
                value={currentLocation.address}
                onChange={(e) => setCurrentLocation({
                  ...currentLocation,
                  address: e.target.value
                })}
                margin="normal"
              />

              <TextField
                fullWidth
                label="Warehouse Address"
                value={currentLocation.warehouseAddress}
                onChange={(e) => setCurrentLocation({
                  ...currentLocation,
                  warehouseAddress: e.target.value
                })}
                margin="normal"
              />

              <TextField
                fullWidth
                type="number"
                label="Order Weight (kg)"
                value={currentLocation.orderWeight}
                onChange={(e) => setCurrentLocation({
                  ...currentLocation,
                  orderWeight: Number(e.target.value)
                })}
                margin="normal"
              />

              <Button
                variant="contained"
                color="primary"
                onClick={handleAddLocation}
                fullWidth
                sx={{ mt: 2 }}
              >
                Add Location
              </Button>
            </Paper>
          </Grid>

          {/* Hiển thị danh sách và kết quả */}
          <Grid item xs={12} md={6}>
            <Paper sx={{ p: 3 }}>
              <Typography variant="h6" gutterBottom>
                Optimized Route
              </Typography>

              <List>
                {locations.map((location, index) => (
                  <React.Fragment key={index}>
                    <ListItem>
                      <ListItemText
                        primary={location.name}
                        secondary={
                          <>
                            <Typography variant="body2">
                              Delivery Address: {location.address}
                            </Typography>
                            <Typography variant="body2">
                              Warehouse: {location.warehouseAddress}
                            </Typography>
                            <Typography variant="body2">
                              Weight: {location.orderWeight} kg
                            </Typography>
                          </>
                        }
                      />
                    </ListItem>
                    <Divider />
                  </React.Fragment>
                ))}
              </List>

              {locations.length > 0 && (
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleOptimizeRoute}
                  fullWidth
                  sx={{ mt: 2 }}
                >
                  Optimize Route
                </Button>
              )}
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}

export default RouteOptimization;