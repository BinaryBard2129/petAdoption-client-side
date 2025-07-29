import React from "react";
import { motion } from "framer-motion";

const AboutUs = () => {
  return (
    <section className="bg-gradient-to-br from-blue-50 to-white py-16 px-4 md:px-8 lg:px-16">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10 items-center">
        {/* Image side */}
        <motion.img
          src="https://i.postimg.cc/XY9cp9Nm/istockphoto-1516239450-612x612.jpg"
          alt="About Us"
          className="rounded-3xl shadow-lg w-full"
          initial={{ opacity: 0, x: -60 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        />

        {/* Text side */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            About Us
          </h2>
          <p className="text-gray-600 text-lg mb-4 leading-relaxed">
            <span className="font-semibold text-blue-600">PawPal</span> is
            built with one mission in mind: to give every pet a chance to find
            a loving family. ❤️🐾
          </p>
          <p className="text-gray-600 text-lg leading-relaxed">
            We connect shelters and pet lovers across the country. With a
            smooth adoption process, verified listings, and heartwarming
            stories, we make sure both pets and humans get the companionship
            they deserve.
          </p>
          <motion.a
            href="/pets"
            className="inline-block mt-6 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-semibold shadow transition"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Start Exploring
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutUs;
