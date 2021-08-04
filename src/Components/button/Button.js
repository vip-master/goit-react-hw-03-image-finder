import React from 'react'
import PropTypes from 'prop-types'

function Button({onMore}) {
    return (
        <button className="Button" onClick={onMore}>
            Load MORE...
        </button>
    )
}

Button.propTypes = {
    onMore: PropTypes.func.isRequired,
}

export default Button

