import React, { useEffect, useCallback, useState } from 'react'
import { FaWhatsapp } from 'react-icons/fa'
import { FiClock, FiInfo } from 'react-icons/fi'
import { Map, Marker, TileLayer } from 'react-leaflet'
import { useParams } from 'react-router-dom'

import { Backdrop, CircularProgress, Typography } from '@material-ui/core'
import '~/styles/pages/orphanage.css'
import axios, { CancelTokenSource } from 'axios'

import Sidebar from '~/components/Sidebar'
import { Orphanage as IOrphanage } from '~/interfaces/orphanage'
import api from '~/services/api'
import { happyMapIcon } from '~/utils/mapIcon'

type ParamsRoute = {
  id: string
}

const Orphanage: React.FC = () => {
  const params = useParams<ParamsRoute>()

  const [error, setError] = useState<string>()
  const [isLoading, setIsLoading] = useState(false)
  const [currentImg, setCurrentImg] = useState<string>()
  const [orphanage, setOrphanage] = useState<IOrphanage>()

  const fetchShowOrphanage = useCallback(
    async (source: CancelTokenSource) => {
      try {
        setIsLoading(true)
        const { data } = await api.get<IOrphanage>(`/orphanages/${params.id}`, {
          cancelToken: source.token,
        })

        setOrphanage(data)

        if (data.images.length) setCurrentImg(data.images[0].url)
      } catch (err) {
        setError(err.message)
      } finally {
        setIsLoading(false)
      }
    },
    [setOrphanage, setError, setIsLoading, params.id]
  )

  useEffect(() => {
    const { CancelToken } = axios
    const source = CancelToken.source()

    fetchShowOrphanage(source)

    return () => {
      source.cancel()
    }
  }, [fetchShowOrphanage])

  function formatPhoneNumberBR(value: string) {
    const parsed = value[0] === '+55' ? value : `+55${value}`

    const zipcode = parsed.substr(0, 3)
    const ddd = parsed.substr(3, 2)
    const number = parsed.substr(5, parsed.length)

    return `${zipcode} (${ddd}) ${number}`
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
          Carregando...
        </Typography>
      </Backdrop>

      {orphanage && (
        <div id="page-orphanage">
          <Sidebar />

          <main>
            <div className="orphanage-details">
              <img src={currentImg} alt={orphanage.name} />

              <div className="images">
                {orphanage.images.map(({ id, url }) => (
                  <button
                    key={id}
                    type="button"
                    className={url === currentImg ? 'active' : undefined}
                    onClick={() => {
                      setCurrentImg(url)
                    }}
                  >
                    <img src={url} alt={orphanage.name} />
                  </button>
                ))}
              </div>

              <div className="orphanage-details-content">
                <h1>{orphanage.name}</h1>
                <p>{orphanage.about}</p>

                <div className="map-container">
                  <Map
                    center={[orphanage.latitude, orphanage.longitude]}
                    zoom={16}
                    style={{ width: '100%', height: 280 }}
                    dragging={false}
                    touchZoom={false}
                    zoomControl={false}
                    scrollWheelZoom={false}
                    doubleClickZoom={false}
                  >
                    <TileLayer
                      url={`https://api.mapbox.com/styles/v1/mapbox/light-v10/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`}
                    />
                    <Marker
                      interactive={false}
                      icon={happyMapIcon}
                      position={[orphanage.latitude, orphanage.longitude]}
                    />
                  </Map>

                  <footer>
                    <a
                      target="_blank"
                      rel="noopener noreferrer"
                      href={`https://www.google.com/maps/dir/?api=1&destination=${orphanage.latitude},${orphanage.longitude}`}
                    >
                      Ver rotas no Google Maps
                    </a>
                  </footer>
                </div>

                <hr />

                <h2>Instruções para visita</h2>
                <p>{orphanage.instructions}</p>

                <div className="open-details">
                  <div className="hour">
                    <FiClock size={32} color="#15B6D6" />
                    Segunda à Sexta <br />
                    {orphanage.opening_hours}
                  </div>
                  {orphanage.open_on_weekends ? (
                    <div className="open-on-weekends">
                      <FiInfo size={32} color="#39CC83" />
                      Atendemos <br />
                      fim de semana
                    </div>
                  ) : (
                    <div className="open-on-weekends dont-open">
                      <FiInfo size={32} color="#ff669d" />
                      Não atendemos <br />
                      fim de semana
                    </div>
                  )}
                </div>

                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  className="contact-button"
                  href={`https://api.whatsapp.com/send?phone=${orphanage.whatsapp}&text=Olá, gostaria de fazer uma visita para as crianças da instituição.`}
                >
                  <FaWhatsapp size={20} color="#FFF" />
                  Entrar em contato com{' '}
                  {formatPhoneNumberBR(orphanage.whatsapp)}
                </a>
              </div>
            </div>
          </main>
        </div>
      )}
    </>
  )
}

export default Orphanage
