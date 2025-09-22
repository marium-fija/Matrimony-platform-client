import React from 'react';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import slider1 from '../assets/Slider-1.png'
import slider2 from '../assets/Slider-2.png'
import slider3 from '../assets/Slider-3.png'

const Banner = () => {
    return (
        <div className=' '>
            <Carousel autoPlay={true} infiniteLoop={true} showThumbs={false} showArrows={true}>
                <div>
                    <img src={slider1} />
                    <p className=""></p>
                </div>
                <div>
                    <img src={slider2} />
                    <p className=""></p>
                </div>
                <div>
                    <img src={slider3}/>
                    <p className=""></p>
                </div>
            </Carousel>
        </div>
    );
};

export default Banner;