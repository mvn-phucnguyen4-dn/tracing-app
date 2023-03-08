import { LocationsTracing } from '../../locaitons-tracing/entities';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

export type typeStatusArray = 'Green' | 'Yellow' | 'Orange' | 'Red';

@Entity({ name: 'locations' })
export class Location extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: true, type: 'varchar', length: 50 })
  name: string;

  @Column({ name: 'address', nullable: true, type: 'varchar', length: 30 })
  address: string;

  @Column({ name: 'pincode', nullable: true, type: 'varchar', length: 20 })
  pincode: string;

  @Column({ name: 'red_score', nullable: true, type: 'integer' })
  redScore: number;

  @Column({
    nullable: true,
    type: 'date',
    name: 'status_update_date',
  })
  statusUpdateDate: Date;

  @Column({
    nullable: true,
    type: 'varchar',
    enum: ['Green', 'Yellow', 'Orange', 'Red'],
    name: 'status',
  })
  status: typeStatusArray;

  @CreateDateColumn({ nullable: false, name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ nullable: true, name: 'updated_at' })
  updatedAt: Date;

  @DeleteDateColumn({ nullable: true, name: 'deleted_at' })
  deletedAt: Date;

  @OneToMany(
    () => LocationsTracing,
    (locationsTracing) => locationsTracing.location,
  )
  locationsTracing: LocationsTracing[];
}
