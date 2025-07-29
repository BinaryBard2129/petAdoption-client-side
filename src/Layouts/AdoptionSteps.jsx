// components/AdoptionSteps.jsx
import React from 'react';
import { FaSearch, FaClipboardCheck, FaHandshake, FaHome } from 'react-icons/fa';
import { motion } from 'framer-motion';

const steps = [
  {
    icon: <FaSearch />,
    title: 'Browse Pets',
    desc: 'Explore all available pets by category, age, or location.',
  },
  {
    icon: <FaClipboardCheck />,
    title: 'Apply Online',
    desc: 'Fill out a short adoption application for your chosen pet.',
  },
  {
    icon: <FaHandshake />,
    title: 'Meet & Greet',
    desc: 'Schedule a visit to meet your future pet in person.',
  },
  {
    icon: <FaHome />,
    title: 'Bring Them Home',
    desc: 'Complete the process and welcome your new friend!',
  },
];

const AdoptionSteps = () => {
  return (
    <section className="py-14 px-4 bg-white">
      <motion.h2
        className="text-3xl md:text-4xl font-bold text-center mb-10"
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
      >
        How Adoption Works 🐾
      </motion.h2>

      <div className="grid md:grid-cols-4 gap-8 max-w-6xl mx-auto">
        {steps.map((step, index) => (
          <motion.div
            key={index}
            className="flex flex-col items-center text-center bg-blue-50 rounded-xl p-6 shadow hover:shadow-lg transition"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.2 }}
            viewport={{ once: true }}
          >
            <div className="text-4xl text-blue-600 mb-4">{step.icon}</div>
            <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
            <p className="text-gray-600">{step.desc}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default AdoptionSteps;
