export interface TSPInput {
  distances: number[][];
  startNode?: number;
  parameters?: ACOParameters;
}

export interface TSPResult {
  path: number[];
  distance: number;
  iterations: number;
  executionTime: number;
  convergenceHistory?: number[];
}

export interface ACOParameters {
  alpha: number;      // Pheromone importance
  beta: number;       // Distance importance
  rho: number;        // Pheromone evaporation rate
  Q: number;          // Pheromone deposit factor
  antCount: number;   // Number of ants
  iterations: number; // Number of iterations
  elitism: boolean;   // Whether to use elitism
} 