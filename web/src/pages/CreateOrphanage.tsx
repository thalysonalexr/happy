import React, { useState, useEffect, FormEvent, ChangeEvent } from 'react'
import { FiPlus } from 'react-icons/fi'
import { Map, Marker, TileLayer } from 'react-leaflet'
import { useHistory } from 'react-router-dom'

import { Backdrop, CircularProgress, Typography } from '@material-ui/core'
import { LeafletMouseEvent } from 'leaflet'

import '~/styles/pages/create-orphanage.css'

import Sidebar from '~/components/Sidebar'
import api from '~/services/api'
import { happyMapIcon } from '~/utils/mapIcon'

const CreateOrphanage: React.FC = () => {
  const history = useHistory()

  const [error, setError] = useState<string>()
  const [isLoading, setIsLoading] = useState(false)
  const [initialPosition, setInitialPosition] = useState<[number, number]>([
    0,
    0,
  ])

  const [position, setPosition] = useState({ latitude: 0, longitude: 0 })
  const [name, setName] = useState<string>()
  const [whatsapp, setWhatsapp] = useState<string>()
  const [about, setAbout] = useState<string>()
  const [instructions, setInstructions] = useState<string>()
  const [openingHours, setOpeningHours] = useState<string>()
  const [openOnWeekends, setOpenOnWeekends] = useState(true)
  const [images, setImages] = useState<File[]>([])
  const [previewImages, setPreviewImages] = useState<string[]>([])

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      const { latitude, longitude } = position.coords
      setInitialPosition([latitude, longitude])
    })
  }, [])

  function handleMapClick(e: LeafletMouseEvent) {
    const { lat, lng } = e.latlng

    setPosition({ latitude: lat, longitude: lng })
  }

  function handleSelectImages(e: ChangeEvent<HTMLInputElement>) {
    if (!e.target.files) return

    const selectedImages = Array.from(e.target.files)

    setImages(selectedImages)

    const selectedImagesPreview = selectedImages.map((image) => {
      return URL.createObjectURL(image)
    })

    setPreviewImages(selectedImagesPreview)
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()

    const { latitude, longitude } = position

    const data = new FormData()

    data.append('name', String(name))
    data.append('whatsapp', String(whatsapp))
    data.append('latitude', String(latitude))
    data.append('longitude', String(longitude))
    data.append('about', String(about))
    data.append('instructions', String(instructions))
    data.append('opening_hours', String(openingHours))
    data.append('open_on_weekends', String(openOnWeekends))

    images.forEach((image) => data.append('images', image))

    try {
      setIsLoading(true)
      await api.post('/orphanages', data)

      history.push('/orfanatos')
    } catch (err) {
      setError(err.message)
    } finally {
      setIsLoading(false)
    }
  }

  if (error) {
    return <p>application is broken</p>
  }

  return (
    <>
      <Backdrop
        open={isLoading}
        style={{ zIndex: 99999999, flexDirection: 'column' }}
      >
        <CircularProgress color="primary" />
        <Typography variant="overline" style={{ color: '#fcfcfc' }}>
          Salvando...
        </Typography>
      </Backdrop>

      <div id="page-create-orphanage">
        <Sidebar />
        <main>
          <form className="create-orphanage-form" onSubmit={handleSubmit}>
            <fieldset>
              <legend>Dados</legend>

              <Map
                center={[initialPosition[0], initialPosition[1]]}
                style={{ width: '100%', height: 280 }}
                zoom={15}
                onclick={handleMapClick}
              >
                <TileLayer
                  url={`https://api.mapbox.com/styles/v1/mapbox/light-v10/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`}
                />

                {position.latitude !== 0 && (
                  <Marker
                    interactive={false}
                    icon={happyMapIcon}
                    position={[position.latitude, position.longitude]}
                  />
                )}
              </Map>

              <div className="input-block">
                <label htmlFor="name">
                  Nome
                  <input id="name" onChange={(e) => setName(e.target.value)} />
                </label>
              </div>

              <div className="input-block">
                <label htmlFor="about">
                  Sobre <span>Máximo de 300 caracteres</span>
                  <textarea
                    id="name"
                    maxLength={300}
                    onChange={(e) => setAbout(e.target.value)}
                  />
                </label>
              </div>

              <div className="input-block">
                <label htmlFor="whatsapp">
                  Número de Whatsapp
                  <input
                    id="whatsapp"
                    onChange={(e) => setWhatsapp(e.target.value)}
                  />
                </label>
              </div>

              <div className="input-block">
                <span>Fotos</span>

                <div className="images-container">
                  {previewImages.map((image) => {
                    return <img key={image} src={image} alt={name} />
                  })}

                  <label htmlFor="image[]" className="new-image">
                    <FiPlus size={24} color="#15b6d6" />
                  </label>

                  <input
                    multiple
                    onChange={handleSelectImages}
                    type="file"
                    id="image[]"
                  />
                </div>
              </div>
            </fieldset>

            <fieldset>
              <legend>Visitação</legend>

              <div className="input-block">
                <label htmlFor="instructions">
                  Instruções
                  <textarea
                    id="instructions"
                    onChange={(e) => setInstructions(e.target.value)}
                  />
                </label>
              </div>

              <div className="input-block">
                <label htmlFor="opening_hours">
                  Horário de funcionamento
                  <input
                    id="opening_hours"
                    onChange={(e) => setOpeningHours(e.target.value)}
                  />
                </label>
              </div>

              <div className="input-block">
                <label htmlFor="open_on_weekends">Atende fim de semana</label>

                <div className="button-select">
                  <button
                    type="button"
                    onClick={() => setOpenOnWeekends(true)}
                    className={openOnWeekends ? 'active' : undefined}
                  >
                    Sim
                  </button>
                  <button
                    type="button"
                    onClick={() => setOpenOnWeekends(false)}
                    className={!openOnWeekends ? 'active' : undefined}
                  >
                    Não
                  </button>
                </div>
              </div>
            </fieldset>

            <button className="confirm-button" type="submit">
              Confirmar
            </button>
          </form>
        </main>
      </div>
    </>
  )
}

export default CreateOrphanage
