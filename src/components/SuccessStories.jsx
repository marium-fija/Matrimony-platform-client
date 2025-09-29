import React, { useEffect, useState } from 'react';
import useAxios from '../hooks/useAxios';
import { Star, ChevronLeft, ChevronRight } from "lucide-react";
import Loading from "../pages/Loading";

const SuccessStories = () => {
  const axiosInstance = useAxios();
  const [stories, setStories] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Fetch success stories
  useEffect(() => {
    const fetchStories = async () => {
      try {
        const res = await axiosInstance.get("/success-stories");
        setStories(res.data);
      } catch (err) {
        console.error("Error fetching success stories:", err);
      }
    };
    fetchStories();
  }, [axiosInstance]);

  if (stories.length === 0) {
    return (
      <Loading></Loading>
      
    );
  }

  // Show 3 cards at a time
  const visibleStories = stories
    .slice(currentIndex, currentIndex + 3)
    .concat(
      stories.slice(0, Math.max(0, currentIndex + 3 - stories.length))
    );

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? stories.length - 3 : prevIndex - 1
    );
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      (prevIndex + 1) % stories.length
    );
  };

  // Update rating
  const updateRating = (storyIndex, starIndex) => {
    setStories((prevStories) =>
      prevStories.map((story, idx) =>
        idx === storyIndex
          ? { ...story, reviewStar: starIndex + 1 }
          : story
      )
    );
  };


    return (
        <div>
          <section className="py-12 bg-gray-900">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-3xl font-bold text-center text-white mb-10">
          Success Stories
        </h2>

        <div className="relative">
          {/* Left Arrow */}
          <button
            onClick={handlePrev}
            className="absolute left-0 top-1/2 -translate-y-1/2 bg-gray-700 hover:bg-gray-600 text-white p-2 rounded-full z-10"
          >
            <ChevronLeft size={24} />
          </button>

          {/* Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 transition-all duration-500">
            {visibleStories.map((story, idx) => {
              const storyIndex = (currentIndex + idx) % stories.length;
              return (
                <div
                  key={storyIndex}
                  className="bg-gray-800 text-white rounded-2xl shadow-lg p-6 flex flex-col items-center text-center"
                >
                  <img
                    src={story.coupleImage}
                    alt="Couple"
                    className="w-28 h-28 object-cover rounded-full border-4 border-pink-400 mb-4"
                  />
                  <p className="text-sm text-gray-200 mb-2">
                    <span className='font-bold'>Married on : </span>{" "}
                    <span className="font-semibold text-gray-400">
                      {new Date(story.marriageDate).toLocaleDateString()}
                    </span>
                  </p>

                   <div className="flex flex-col items-center mb-3">
  {/* Stars */}
  <div className="flex justify-center">
    {Array.from({ length: 5 }).map((_, i) => (
      <Star
        key={i}
        size={18}
        className={`cursor-pointer ${
          i < Math.round(story.rating)
            ? "text-yellow-400 fill-yellow-400"
            : "text-gray-500"
        }`}
        onClick={() => updateRating(storyIndex, i)}
      />
    ))}
  </div>

  {/* Numeric Rating */}
  <span className="text-sm text-gray-200 mt-1">
     {(story.rating ?? 0).toFixed(1)} / 5
  </span>
</div>
                  <p className="text-gray-300 italic text-sm">
                    <span className='font-bold text-pink-300'>Success Story :</span> {story.successStory}
                  </p>
                </div>
              );
            })}
          </div>

          {/* Right Arrow */}
          <button
            onClick={handleNext}
            className="absolute right-0 top-1/2 -translate-y-1/2 bg-gray-700 hover:bg-gray-600 text-white p-2 rounded-full z-10"
          >
            <ChevronRight size={24} />
          </button>
        </div>
      </div>
    </section>
        </div>
    );
};

export default SuccessStories;