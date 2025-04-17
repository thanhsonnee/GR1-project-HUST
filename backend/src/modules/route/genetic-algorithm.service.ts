import { Injectable } from '@nestjs/common';

export interface Location {
  id: string;
  name: string;
  address: string;
  latitude: number;
  longitude: number;
}

interface Route {
  sequence: number[];
  fitness: number;
}

@Injectable()
export class GeneticAlgorithmService {
  private populationSize = 50;
  private generations = 100;
  private mutationRate = 0.01;

  // Tính khoảng cách giữa 2 điểm
  private calculateDistance(point1: Location, point2: Location): number {
    const R = 6371; // Bán kính trái đất (km)
    const dLat = this.toRad(point2.latitude - point1.latitude);
    const dLon = this.toRad(point2.longitude - point1.longitude);
    const lat1 = this.toRad(point1.latitude);
    const lat2 = this.toRad(point2.latitude);

    const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.sin(dLon/2) * Math.sin(dLon/2) * Math.cos(lat1) * Math.cos(lat2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return R * c;
  }

  private toRad(value: number): number {
    return value * Math.PI / 180;
  }

  // Tạo quần thể ban đầu
  private initializePopulation(size: number): Route[] {
    const population: Route[] = [];
    for (let i = 0; i < this.populationSize; i++) {
      const sequence = Array.from({length: size}, (_, i) => i);
      this.shuffle(sequence);
      population.push({
        sequence,
        fitness: 0
      });
    }
    return population;
  }

  // Đánh giá độ phù hợp (fitness)
  private evaluateFitness(route: Route, locations: Location[]): number {
    let totalDistance = 0;
    for (let i = 0; i < route.sequence.length - 1; i++) {
      const current = locations[route.sequence[i]];
      const next = locations[route.sequence[i + 1]];
      totalDistance += this.calculateDistance(current, next);
    }
    return 1 / totalDistance; // Càng ngắn càng tốt
  }

  // Lai ghép (crossover)
  private crossover(parent1: Route, parent2: Route): Route {
    const size = parent1.sequence.length;
    const start = Math.floor(Math.random() * size);
    const end = Math.floor(Math.random() * (size - start)) + start;
    
    const childSequence = new Array(size).fill(-1);
    const segment = parent1.sequence.slice(start, end + 1);
    
    for (let i = start; i <= end; i++) {
      childSequence[i] = parent1.sequence[i];
    }
    
    let j = 0;
    for (let i = 0; i < size; i++) {
      if (childSequence[i] === -1) {
        while (segment.includes(parent2.sequence[j])) {
          j++;
        }
        childSequence[i] = parent2.sequence[j++];
      }
    }
    
    return { sequence: childSequence, fitness: 0 };
  }

  // Đột biến (mutation)
  private mutate(route: Route): void {
    if (Math.random() < this.mutationRate) {
      const i = Math.floor(Math.random() * route.sequence.length);
      const j = Math.floor(Math.random() * route.sequence.length);
      [route.sequence[i], route.sequence[j]] = [route.sequence[j], route.sequence[i]];
    }
  }

  // Thuật toán chính
  public findOptimalRoute(locations: Location[]): Location[] {
    let population = this.initializePopulation(locations.length);
    
    for (let gen = 0; gen < this.generations; gen++) {
      // Đánh giá quần thể
      population.forEach(route => {
        route.fitness = this.evaluateFitness(route, locations);
      });
      
      // Sắp xếp theo độ phù hợp
      population.sort((a, b) => b.fitness - a.fitness);
      
      // Tạo quần thể mới
      const newPopulation: Route[] = [];
      
      // Giữ lại các cá thể tốt nhất (elitism)
      const eliteSize = Math.floor(this.populationSize * 0.1);
      newPopulation.push(...population.slice(0, eliteSize));
      
      // Lai ghép và đột biến
      while (newPopulation.length < this.populationSize) {
        const parent1 = this.selectParent(population);
        const parent2 = this.selectParent(population);
        const child = this.crossover(parent1, parent2);
        this.mutate(child);
        newPopulation.push(child);
      }
      
      population = newPopulation;
    }
    
    // Trả về tuyến đường tốt nhất
    const bestRoute = population[0].sequence;
    return bestRoute.map(index => locations[index]);
  }

  private selectParent(population: Route[]): Route {
    // Tournament selection
    const tournamentSize = 5;
    let best = population[Math.floor(Math.random() * population.length)];
    for (let i = 0; i < tournamentSize - 1; i++) {
      const contestant = population[Math.floor(Math.random() * population.length)];
      if (contestant.fitness > best.fitness) {
        best = contestant;
      }
    }
    return best;
  }

  private shuffle(array: number[]): void {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  }
} 