import leaflet from 'leaflet'

import Marker from '~/assets/images/marker.svg'

export const happyMapIcon = leaflet.icon({
  iconUrl: Marker,

  iconSize: [58, 68],
  iconAnchor: [29, 68],
  popupAnchor: [0, -60],
})
