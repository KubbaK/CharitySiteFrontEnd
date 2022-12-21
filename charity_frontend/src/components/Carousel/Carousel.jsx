import { Carousel } from 'antd';
import styled from 'styled-components';
import 'antd/lib/carousel/style/index.css'
import Image1 from '../images/ch_event.jpg'
import Image2 from '../images/tytul2.jpg'
import Image3 from '../images/tytul3.jpg'
import Image4 from '../images/tytul4.jpg'
import CarouselPhotoContainer from '../CarouselPhotoContainer/CarouselPhotoContainer';
import React from 'react';

const contentStyle = {
  height: '400px',
  color: '#fff',
  lineHeight: '160px',
  textAlign: 'center',
  background: 'white',
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
    const CarouselComponent = () => (
        
        <CarouselStyled dotPosition='bottom:50px' autoplay={true}>
        <div>
            <h3 style={contentStyle}><CarouselPhotoContainer  image={Image1}/></h3>
        </div>
        <div>
            <h3 style={contentStyle}><CarouselPhotoContainer  image={Image2}/></h3>
        </div>
        <div>
            <h3 style={contentStyle}><CarouselPhotoContainer  image={Image3}/></h3>
        </div>
        <div>
            <h3 style={contentStyle}><CarouselPhotoContainer  image={Image4}/></h3>
        </div>
        </CarouselStyled>
            
);
export default CarouselComponent;