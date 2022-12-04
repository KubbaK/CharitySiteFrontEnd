import { Carousel } from 'antd';
import styled from 'styled-components';
import 'antd/lib/carousel/style/index.css'
import EventCarouselPhotoContainer from '../EventCarouselPhotoContainer/EventCarouselPhotoContainer';
import React from 'react';

const base64toImage = (type,imageString) =>{
    var image = new Image();
    if (type === "image/png"){
        image = `data:image/png;base64,${imageString}`
    }
    if (type === "image/jpeg"){
      image = `data:image/jpg;base64,${imageString}`
    }
    return image
  }
const contentStyle = {
  height: '400px',
  color: '#fff',
  lineHeight: '160px',
  textAlign: 'center',
  background: '#f5f0d7',
  postion:'relative'
};
const CarouselStyled = styled(Carousel)`
     .slick-dots li button{
        background: green !important;
        width: 20px;
    }
    .slick-dots li.slick-active button{
        background: green !important;
        width:28px;
    }
`;
    const EventCarousel = ({photos}) => (
        
        <CarouselStyled dotPosition='bottom:50px' autoplay={true}>
            {
            photos.map((photo,index) => (
                <div>
                    <h3 style={contentStyle}><EventCarouselPhotoContainer image={base64toImage(photo.contentType,photo.content)}/></h3>
                </div>
            ))
        }
        </CarouselStyled>
            
);
export default EventCarousel;