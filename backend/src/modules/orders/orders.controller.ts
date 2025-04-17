import { Controller, Get, Post, Body, Param, Put, Delete, Patch } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderDto, UpdateOrderDto } from './dto/order.dto';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post()
  create(@Body() createOrderDto: CreateOrderDto) {
    return this.ordersService.create(createOrderDto);
  }

  @Get()
  findAll() {
    return this.ordersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.ordersService.findOne(+id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateOrderDto: UpdateOrderDto) {
    return this.ordersService.update(+id, updateOrderDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.ordersService.remove(+id);
  }

  @Patch(':id/status')
  updateStatus(
    @Param('id') id: string,
    @Body('status') status: string,
    @Body('location') location?: { lat: number; lng: number },
  ) {
    return this.ordersService.updateStatus(+id, status, location);
  }

  @Patch(':id/assign-vehicle')
  assignVehicle(
    @Param('id') id: string,
    @Body('vehicleId') vehicleId: number,
  ) {
    return this.ordersService.assignVehicle(+id, vehicleId);
  }
} 