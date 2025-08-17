// src/pages/Events.jsx
import React from 'react';

const eventsData = [
  {
    id: 1,
    title: 'Adoption Drive at Central Park',
    image: '/images/event1.jpg',
    date: '2025-09-05',
    location: 'Central Park, Dhaka',
    description: 'Join us for a fun adoption drive and meet adorable pets looking for homes!',
  },
  {
    id: 2,
    title: 'Fundraiser for Shelter Renovation',
    image: '/images/event2.jpg',
    date: '2025-09-12',
    location: 'Happy Paws Shelter, Chittagong',
    description: 'Help us renovate our shelter and provide better care for our pets.',
  },
  {
    id: 3,
    title: 'Pet Health Camp',
    image: '/images/event3.jpg',
    date: '2025-09-20',
    location: 'Veterinary Clinic, Sylhet',
    description: 'Free checkups and vaccinations for pets. Open to all.',
  },
];

const Events = () => {
  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold text-center mb-8">Upcoming Events & Fundraisers</h1>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {eventsData
          .sort((a, b) => new Date(a.date) - new Date(b.date))
          .map((event) => (
            <div
              key={event.id}
              className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300"
            >
              <img
                src={event.image}
                alt={event.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-5">
                <h2 className="text-2xl font-semibold mb-2">{event.title}</h2>
                <p className="text-gray-600 mb-1">
                  <strong>Date:</strong> {new Date(event.date).toLocaleDateString()}
                </p>
                <p className="text-gray-600 mb-3">
                  <strong>Location:</strong> {event.location}
                </p>
                <p className="text-gray-700 mb-4">{event.description}</p>
                <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition">
                  Learn More
                </button>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Events;
