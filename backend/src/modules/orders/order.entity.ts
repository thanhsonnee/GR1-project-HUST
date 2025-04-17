import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity()
export class Order {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  customerName!: string;

  @Column()
  status!: string; // PENDING, PROCESSING, IN_TRANSIT, DELIVERED, CANCELLED

  @Column()
  pickupAddress!: string;

  @Column()
  deliveryAddress!: string;

  @Column('decimal', { precision: 10, scale: 2 })
  weight!: number;

  @Column('decimal', { precision: 10, scale: 2 })
  volume!: number;

  @Column({ nullable: true })
  assignedVehicleId!: number;

  @Column({ nullable: true })
  estimatedDeliveryTime!: Date;

  @Column({ nullable: true })
  actualDeliveryTime!: Date;

  @Column({ type: 'jsonb', nullable: true })
  trackingHistory!: {
    status: string;
    location: {
      lat: number;
      lng: number;
    };
    timestamp: Date;
  }[];

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
} 