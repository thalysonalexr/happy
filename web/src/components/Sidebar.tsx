import React from 'react'
import { FiArrowLeft } from 'react-icons/fi'
import { useHistory } from 'react-router-dom'

import { ReactComponent as Marker } from '~/assets/images/marker.svg'
import '~/styles/components/sidebar.css'

const Sidebar: React.FC = () => {
  const { goBack } = useHistory()

  return (
    <aside className="app-sidebar">
      <Marker />

      <footer>
        <button type="button" onClick={goBack}>
          <FiArrowLeft size={24} color="#FFF" />
        </button>
      </footer>
    </aside>
  )
}

export default Sidebar
