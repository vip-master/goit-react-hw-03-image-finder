import React from 'react'
import PropTypes from 'prop-types'
import ImageGalleryItem from './imageGalleryItem/ImageGalleryItem';

function ImageGallery({images}) {
    return (
        <ul className="ImageGallery">
          {images.map(image=>(
              <ImageGalleryItem {...image} key={image.id}/>
          ))}
        </ul>
    )
}

ImageGallery.propTypes = {
    images: PropTypes.arrayOf(PropTypes.shape({
        smallImage:PropTypes.string.isRequired,
        alt:PropTypes.string.isRequired,
        id:PropTypes.string.isRequired,
        onClick:PropTypes.func.isRequired,
    })).isRequired
}

export default ImageGallery

