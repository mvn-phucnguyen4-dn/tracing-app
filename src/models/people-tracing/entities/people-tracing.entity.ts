import { Person } from '../../people/entities';
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

@Entity({ name: 'people-tracing' })
export class PeopleTracing extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    nullable: true,
    type: 'date',
    name: 'status_update_date',
  })
  statusUpdateDate: Date;

  @Column({
    nullable: true,
    type: 'varchar',
    enum: ['Cohabitant', 'Neighbour', 'Other'],
    name: 'contact_type',
  })
  contactType: typeContactArray;

  @Column({
    name: 'person_1',
    nullable: false,
    type: 'varchar',
  })
  personIdFirst: string;

  @Column({
    name: 'person_2',
    nullable: false,
    type: 'varchar',
  })
  personIdSecond: string;

  @CreateDateColumn({ nullable: false, name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ nullable: true, name: 'updated_at' })
  updatedAt: Date;

  @DeleteDateColumn({ nullable: true, name: 'deleted_at' })
  deletedAt: Date;

  @ManyToOne(() => Person, (person) => person.peopleTracing)
  @JoinColumn({ name: 'person_1' })
  personFirst: Person;

  @ManyToOne(() => Person, (person) => person.peopleTracing)
  @JoinColumn({ name: 'person_2' })
  personSecond: Person;
}
