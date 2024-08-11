import React from 'react'
import slider1 from '../../imgs/slide1.png'
import slider2 from '../../imgs/slide2.png'
import slider3 from '../../imgs/slide3.png'
import slider4 from '../../imgs/slide4.png'
import slider5 from '../../imgs/slide5.png'
import slider6 from '../../imgs/slide6.png'
import slider7 from '../../imgs/slide7.png'
import Slider from "react-slick";

export default function SliderHome() {
    let settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
        autoplay: true,
        autoplaySpeed: 3000
    };
    return (
        <>
                <Slider {...settings}>
                        <img src={slider1} className='w-100' />
                        <img src={slider2} className='w-100' />
                        <img src={slider3} className='w-100' />
                        <img src={slider4} className='w-100' />
                        <img src={slider5} className='w-100' />
                        <img src={slider6} className='w-100' />
                        <img src={slider7} className='w-100' />
                </Slider>
         

        </>
    )
}
