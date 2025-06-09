import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, createTheme, CssBaseline, Container } from '@mui/material';
import MainLayout from './components/layout/MainLayout';
import RouteOptimization from './pages/RouteOptimization';
import Home from './pages/Home';
import VehicleManagement from './pages/VehicleManagement';
import Analytics from './pages/Analytics';
import ACOSolver from './components/ACOSolver';

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <MainLayout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/route" element={<RouteOptimization />} />
            <Route path="/vehicles" element={<VehicleManagement />} />
            <Route path="/analytics" element={<Analytics />} />
          </Routes>
        </MainLayout>
      </Router>
      <Container>
        <ACOSolver />
      </Container>
    </ThemeProvider>
  );
}

export default App; 