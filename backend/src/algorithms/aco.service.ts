import { Injectable } from '@nestjs/common';
import { TSPInput, TSPResult, ACOParameters } from './interfaces/tsp.interface';

@Injectable()
export class AcoService {
  private readonly defaultParameters: ACOParameters = {
    alpha: 1.0,
    beta: 2.0,
    rho: 0.5,
    Q: 100,
    antCount: 10,
    iterations: 100,
    elitism: true
  };

  private pheromones: number[][];
  private distances: number[][];
  private bestPath: number[];
  private bestDistance: number;
  private convergenceHistory: number[];
  private parameters: ACOParameters;

  constructor() {
    this.reset();
  }

  private reset(): void {
    this.bestDistance = Infinity;
    this.bestPath = [];
    this.convergenceHistory = [];
  }

  initializeGraph(size: number, distances: number[][]): void {
    this.distances = distances;
    this.pheromones = Array(size)
      .fill(0)
      .map(() => Array(size).fill(1.0));
  }

  solveTSP(input: TSPInput): TSPResult {
    const startTime = Date.now();
    this.reset();
    
    if (!this.distances || this.distances.length === 0) {
      throw new Error('Graph not initialized');
    }

    // Merge default parameters with input parameters
    this.parameters = { ...this.defaultParameters, ...input.parameters };
    const startNode = input.startNode || 0;

    for (let iteration = 0; iteration < this.parameters.iterations; iteration++) {
      const antPaths = this.constructSolutions(startNode);
      this.updatePheromones(antPaths);
      this.updateBestPath(antPaths);
      this.convergenceHistory.push(this.bestDistance);
    }

    const executionTime = Date.now() - startTime;

    return {
      path: this.bestPath,
      distance: this.bestDistance,
      iterations: this.parameters.iterations,
      executionTime,
      convergenceHistory: this.convergenceHistory
    };
  }

  private constructSolutions(startNode: number): number[][] {
    const antPaths: number[][] = [];
    const size = this.distances.length;

    for (let ant = 0; ant < this.parameters.antCount; ant++) {
      const path = this.constructAntPath(startNode);
      antPaths.push(path);
    }

    return antPaths;
  }

  private constructAntPath(startNode: number): number[] {
    const size = this.distances.length;
    const path: number[] = [startNode];
    const unvisited = new Set<number>(
      Array.from({ length: size }, (_, i) => i).filter((i) => i !== startNode)
    );

    while (unvisited.size > 0) {
      const current = path[path.length - 1];
      const next = this.selectNextNode(current, Array.from(unvisited));
      path.push(next);
      unvisited.delete(next);
    }

    return path;
  }

  private selectNextNode(current: number, unvisited: number[]): number {
    const probabilities = this.calculateProbabilities(current, unvisited);
    const random = Math.random();
    let sum = 0;

    for (let i = 0; i < probabilities.length; i++) {
      sum += probabilities[i];
      if (random <= sum) {
        return unvisited[i];
      }
    }

    return unvisited[unvisited.length - 1];
  }

  private calculateProbabilities(current: number, unvisited: number[]): number[] {
    const probabilities: number[] = [];
    let sum = 0;

    for (const next of unvisited) {
      const pheromone = Math.pow(this.pheromones[current][next], this.parameters.alpha);
      const distance = Math.pow(1 / this.distances[current][next], this.parameters.beta);
      const probability = pheromone * distance;
      probabilities.push(probability);
      sum += probability;
    }

    return probabilities.map((p) => p / sum);
  }

  private updatePheromones(antPaths: number[][]): void {
    // Evaporate pheromones
    for (let i = 0; i < this.pheromones.length; i++) {
      for (let j = 0; j < this.pheromones[i].length; j++) {
        this.pheromones[i][j] *= 1 - this.parameters.rho;
      }
    }

    // Deposit new pheromones
    for (const path of antPaths) {
      const distance = this.calculatePathDistance(path);
      const pheromoneToAdd = this.parameters.Q / distance;

      for (let i = 0; i < path.length - 1; i++) {
        const from = path[i];
        const to = path[i + 1];
        this.pheromones[from][to] += pheromoneToAdd;
        this.pheromones[to][from] += pheromoneToAdd;
      }
    }

    // Apply elitism if enabled
    if (this.parameters.elitism && this.bestPath.length > 0) {
      const bestDistance = this.calculatePathDistance(this.bestPath);
      const elitePheromone = this.parameters.Q / bestDistance;

      for (let i = 0; i < this.bestPath.length - 1; i++) {
        const from = this.bestPath[i];
        const to = this.bestPath[i + 1];
        this.pheromones[from][to] += elitePheromone;
        this.pheromones[to][from] += elitePheromone;
      }
    }
  }

  private calculatePathDistance(path: number[]): number {
    let distance = 0;
    for (let i = 0; i < path.length - 1; i++) {
      distance += this.distances[path[i]][path[i + 1]];
    }
    // Add distance back to start
    distance += this.distances[path[path.length - 1]][path[0]];
    return distance;
  }

  private updateBestPath(antPaths: number[][]): void {
    for (const path of antPaths) {
      const distance = this.calculatePathDistance(path);
      if (distance < this.bestDistance) {
        this.bestDistance = distance;
        this.bestPath = [...path];
      }
    }
  }
}
