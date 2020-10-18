import {
  PrimaryGeneratedColumn,
  Column,
  Entity,
  ManyToOne,
  JoinColumn,
} from 'typeorm'

import { Orphanage } from '@entities/Orphanage'

@Entity('images')
export class Image {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column('varchar')
  path: string

  @ManyToOne(() => Orphanage, (orphanage) => orphanage.images)
  @JoinColumn({ name: 'orphanage_id' })
  orphanage: Orphanage
}
