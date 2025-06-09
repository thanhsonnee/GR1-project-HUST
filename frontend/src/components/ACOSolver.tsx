import React, { useState } from 'react';
import axios from 'axios';
import {
  Box,
  Button,
  TextField,
  Typography,
  Paper,
  CircularProgress,
  Grid,
  Slider,
  FormControlLabel,
  Switch,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { TSPResult, ACOParameters } from '../../types/tsp.types';

const ACOSolver: React.FC = () => {
  const [distances, setDistances] = useState<string>('');
  const [result, setResult] = useState<TSPResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [parameters, setParameters] = useState<ACOParameters>({
    alpha: 1.0,
    beta: 2.0,
    rho: 0.5,
    Q: 100,
    antCount: 10,
    iterations: 100,
    elitism: true,
  });

  const handleParameterChange = (param: keyof ACOParameters) => (
    event: Event,
    value: number | boolean
  ) => {
    setParameters((prev) => ({
      ...prev,
      [param]: value,
    }));
  };

  const handleSolve = async () => {
    try {
      setLoading(true);
      setError(null);

      // Parse the distances matrix
      const distancesMatrix = distances
        .trim()
        .split('\n')
        .map((row) => row.split(',').map(Number));

      // Validate the matrix
      if (!distancesMatrix.every((row) => row.length === distancesMatrix.length)) {
        throw new Error('Invalid matrix: must be square');
      }

      const response = await axios.post('http://localhost:3000/aco/solve', {
        distances: distancesMatrix,
        parameters,
      });

      setResult(response.data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ maxWidth: 1200, mx: 'auto', p: 3 }}>
      <Paper elevation={3} sx={{ p: 3 }}>
        <Typography variant="h4" gutterBottom>
          ACO TSP Solver
        </Typography>

        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Typography variant="h6" gutterBottom>
              Distance Matrix
            </Typography>
            <Typography variant="body2" color="text.secondary" paragraph>
              Enter the distance matrix (comma-separated values, one row per line):
            </Typography>
            <TextField
              fullWidth
              multiline
              rows={4}
              value={distances}
              onChange={(e) => setDistances(e.target.value)}
              placeholder="0,10,15,20&#10;10,0,35,25&#10;15,35,0,30&#10;20,25,30,0"
              variant="outlined"
              sx={{ mb: 2 }}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <Accordion>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography variant="h6">Algorithm Parameters</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <Typography gutterBottom>Alpha (Pheromone Importance)</Typography>
                    <Slider
                      value={parameters.alpha}
                      onChange={handleParameterChange('alpha')}
                      min={0.1}
                      max={5}
                      step={0.1}
                      valueLabelDisplay="auto"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Typography gutterBottom>Beta (Distance Importance)</Typography>
                    <Slider
                      value={parameters.beta}
                      onChange={handleParameterChange('beta')}
                      min={0.1}
                      max={5}
                      step={0.1}
                      valueLabelDisplay="auto"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Typography gutterBottom>Rho (Evaporation Rate)</Typography>
                    <Slider
                      value={parameters.rho}
                      onChange={handleParameterChange('rho')}
                      min={0}
                      max={1}
                      step={0.01}
                      valueLabelDisplay="auto"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Typography gutterBottom>Q (Pheromone Deposit)</Typography>
                    <Slider
                      value={parameters.Q}
                      onChange={handleParameterChange('Q')}
                      min={1}
                      max={1000}
                      step={1}
                      valueLabelDisplay="auto"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Typography gutterBottom>Number of Ants</Typography>
                    <Slider
                      value={parameters.antCount}
                      onChange={handleParameterChange('antCount')}
                      min={1}
                      max={50}
                      step={1}
                      valueLabelDisplay="auto"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Typography gutterBottom>Iterations</Typography>
                    <Slider
                      value={parameters.iterations}
                      onChange={handleParameterChange('iterations')}
                      min={10}
                      max={500}
                      step={10}
                      valueLabelDisplay="auto"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <FormControlLabel
                      control={
                        <Switch
                          checked={parameters.elitism}
                          onChange={(e) =>
                            handleParameterChange('elitism')(e, e.target.checked)
                          }
                        />
                      }
                      label="Use Elitism"
                    />
                  </Grid>
                </Grid>
              </AccordionDetails>
            </Accordion>
          </Grid>
        </Grid>

        <Button
          variant="contained"
          color="primary"
          onClick={handleSolve}
          disabled={loading}
          sx={{ mt: 2 }}
        >
          {loading ? <CircularProgress size={24} /> : 'Solve TSP'}
        </Button>

        {error && (
          <Typography color="error" sx={{ mt: 2 }}>
            {error}
          </Typography>
        )}

        {result && (
          <Box sx={{ mt: 3 }}>
            <Typography variant="h6" gutterBottom>
              Results:
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
                <Typography>
                  <strong>Best Path:</strong> {result.path.join(' → ')}
                </Typography>
                <Typography>
                  <strong>Total Distance:</strong> {result.distance.toFixed(2)}
                </Typography>
                <Typography>
                  <strong>Execution Time:</strong> {result.executionTime}ms
                </Typography>
                <Typography>
                  <strong>Iterations:</strong> {result.iterations}
                </Typography>
              </Grid>
              {result.convergenceHistory && (
                <Grid item xs={12} md={6}>
                  <Typography variant="subtitle1" gutterBottom>
                    Convergence History:
                  </Typography>
                  <Box sx={{ height: 200, overflow: 'auto' }}>
                    {result.convergenceHistory.map((distance, index) => (
                      <Typography key={index} variant="body2">
                        Iteration {index + 1}: {distance.toFixed(2)}
                      </Typography>
                    ))}
                  </Box>
                </Grid>
              )}
            </Grid>
          </Box>
        )}
      </Paper>
    </Box>
  );
};

export default ACOSolver; 