import { LocationsTracing } from '../../locaitons-tracing/entities';
import { PeopleTracing } from '../../people-tracing/entities';
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

@Entity({ name: 'people' })
export class Person extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: true, type: 'varchar', length: 50 })
  name: string;

  @Column({ name: 'mobile', nullable: true, type: 'varchar', length: 20 })
  mobile: string;

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
    name: 'health_status',
  })
  healthStatus: typeStatusArray;

  @Column({
    name: 'location_id',
    nullable: true,
    type: 'varchar',
  })
  locationId: string;

  @CreateDateColumn({ nullable: true, name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ nullable: true, name: 'updated_at' })
  updatedAt: Date;

  @DeleteDateColumn({ nullable: true, name: 'deleted_at' })
  deletedAt: Date;

  @OneToMany(() => PeopleTracing, (peopleTracing) => peopleTracing.personFirst)
  @OneToMany(() => PeopleTracing, (peopleTracing) => peopleTracing.personSecond)
  peopleTracing: PeopleTracing[];

  @OneToMany(() => LocationsTracing, (peopleTracing) => peopleTracing.person)
  locationsTracing: PeopleTracing[];
}
