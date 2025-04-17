import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Order } from './order.entity';
import { CreateOrderDto, UpdateOrderDto } from './dto/order.dto';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order)
    private ordersRepository: Repository<Order>,
  ) {}

  async create(createOrderDto: CreateOrderDto): Promise<Order> {
    const order = this.ordersRepository.create(createOrderDto);
    return this.ordersRepository.save(order);
  }

  async findAll(): Promise<Order[]> {
    return this.ordersRepository.find();
  }

  async findOne(id: number): Promise<Order> {
    const order = await this.ordersRepository.findOne({ where: { id } });
    if (!order) {
      throw new Error('Order not found');
    }
    return order;
  }

  async update(id: number, updateOrderDto: UpdateOrderDto): Promise<Order> {
    await this.ordersRepository.update(id, updateOrderDto);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.ordersRepository.delete(id);
  }

  async updateStatus(id: number, status: string, location?: { lat: number; lng: number }): Promise<Order> {
    const order = await this.findOne(id);
    if (!order) {
      throw new Error('Order not found');
    }

    order.status = status;
    if (location) {
      order.trackingHistory = order.trackingHistory || [];
      order.trackingHistory.push({
        status,
        location,
        timestamp: new Date(),
      });
    }

    return this.ordersRepository.save(order);
  }

  async assignVehicle(orderId: number, vehicleId: number): Promise<Order> {
    const order = await this.findOne(orderId);
    if (!order) {
      throw new Error('Order not found');
    }

    order.assignedVehicleId = vehicleId;
    return this.ordersRepository.save(order);
  }
} 