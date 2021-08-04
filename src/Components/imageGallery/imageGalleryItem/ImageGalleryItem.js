import React from 'react'
import PropTypes from 'prop-types'

function ImageGalleryItem({smallImage, alt, id, onClick}) {
    return (
        <li className="ImageGalleryItem">
          <img src={smallImage} alt={alt} id={id} onClick={onClick} className="ImageGalleryItem-image" />
        </li>
    )
}

ImageGalleryItem.propTypes = {
    smallImage:PropTypes.string.isRequired,
    alt:PropTypes.string.isRequired,
    id:PropTypes.string.isRequired,
    onClick:PropTypes.func.isRequired,
}

export default ImageGalleryItem

