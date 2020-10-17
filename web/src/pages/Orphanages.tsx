import React from 'react'
import { FiPlus } from 'react-icons/fi'
import { Map, TileLayer } from 'react-leaflet'
import { Link } from 'react-router-dom'

import 'leaflet/dist/leaflet.css'

import '~/styles/pages/orphanages.css'

import { ReactComponent as Marker } from '~/assets/images/marker.svg'
import { accessToken } from '~/services/mapbox'

const Orphanages: React.FC = () => {
  return (
    <div id="page-map">
      <aside>
        <header>
          <Marker />

          <h2>Escolha um orfanato no mapa</h2>
          <p>Muitas crianças estão esperando a sua visita :)</p>
        </header>

        <footer>
          <strong>Rondonópolis</strong>
          <span>Mato Grosso</span>
        </footer>
      </aside>

      <Map
        center={[-16.4801036, -54.6424134]}
        zoom={15}
        style={{
          width: '100%',
          height: '100%',
        }}
      >
        <TileLayer
          url={`https://api.mapbox.com/styles/v1/mapbox/outdoors-v11/tiles/256/{z}/{x}/{y}@2x?access_token=${accessToken}`}
        />
      </Map>

      <Link to="/create" className="create-orphanage">
        <FiPlus size={32} color="#fff" />
      </Link>
    </div>
  )
}

export default Orphanages
