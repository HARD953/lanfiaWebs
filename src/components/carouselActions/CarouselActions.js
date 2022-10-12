import React from 'react';
import {
  MDBCarousel,
  MDBCarouselInner,
  MDBCarouselItem,
  MDBCarouselElement,
  MDBCarouselCaption,
} from 'mdb-react-ui-kit';

import "./CarouselActions.css"


const CarouselActions =()=>{

    return(
        <MDBCarousel data-aos="zoom-in" interval={5000} className="custom-slider-home" showIndicators showControls fade>
        <MDBCarouselInner>
        <MDBCarouselItem className='active'>
            <MDBCarouselElement className="custom-slider-homeImage" src="https://media.worldnomads.com/responsibletravel/imagereplacements/Whichdonationisbest.png" alt='...' />
            <MDBCarouselCaption>
            <h5>First slide label</h5>
            <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
            </MDBCarouselCaption>
        </MDBCarouselItem>

        <MDBCarouselItem>
            <MDBCarouselElement  className="custom-slider-homeImage" src="https://www.worldvision.com.au/images/default-source/ways-to-give-images/donate-goods/donate-goods-carousel-2.jpg?sfvrsn=29ca03c_2&quality=90&format=jpg&resize=1" alt='...' />
            <MDBCarouselCaption>
            <h5>Second slide label</h5>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
            </MDBCarouselCaption>
        </MDBCarouselItem>

        </MDBCarouselInner>
        </MDBCarousel>
    )
}

export default CarouselActions