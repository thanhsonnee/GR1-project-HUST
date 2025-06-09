import { Controller, Post, Body, ValidationPipe } from '@nestjs/common';
import { AcoService } from './aco.service';
import { TSPInput, TSPResult } from './interfaces/tsp.interface';

@Controller('aco')
export class AcoController {
  constructor(private readonly acoService: AcoService) {}

  @Post('solve')
  async solveTSP(@Body(ValidationPipe) input: TSPInput): Promise<TSPResult> {
    this.validateInput(input);
    this.acoService.initializeGraph(input.distances.length, input.distances);
    return this.acoService.solveTSP(input);
  }

  private validateInput(input: TSPInput): void {
    if (!input.distances || !Array.isArray(input.distances)) {
      throw new Error('Distances matrix is required and must be an array');
    }

    const size = input.distances.length;
    if (size === 0) {
      throw new Error('Distances matrix cannot be empty');
    }

    // Validate matrix is square and contains valid numbers
    for (let i = 0; i < size; i++) {
      if (!Array.isArray(input.distances[i]) || input.distances[i].length !== size) {
        throw new Error('Distances matrix must be square');
      }
      for (let j = 0; j < size; j++) {
        if (typeof input.distances[i][j] !== 'number' || isNaN(input.distances[i][j])) {
          throw new Error('All distances must be valid numbers');
        }
        if (i === j && input.distances[i][j] !== 0) {
          throw new Error('Diagonal elements must be 0');
        }
      }
    }

    // Validate startNode if provided
    if (input.startNode !== undefined) {
      if (input.startNode < 0 || input.startNode >= size) {
        throw new Error('Start node must be a valid index in the distances matrix');
      }
    }

    // Validate parameters if provided
    if (input.parameters) {
      if (input.parameters.alpha !== undefined && input.parameters.alpha <= 0) {
        throw new Error('Alpha must be positive');
      }
      if (input.parameters.beta !== undefined && input.parameters.beta <= 0) {
        throw new Error('Beta must be positive');
      }
      if (input.parameters.rho !== undefined && (input.parameters.rho < 0 || input.parameters.rho > 1)) {
        throw new Error('Rho must be between 0 and 1');
      }
      if (input.parameters.Q !== undefined && input.parameters.Q <= 0) {
        throw new Error('Q must be positive');
      }
      if (input.parameters.antCount !== undefined && input.parameters.antCount <= 0) {
        throw new Error('Ant count must be positive');
      }
      if (input.parameters.iterations !== undefined && input.parameters.iterations <= 0) {
        throw new Error('Iterations must be positive');
      }
    }
  }
} 