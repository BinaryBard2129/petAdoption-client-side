// components/SuccessStories.jsx
import React from 'react';
import { motion } from 'framer-motion';

const stories = [
  {
    id: 1,
    image: 'https://i.postimg.cc/DZvh4Qrz/cute-puppy-pomeranian-mixed-breed-pekingese-dog-run-on-the-grass-with-happiness-photo.jpg',
    name: 'Milo',
    story: 'Milo found his forever home after 6 months in a shelter. Now he enjoys daily walks and cuddles.',
  },
  {
    id: 2,
    image: 'https://i.postimg.cc/NjqWr7Yw/silver-tabby-cat-sitting-on-green-background-free-photo.jpg',
    name: 'Luna',
    story: 'Luna was rescued and adopted by a loving family who gave her a new beginning.',
  },
];

const cardVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.3,
      duration: 0.6,
      ease: 'easeOut',
    },
  }),
};

const SuccessStories = () => {
  return (
    <div className="bg-gray-100 py-12 px-4 md:px-8">
      <h2 className="text-3xl md:text-4xl font-bold text-center mb-8">Happy Tails 🐶🐱</h2>
      <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
        {stories.map(({ id, image, name, story }, index) => (
          <motion.div
            key={id}
            className="bg-white shadow-lg rounded-lg overflow-hidden"
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={index}
          >
            <img src={image} alt={name} className="w-full h-64 object-cover" />
            <div className="p-6">
              <h3 className="text-2xl font-semibold mb-2">{name}</h3>
              <p className="text-gray-700">{story}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default SuccessStories;
