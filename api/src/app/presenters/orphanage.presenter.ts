import { Orphanage } from '@entities/Orphanage'
import imagePresenter from '@presenters/image.presenter'

export default {
  render(orphanage: Orphanage) {
    const { images, ...rest } = orphanage

    return {
      ...rest,
      images: imagePresenter.renderMany(images),
    }
  },

  renderMany(orphanages: Orphanage[]) {
    return orphanages.map((orphanage) => this.render(orphanage))
  },
}
