import React, { Component } from 'react'
import ImageGallery from '../Components/imageGallery/ImageGallery';
import Searchbar from '../Components/searchbar/Searchbar';
import Button from '../Components/button/Button';
import Loader from '../Components/loader/Loader';
import Modal from '../Components/modal/Modal'
import axios from 'axios'

export default class App extends Component {

    _INITIAL_STATE_={
        images:[],
        page:0,
        query:"",
        maxPages:0,
        isLoadButton:false,
        isLoading:false,
        modal:null,
    }
    afterScroll = false
    
    state = {...this._INITIAL_STATE_}

    closeModal=()=>{
        this.setState({modal:null})
    }

    scrollUp=()=>{
        window.scrollTo({
            top: document.documentElement.scrollHeight,
            behavior: 'smooth',
        });
    }

    handelSubmit=(e)=>{
        e.preventDefault()
        this.setState({...this._INITIAL_STATE_, query:e.target[1].value.trim().replaceAll(" ","+"),isLoading:true})        
    }

    downImages=async()=>{
        if(this.state.query===""){
            this.setState({isLoading:false})
            return
        }
        
        const TOKEN="21059964-5bf790d712106238e57c2f022"
        const SITE="https://pixabay.com/api/"
        const PER_PAGE=12

        let page=this.state.page
        if(this.state.maxPages===0 || page<this.state.maxPages){
            page=this.state.page+1
        }else{
            this.setState({isLoading:false,isLoadButton:false})
            return
        }

        try{
            const {data}=await axios(`${SITE}?key=${TOKEN}&q=${this.state.query}&per_page=${PER_PAGE}&page=${page}`)
            
            let maxPages=0
            let images=[]

            if(data.total!==0) {
                maxPages=Math.ceil(data.totalHits/PER_PAGE)
                images=data.hits.map(srcImg=>{
                    const click=()=>{this.setState({
                        modal:{
                            bigImage:srcImg.largeImageURL,
                            alt:srcImg.tags,
                        }
                    })}
                    return {
                    smallImage:srcImg.webformatURL,
                    bigImage:srcImg.largeImageURL,
                    alt:srcImg.tags,
                    id:srcImg.id.toString(),
                    onClick:click,
                    }
                })
            }

            this.setState(p=>({images:[...p.images,...images],maxPages,page,isLoading:false,isLoadButton:page<maxPages}))
        }catch(error){
            this.setState({isLoading:false,isLoadButton:false})
        }
    }

    _handleEscKey=(e)=>{
        if(this.state.modal && e.keyCode === 27) this.closeModal()
    }

    componentDidMount(){
        document.addEventListener("keydown", this._handleEscKey, false);
    }

    componentWillUnmount(){
        document.removeEventListener("keydown", this._handleEscKey, false);
    }

    componentDidUpdate(){
        if(this.state.isLoading) this.downImages()
        if(this.afterScroll) this.scrollUp()
    }

    moreImages=async()=>{
        this.afterScroll=true
        this.setState({isLoading:true})
    }

    render() {
        return (
            <div className="App">
                {this.state.modal && <Modal image={this.state.modal} onClose={this.closeModal} />}
                <Searchbar onSubmit={this.handelSubmit}/>
                <ImageGallery images={this.state.images} />
                {this.state.isLoadButton && <Button onMore={this.moreImages}/>}
                {this.state.isLoading && <Loader/>}
            </div>
        )
    }
}
