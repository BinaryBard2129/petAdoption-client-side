import React from "react";
import { FaUser, FaCalendarAlt } from "react-icons/fa";

const blogPosts = [
  {
    id: 1,
    title: "5 Essential Tips for New Dog Owners",
    image: "https://i.ibb.co.com/n8wf8cJh/maxresdefault-1.jpg",
    author: "Sonia Rahman",
    date: "2025-08-10",
    content:
      "Starting life with a new dog can be exciting and challenging. Here are 5 essential tips to make it easier: feed properly, train with patience, give lots of love, maintain health checkups, and provide exercise.",
  },
  {
    id: 2,
    title: "Healthy Nutrition for Cats",
    image: "https://i.ibb.co.com/C30cYPth/Cat-eating-on-bench.jpg",
    author: "Imran Chowdhury",
    date: "2025-08-15",
    content:
      "Cats need a balanced diet to thrive. Learn about nutrients, feeding schedules, and food types. Include protein-rich food, avoid overfeeding, and provide fresh water daily.",
  },
  {
    id: 3,
    title: "Grooming Tips for Long-Haired Pets",
    image: "https://i.ibb.co.com/tM4XRf5Y/images-31.jpg",
    author: "Nadia Islam",
    date: "2025-08-18",
    content:
      "Long-haired pets require special care. Brush regularly, use gentle shampoo, trim nails carefully, and keep ears clean. This keeps their fur healthy and tangle-free.",
  },
];

const Blog = () => {
  return (
    <div className=" mx-auto max-w-7xl py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-center mb-12 text-gray-800">
          Pet Care Tips & Blog
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post) => (
            <div
              key={post.id}
              className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300 flex flex-col"
            >
              <div className="w-full aspect-[16/9] overflow-hidden">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-6 flex-1 flex flex-col">
                <h2 className="text-2xl font-semibold mb-3 text-gray-800">
                  {post.title}
                </h2>
                <div className="flex items-center text-gray-500 text-sm mb-4 gap-4">
                  <span className="flex items-center gap-1">
                    <FaUser /> {post.author}
                  </span>
                  <span className="flex items-center gap-1">
                    <FaCalendarAlt /> {new Date(post.date).toLocaleDateString()}
                  </span>
                </div>
                <p className="text-gray-700">{post.content}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Blog;
