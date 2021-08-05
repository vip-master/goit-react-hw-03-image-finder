import React, { Component } from 'react'
import PropTypes from 'prop-types'


export default class Modal extends Component {

    static propTypes={
            image: PropTypes.shape({
            bigImage: PropTypes.string.isRequired,
            alt: PropTypes.string.isRequired,
        }).isRequired,
        onClose: PropTypes.func.isRequired,
    }


    _handleEscKey=({keyCode})=>{
        if(keyCode === 27) this.props.onClose()
    }

    componentDidMount(){
        document.addEventListener("keydown", this._handleEscKey, false);
    }

    componentWillUnmount(){
        document.removeEventListener("keydown", this._handleEscKey, false);
    }

    handleClick=(e)=>{
        if(e.target.attributes.class) this.props.onClose()
    }

    render(){
        return (
            <div className="Overlay" onClick={this.handleClick}>
              <div className="Modal">
                <img src={this.props.image.bigImage} alt={this.props.image.alt} />
              </div>
            </div>
    )}
}


