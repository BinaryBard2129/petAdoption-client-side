import React from "react";
import { motion } from "framer-motion";
import bannerImg from "../assets/images/banner2.jpg"; // ensure high quality (1920x1080 recommended)

const Banner = () => {
  return (
    <div
      className="relative w-full aspect-[16/9] sm:aspect-[21/9] bg-cover bg-center overflow-hidden shadow-2xl"
      style={{ backgroundImage: `url(${bannerImg})` }}
    >
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/40 to-black/60 flex items-center justify-center px-4">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="text-center text-white max-w-3xl px-4"
        >
          
          <motion.h1
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="text-3xl sm:text-4xl md:text-6xl font-extrabold mb-4 leading-snug drop-shadow-xl"
          >
            Adopt. Love. Repeat. 🐾
          </motion.h1>

          
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7, duration: 0.8 }}
            className="text-base sm:text-lg md:text-2xl mb-8 opacity-90"
          >
            Your new best friend is just a click away.
          </motion.p>

         
          <motion.a
            href="/petListing"
            whileHover={{ scale: 1.07, boxShadow: "0px 0px 20px rgba(59,130,246,0.8)" }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 300 }}
            className="inline-block px-8 py-4 bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-indigo-600 hover:to-blue-500 text-white font-semibold rounded-full shadow-lg transition-all duration-300"
          >
            Browse Pets
          </motion.a>
        </motion.div>
      </div>
    </div>
  );
};

export default Banner;
