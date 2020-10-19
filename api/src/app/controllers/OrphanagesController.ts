import { Request, Response } from 'express'
import { getCustomRepository } from 'typeorm'
import * as yup from 'yup'

import orphanagePresenter from '@presenters/orphanage.presenter'
import { OrphanagesRepository } from '@repositories/OrphanagesRepository'

export class OrphanagesController {
  static async store(req: Request, res: Response) {
    const {
      name,
      whatsapp,
      latitude,
      longitude,
      about,
      instructions,
      opening_hours,
      open_on_weekends,
    } = req.body

    const repository = getCustomRepository(OrphanagesRepository)
    const requestImages = req.files as Express.Multer.File[]

    const images = requestImages.map((image) => {
      return {
        path: image.filename,
      }
    })

    const data = {
      name,
      whatsapp,
      latitude,
      longitude,
      about,
      instructions,
      opening_hours,
      open_on_weekends: open_on_weekends === 'true',
      images,
    }

    const schema = yup.object().shape({
      name: yup.string().max(255).required(),
      whatsapp: yup.string().max(20).required(),
      latitude: yup.number().required(),
      longitude: yup.number().required(),
      about: yup.string().max(300).required(),
      instructions: yup.string().required(),
      opening_hours: yup.string().max(255).required(),
      open_on_weekends: yup.boolean().required(),
      images: yup.array(
        yup.object().shape({
          path: yup.string().required(),
        })
      ),
    })

    await schema.validate(data, {
      abortEarly: false,
    })

    const orphanage = await repository.createNewOrphanage(data)

    return res.status(201).json(orphanagePresenter.render(orphanage))
  }

  static async index(_: Request, res: Response) {
    const repository = getCustomRepository(OrphanagesRepository)
    const orphanages = await repository.getAllOrphanages()

    return res.status(200).json(orphanagePresenter.renderMany(orphanages))
  }

  static async show(req: Request, res: Response) {
    const { id } = req.params

    const repository = getCustomRepository(OrphanagesRepository)
    const orphanage = await repository.getOrphanageById(id)

    if (!orphanage) {
      return res.status(404).json({ error: 'Orphanage not found' })
    }

    return res.status(200).json(orphanagePresenter.render(orphanage))
  }
}
