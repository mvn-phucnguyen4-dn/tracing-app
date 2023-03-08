import { Person } from '../../people/entities';
import { Location } from '../../locations/entities';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

export type typeContactArray = 'Cohabitant' | 'Other' | 'Neighbour';

@Entity({ name: 'locations-tracing' })
export class LocationsTracing extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'location_id', nullable: true, type: 'varchar' })
  locationId: string;

  @Column({
    nullable: true,
    type: 'date',
    name: 'visit_date',
  })
  visitDate: Date;

  @Column({
    name: 'person_id',
    nullable: false,
    type: 'varchar',
  })
  personId: string;

  @CreateDateColumn({ nullable: false, name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ nullable: true, name: 'updated_at' })
  updatedAt: Date;

  @DeleteDateColumn({ nullable: true, name: 'deleted_at' })
  deletedAt: Date;

  @ManyToOne(() => Location, (location) => location.locationsTracing)
  @JoinColumn({ name: 'location_id' })
  location: Location;

  @ManyToOne(() => Person, (person) => person.locationsTracing)
  @JoinColumn({ name: 'person_id' })
  person: Person;
}
