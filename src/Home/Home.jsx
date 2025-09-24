import React from 'react';
import Banner from '../components/Banner';
import PremiumUsers from '../components/PremiumUsers';
import Counter from '../components/Counter';
import HowItWorks from '../components/HowItWorks';
import SuccessStories from '../components/SuccessStories';


const Home = () => {
    return (
        <div className='space-y-20 max-w-7xl mx-auto'>
           <Banner></Banner>
           <PremiumUsers></PremiumUsers>
           <Counter></Counter>
           <HowItWorks></HowItWorks>
           <SuccessStories></SuccessStories>
        </div>
    );
};

export default Home;