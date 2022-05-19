import { Component } from "react";
import CarouselContainer from './CarouselContainer';
import BottomContainer from './BottomContainer';

export default class Home extends Component{
    render(){
        return(
            <div>
             <CarouselContainer/>
             <BottomContainer/>
            </div>
        )
        
    }
}