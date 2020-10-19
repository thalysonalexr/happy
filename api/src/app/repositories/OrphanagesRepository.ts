import { EntityRepository, Repository } from 'typeorm'

import { Orphanage } from '@entities/Orphanage'
import { CreateOrphanageDto } from '@repositories/dtos/CreateOrphanageDto'

@EntityRepository(Orphanage)
export class OrphanagesRepository extends Repository<Orphanage> {
  async createNewOrphanage(
    orphanageDTO: CreateOrphanageDto
  ): Promise<Orphanage> {
    const orphanage = new Orphanage()
    Object.assign(orphanage, orphanageDTO)

    const resulted = await this.save(orphanage)

    return resulted
  }

  async getAllOrphanages(): Promise<Orphanage[]> {
    const orphanages = await this.find({ relations: ['images'] })
    return orphanages
  }

  async getOrphanageById(id: string): Promise<Orphanage> {
    const orphanage = await this.findOneOrFail({
      relations: ['images'],
      where: {
        id,
      },
    })

    return orphanage
  }
}
