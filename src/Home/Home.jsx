import React from 'react';
import Banner from '../components/Banner';
import PremiumUsers from '../components/PremiumUsers';
import Counter from '../components/Counter';
import HowItWorks from '../components/HowItWorks';
import SuccessStories from '../components/SuccessStories';
import MembershipPlans from '../components/MembershipPlans';
import FaqSection from '../components/FaqSection';
import Contact from '../pages/Contact';


const Home = () => {
    return (
        <div className='max-w-7xl mx-auto space-y-20 p-6'>
            <Banner></Banner>
            <PremiumUsers></PremiumUsers>
            <Counter></Counter>
            <HowItWorks></HowItWorks>
            <SuccessStories></SuccessStories>
            <Contact></Contact>
            <MembershipPlans></MembershipPlans>
            <FaqSection></FaqSection>
        </div>
    );
};

export default Home;