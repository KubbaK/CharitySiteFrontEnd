import { Carousel } from 'antd';
import styled from 'styled-components';
import 'antd/lib/carousel/style/index.css'
import Image1 from '../images/jest.png'
import CarouselPhotoContainer from '../CarouselPhotoContainer/CarouselPhotoContainer';
import React from 'react';

const contentStyle = {
  height: '400px',
  color: '#fff',
  lineHeight: '160px',
  textAlign: 'center',
  background: '#f5f0d7',
  marginTop: '0px',
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
        <CarouselStyled dotPosition='bottom:50px' autoplay>
        <div>
            <h3 style={contentStyle}><CarouselPhotoContainer  image={Image1}/></h3>
        </div>
        <div>
            <h3 style={contentStyle}><CarouselPhotoContainer  image={Image1}/></h3> 
        </div>
        <div>
            <h3 style={contentStyle}><CarouselPhotoContainer  image={Image1}/></h3> 
        </div>
        <div>
            <h3 style={contentStyle}><CarouselPhotoContainer  image={Image1}/></h3> 
        </div>
        </CarouselStyled>
);
export default CarouselComponent;