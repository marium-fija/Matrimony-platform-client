import React from 'react';
import about from '../assets/About.jpeg'

const About = () => {
    return (
        <div className='max-w-7xl mx-auto'>
            <div className='mt-10'>
                <h2 className='text-5xl text-center font-bold mb-8'> About <span className='text-sky-500'>Soul</span><span className='text-pink-500'>Knot</span></h2>
            <p className='text-center text-gray-500 mb-8'>Finding partner , Connecting hearts ,ways to stay  together forever</p>
            <img className='w-[1024px] p-3 mx-auto' src={about} alt="" />

            <div className='mt-10 w-full px-10 space-y-5 justify-center text-gray-300'>
               <p> Matrimony Platform is a modern and user-friendly web application built with the MERN stack that helps people find their perfect life partner. Our mission is to create a safe, reliable, and transparent platform where users can connect with genuine biodatas.</p>

                <p>In this platform, users can create and manage their own biodata with complete details such as personal information, occupation, family background, and partner expectations. The system allows easy browsing of biodatas with smart filters for age, gender, and location.</p>

                <p>Premium members enjoy exclusive benefits such as viewing contact information and getting higher visibility among other members. Users can also add biodatas to their favourites list and request contact information through a secure checkout system powered by Stripe.</p>

                <p>We have a dedicated Admin Dashboard that ensures proper monitoring and management of the platform. Admins can approve premium memberships, verify contact requests, manage users, and keep the platform safe from spam or fake accounts.</p>

                <p>Our success story section highlights real-life couples who found their partners through this platform, inspiring others to take the next step in their journey.</p>

                <p>Matrimony Platform is built with modern technologies like React, Node.js, Express.js, and MongoDB, ensuring scalability and performance. We also use Tanstack Query for smooth data fetching and JWT authentication for secure login.</p>

                <p>Our goal is to make the journey of finding a life partner simple, trustworthy, and joyful.</p>
            </div>
        </div>
        </div>
    );
};

export default About;