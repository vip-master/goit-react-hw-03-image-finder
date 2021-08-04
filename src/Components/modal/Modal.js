import React from 'react'
import PropTypes from 'prop-types'

function Modal({image, onClose}) {
    const handleClick=(e)=>{
        if(e.target.attributes.class)onClose()
    }
    return (
        <div className="Overlay" onClick={handleClick}>
          <div className="Modal">
            <img src={image.bigImage} alt={image.alt} />
          </div>
        </div>
    )
}

Modal.propTypes = {
    image: PropTypes.shape({
        bigImage: PropTypes.string.isRequired,
        alt: PropTypes.string.isRequired,
    }).isRequired,
    onClose: PropTypes.func.isRequired,
}

export default Modal

