import React, { Component } from 'react'
import ImageGallery from '../Components/imageGallery/ImageGallery';
import Searchbar from '../Components/searchbar/Searchbar';
import Button from '../Components/button/Button';
import Loader from '../Components/loader/Loader';
import Modal from '../Components/modal/Modal'
import getData from '../utils/api'

const _INITIAL_STATE_={
    images:[],
    page:0,
    query:"",
    maxPages:0,
    isLoadButton:false,
    isLoading:false,
    modal:null,
}

export default class App extends Component {

    afterScroll = false
    
    state = {..._INITIAL_STATE_}

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
        this.setState({..._INITIAL_STATE_, query:e.target[1].value.trim().replaceAll(" ","+"),isLoading:true})        
    }

    handelCicks=({target:{dataset:{bigimage:bigImage,alt}}})=>{
        this.setState({modal:{bigImage,alt}})
    }

    downImages=async()=>{
        if(this.state.query===""){
            this.setState({isLoading:false})
            return
        }
        
        const PER_PAGE=12

        let page=this.state.page
        if(this.state.maxPages===0 || page<this.state.maxPages){
            page=this.state.page+1
        }else{
            this.setState({isLoading:false,isLoadButton:false})
            return
        }

        try{
            const {data}=await getData(this.state.query,page,PER_PAGE)
            
            let maxPages=0
            let images=[]

            if(data.total!==0) {
                maxPages=Math.ceil(data.totalHits/PER_PAGE)
                images=data.hits.map(srcImg=>({
                    smallImage:srcImg.webformatURL,
                    bigImage:srcImg.largeImageURL,
                    alt:srcImg.tags,
                    id:srcImg.id.toString(),
                    }))
            }

            this.setState(prev=>({images:[...prev.images,...images],maxPages,page,isLoading:false,isLoadButton:page<maxPages}))
        }catch(error){
            this.setState({isLoading:false,isLoadButton:false})
        }
    }

    componentDidUpdate(){
        if(this.state.isLoading) this.downImages()
        else if(this.afterScroll) {
            this.scrollUp()
            this.afterScroll=false
        }
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
                <ImageGallery images={this.state.images} onClick={this.handelCicks}/>
                {this.state.isLoading && <Loader/>}
                {this.state.isLoadButton && <Button onMore={this.moreImages}/>}
            </div>
        )
    }
}
