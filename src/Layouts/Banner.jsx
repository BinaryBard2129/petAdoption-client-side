import React from 'react';
import { motion } from 'framer-motion';
import bannerImg from '../assets/images/banner2.jpg';

const Banner = () => {
  return (
    <div
      className="relative w-full h-[300px] sm:h-[400px] md:h-[600px] bg-cover bg-center  overflow-hidden shadow-xl"
      style={{
        backgroundImage: `url(${bannerImg})`,
      }}
    >
      <div className="absolute inset-0 bg-black/40 flex items-center justify-center px-4">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: 'easeOut' }}
          className="text-center text-white max-w-2xl"
        >
          <motion.h1
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="text-2xl sm:text-3xl md:text-5xl font-extrabold mb-4 drop-shadow-lg"
          >
            Adopt. Love. Repeat. 🐾
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="text-sm sm:text-base md:text-xl mb-6"
          >
            Your new best friend is just a click away.
          </motion.p>
          <motion.a
            href="/pets"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: 'spring', stiffness: 300 }}
            className="inline-block px-6 py-3 bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-indigo-600 hover:to-blue-500 text-white font-semibold rounded-full shadow-md transition-all duration-300"
          >
            Browse Pets
          </motion.a>
        </motion.div>
      </div>
    </div>
  );
};

export default Banner;
