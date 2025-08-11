import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const OfferBanner = () => {
  // Set the end time for the offer (change this date as needed)
  const offerEndTime = new Date("2025-12-31T23:59:59");

  const calculateTimeLeft = () => {
    const difference = offerEndTime - new Date();
    let timeLeft = {};

    if (difference > 0) {
      timeLeft = {
        Days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        Hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        Minutes: Math.floor((difference / 1000 / 60) % 60),
        Seconds: Math.floor((difference / 1000) % 60),
      };
    } else {
      timeLeft = null;
    }

    return timeLeft;
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="w-full bg-gradient-to-r from-yellow-300 to-orange-400 py-10 px-4 text-black">
      <div className="max-w-[1200px] mx-auto flex flex-col-reverse md:flex-row items-center justify-between gap-6">
        {/* Text & Timer */}
        <div className="text-center md:text-left">
          <h2 className="text-4xl sm:text-5xl font-bold mb-4">
            🎉 Mega Offer Ends Soon!
          </h2>
          <p className="text-lg sm:text-xl font-medium mb-6">
            Hurry up and get up to 50% OFF on selected items.
          </p>

          {timeLeft ? (
            <div className="flex gap-4 mt-4 justify-center md:justify-start">
              {Object.entries(timeLeft).map(([label, value]) => (
                <div
                  key={label}
                  className="bg-white text-black px-5 py-4 rounded-lg shadow-lg"
                >
                  <div className="text-4xl font-extrabold">
                    {value.toString().padStart(2, "0")}
                  </div>
                  <div className="text-sm font-medium">{label}</div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-red-600 text-xl font-semibold mt-4">
              Offer has expired!
            </p>
          )}

          <a
            href="#shop"
            className="inline-block mt-6 bg-black text-white py-3 px-6 rounded-full hover:bg-gray-800 transition"
          >
            Shop Now
          </a>
        </div>

        {/* Banner Image */}
        <div className="w-full md:w-[400px] h-auto">
          <img
            src="src/assets/Tb.jpg" // Replace with your banner image path
            alt="Offer Banner"
            className="w-full h-full object-contain rounded-lg shadow-md"
          />
        </div>
      </div>
    </section>
  );
};

export default OfferBanner;
