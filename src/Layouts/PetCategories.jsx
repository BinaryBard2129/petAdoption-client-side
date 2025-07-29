// components/PetCategories.jsx
import React from 'react';
import { motion } from 'framer-motion';

const categories = [
  { name: 'Cats', icon: '🐱' },
  { name: 'Dogs', icon: '🐶' },
  { name: 'Rabbits', icon: '🐰' },
  { name: 'Fish', icon: '🐠' },
  { name: 'Birds', icon: '🐦' },
  // Add more categories here if needed
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
};

const PetCategories = () => {
  return (
    <section className="py-14 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-10">Explore Pet Categories 🐾</h2>

        <motion.div
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          {categories.map((category) => (
            <motion.button
              key={category.name}
              variants={cardVariants}
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 200, damping: 15 }}
              className="flex flex-col items-center justify-center bg-white shadow-md rounded-lg p-6 hover:shadow-xl transition cursor-pointer"
              onClick={() => alert(`You clicked on ${category.name}`)}
              type="button"
            >
              <span className="text-5xl mb-3">{category.icon}</span>
              <span className="text-lg font-semibold text-gray-700">{category.name}</span>
            </motion.button>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default PetCategories;
