import React from 'react'
import './footer.css'

const Footer = () => {
  return (
    <div className='footer__container'>
      <span className='footer__trademark'>© 2015 Acme, Inc.</span>
      <span className='footer__actions'>Terms </span>
      <span className='footer__actions'>Privacy </span>
      <span className='footer__actions'>⋯</span>
    </div>
  )
}

export default Footer