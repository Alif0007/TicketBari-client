import Slider from './Slider'
import TrustedStats from './Stats';

import LatestTicketCard from './LatestTicket';
import AdvertiseTicketCard from './AdvertiseTicket';
import Marquee from './Maruee';



const Home = () => {


    return (
        <div className=''>
            <Slider></Slider>
            <div className=''>
                <h1 className='text-3xl my-8 font-bold text-center'>Latest Tickets</h1>
                <LatestTicketCard></LatestTicketCard>
            </div>

            <div>
                <h1 className='text-3xl my-8 font-bold text-center'>Sponsored Tickets</h1>
                <AdvertiseTicketCard></AdvertiseTicketCard>
            </div>
            <Marquee></Marquee>
            <Marquee></Marquee>
            <TrustedStats></TrustedStats>
        </div>
    );
};

export default Home;