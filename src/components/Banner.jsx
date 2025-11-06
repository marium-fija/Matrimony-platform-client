import React from 'react';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import animationData from "../assets/lottie/Marriage Couple hugging.json";
import { motion } from "framer-motion";
import Lottie from "lottie-react";
import { TypeAnimation } from "react-type-animation";
import { IoArrowRedoSharp } from "react-icons/io5";

const textVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.6, duration: 0.8, ease: "easeOut" },
  }),
};

const Banner = () => {
     const titles = [
    "Find Your Perfect Match ",
  ];
    return (
       <div>
         <div className="flex flex-col md:flex-row items-center justify-between px-8 md:px-10 py-16 min-h-[90vh] overflow-hidden ">
      {/* LEFT SIDE */}
      <div className="md:w-1/2 space-y-6 text-center md:text-left">
        {titles.map((title, index) => (
          <motion.div
            key={index}
            custom={index}
            variants={textVariants}
            initial="hidden"
            animate="visible"
          >
            <h1 className="text-4xl md:text-5xl font-bold text-indigo-400">
              {/*  Second Animation: Typewriter effect */}
              <TypeAnimation
               sequence={[title, 2000, '', 500  ]}            
                wrapper="span"
                cursor={true}
                speed={80}
                repeat={Infinity} 
              />
            </h1>
          </motion.div>
        ))}

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2, duration: 1 }}
          className="text-lg md:text-xl leading-relaxed mt-4  gap-x-20 text-gray-200"
        >
          Join the Most Trusted Marital Platform 
           <span className="text-cyan-500 ml-2 font-semibold">
             Where Love Meets Destiny !
          </span>
        </motion.p>
        

        <motion.Button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.4, duration: 0.8 }}
          className="bg-indigo-500 text-white px-4 py-2 rounded-full hover:bg-purple-400"
        >
          <span className='flex
          justify-center items-center gap-2'>Get Started <IoArrowRedoSharp /></span>
        </motion.Button>
      </div>

      {/* RIGHT SIDE */}
      <motion.div
        className="md:w-1/2 mt-12 md:mt-0 flex justify-center"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1.2, duration: 1 }}
      >
       
        <Lottie
          animationData={animationData}
          loop={true}
          style={{ height: "500px" }}
        />
      </motion.div>
    </div>
       </div>
    );
};

export default Banner;