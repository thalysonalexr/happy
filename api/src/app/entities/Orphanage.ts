import {
  PrimaryGeneratedColumn,
  Column,
  Entity,
  OneToMany,
  JoinColumn,
} from 'typeorm'

import { Image } from '@entities/Image'

@Entity('orphanages')
export class Orphanage {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({ type: 'varchar', length: 255 })
  name: string

  @Column({ type: 'varchar', length: 20 })
  whatsapp: string

  @Column('decimal')
  latitude: number

  @Column('decimal')
  longitude: number

  @Column('text')
  about: string

  @Column('text')
  instructions: string

  @Column({ type: 'varchar', length: 255 })
  opening_hours: string

  @Column('bool')
  open_on_weekends: boolean

  @OneToMany(() => Image, (image) => image.orphanage, {
    cascade: ['insert', 'update'],
  })
  @JoinColumn({ name: 'orphanage_id' })
  images: Image[]
}
