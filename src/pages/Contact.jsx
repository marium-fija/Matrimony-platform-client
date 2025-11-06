import React from 'react';
import { CiLinkedin } from 'react-icons/ci';
import { FaFacebook, FaInstagram } from 'react-icons/fa';
import { FiSend, FiTwitter } from "react-icons/fi";

const Contact = () => {
    return (
      <div className='max-w-7xl mx-auto mt-30'>

        <div className='my-14'>
            <h2 className='text-5xl font-extrabold text-center'>Here to <span className='text-cyan-400'>Contact</span> With Us ...</h2>
            <div className='grid sm:grid-cols-2 lg: grid-cols-1 gap-8'> 
            {/* form */}
        <div className='p-5 space-y-5'>
                {/* name */}
         <div>
      <label className="block mb-1">Your Name</label>
      <input placeholder='Your name'  
    type="text" name="name" className="w-full p-2 border rounded bg-transparent" />
    </div>
    {/* Email */}
    <div>
      <label className="block mb-1">Contact Email</label>
      <input placeholder='Your email' type="email" name="contactEmail" readOnly className="w-full p-2 border rounded text-gray-500 bg-transparent" />
    </div>
    {/* Mobile */}
    <div>
      <label className="block mb-1">Phone</label>
      <input placeholder='Your Phone Number' type="text" name="mobileNumber" className="w-full p-2 border rounded bg-transparent text-gray-500" />
    </div>
    {/* About */}
  <div>
    <label className="block mb-1">Message</label>
    <textarea placeholder='Your message'  name="about" rows="3" className="w-full p-2 border rounded bg-transparent"></textarea>
  </div>

  <button type="submit" className="mt-4 bg-indigo-500 px-6 py-2 rounded-full text-white font-bold">
    Send
  </button>
        </div>
            {/* text */}
            <div className='p-10'>
        <h2 className='text-4xl font-extrabold '><span className='text-cyan-500'>Join to</span> our Group</h2>
        <p className='justify-items-start text-gray-500 my-5'>Are you finding your partner ? Then you can join to our social media groups . Here you can find your perfect match  </p>

        <div className='flex flex-col '>
      <label className="block mb-1">Contact Email</label>
      <div className='flex'>
        <input placeholder='Your email' type="email" name="contactEmail" readOnly className="w-52 p-2 border rounded text-gray-500 bg-transparent" />
        <button className='w-12 p-3 rounded-tr-lg bg-sky-600'><FiSend /></button>
      </div>
      <div className='flex gap-5 mt-14 mx-auto'>
        <div className='space-y-8'>
            <h4 className='text-xl font-semibold '>Social Groups Links</h4>
            <div className="flex space-x-4 text-gray-200">
                        <a href="#" className="hover:text-white"><FaFacebook size={25}/></a>
                        <a href="#" className="hover:text-white"><FiTwitter size={25}/></a>
                        <a href="#" className="hover:text-white"><FaInstagram size={25}/></a>
                        <a href="#" className="hover:text-white"><CiLinkedin size={25}/></a>
                      </div>
                      <div>
            <h6 className='font-semibold '>Legal</h6>
            <p className='text-gray-500'>Terms of usePrivacy policyCookie policy</p>
        </div>
        </div>

        <div className='text-gray-500 font-semibold space-y-3 '>
            <h4 className='text-xl font-semibold text-white'>Our Address : </h4>
            <p>Mobile Number : 22150522015</p>
            <p> Estern Housing , Postogola , Dhaka - 1204 , Bangladesh</p>
        </div>
      </div>
    </div>
            </div>
    </div>
        </div>

        </div>
    );
};

export default Contact;