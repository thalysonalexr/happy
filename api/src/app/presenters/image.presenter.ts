import { Image } from '@entities/Image'

export default {
  render(image: Image) {
    const { id, path } = image

    return {
      id,
      url: `http://localhost:3333/v1/uploads/${path}`,
    }
  },

  renderMany(images: Image[]) {
    return images.map((image) => this.render(image))
  },
}
