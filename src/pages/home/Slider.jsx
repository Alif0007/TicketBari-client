import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import img1 from '../../assets/1.png'
import img2 from '../../assets/2.png'
import img3 from '../../assets/3.png'




// import required modules
import { Autoplay, Navigation } from 'swiper/modules';
import { Link } from 'react-router';

export default function App() {
    return (
        <>
            <Swiper loop={true}
                modules={[Autoplay]} autoplay={{
                    delay: 3000,
                    disableOnInteraction: false,
                }} className="mySwiper">

                {/* BANNER SLIDE  */}

                <SwiperSlide>
                    <img src={img1} alt="" />
                </SwiperSlide>
                <SwiperSlide>
                    <img src={img2} alt="" />
                </SwiperSlide>
                <SwiperSlide>
                    <img src={img3} alt="" />
                </SwiperSlide>

            </Swiper>
        </>
    );
}