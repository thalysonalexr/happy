import React, { useEffect, useCallback, useState } from 'react'
import { FiPlus, FiArrowRight } from 'react-icons/fi'
import { Map, TileLayer, Marker, Popup } from 'react-leaflet'
import { Link } from 'react-router-dom'

import { Backdrop, CircularProgress, Typography } from '@material-ui/core'
import axios, { CancelTokenSource } from 'axios'
import '~/styles/pages/orphanages.css'

import { ReactComponent as MarkerImage } from '~/assets/images/marker.svg'
import { Orphanage } from '~/interfaces/orphanage'
import api from '~/services/api'
import { accessToken } from '~/services/mapbox'
import { happyMapIcon } from '~/utils/mapIcon'

const Orphanages: React.FC = () => {
  const [error, setError] = useState<string>()
  const [isLoading, setIsLoading] = useState(false)
  const [orphanages, setOrphanages] = useState<Orphanage[]>([])
  const [initialPosition, setInitialPosition] = useState<[number, number]>([
    0,
    0,
  ])

  const fetchListOrphanages = useCallback(
    async (source: CancelTokenSource) => {
      try {
        setIsLoading(true)
        const { data } = await api.get<Orphanage[]>('/orphanages', {
          cancelToken: source.token,
        })

        setOrphanages(data)
      } catch (err) {
        setError(err.message)
      } finally {
        setIsLoading(false)
      }
    },
    [setOrphanages, setError, setIsLoading]
  )

  useEffect(() => {
    const { CancelToken } = axios
    const source = CancelToken.source()

    fetchListOrphanages(source)

    return () => {
      source.cancel()
    }
  }, [fetchListOrphanages])

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      const { latitude, longitude } = position.coords
      setInitialPosition([latitude, longitude])
    })
  }, [])

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

      <div id="page-map">
        <aside>
          <header>
            <MarkerImage />

            <h2>Escolha um orfanato no mapa</h2>
            <p>Muitas crianças estão esperando a sua visita :)</p>
          </header>

          <footer>
            <strong>Rondonópolis</strong>
            <span>Mato Grosso</span>
          </footer>
        </aside>

        <Map
          center={[initialPosition[0], initialPosition[1]]}
          zoom={15}
          style={{
            width: '100%',
            height: '100%',
          }}
        >
          <TileLayer
            url={`https://api.mapbox.com/styles/v1/mapbox/outdoors-v11/tiles/256/{z}/{x}/{y}@2x?access_token=${accessToken}`}
          />

          {orphanages.map(({ id, name, latitude, longitude }) => (
            <Marker
              key={id}
              position={[latitude, longitude]}
              icon={happyMapIcon}
            >
              <Popup
                closeButton={false}
                minWidth={240}
                maxWidth={240}
                className="map-popup"
              >
                {name}
                <Link to={`/orfanatos/${id}`}>
                  <FiArrowRight size={20} color="#fff" />
                </Link>
              </Popup>
            </Marker>
          ))}
        </Map>

        <Link to="/criar-novo-orfanato" className="create-orphanage">
          <FiPlus size={32} color="#fff" />
        </Link>
      </div>
    </>
  )
}

export default Orphanages
