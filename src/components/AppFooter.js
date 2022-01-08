import React from 'react'
import { CFooter } from '@coreui/react'

const AppFooter = () => {
  return (
    <CFooter>
      <div>
        <a href="http://34.253.210.129/" target="_blank" rel="noopener noreferrer">
          Partner
        </a>
        <span className="ms-1">&copy; 2021 P4less.</span>
      </div>
      <div className="ms-auto">
        <span className="me-1">Powered by</span>
        <a href="http://34.253.210.129/" target="_blank" rel="noopener noreferrer">
          Protect4Less
        </a>
      </div>
    </CFooter>
  )
}

export default React.memo(AppFooter)
