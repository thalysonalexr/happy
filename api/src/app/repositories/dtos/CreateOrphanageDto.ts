export interface CreateOrphanageDto {
  name: string
  whatsapp: string
  latitude: number
  longitude: number
  about: string
  instructions: string
  opening_hours: string
  open_on_weekends: boolean
  images: { path: string }[]
}
