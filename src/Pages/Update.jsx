import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import toast, { Toaster } from 'react-hot-toast';

const Update = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { register, handleSubmit, setValue } = useForm();
  const [loading, setLoading] = useState(true);
  const [creatorEmail, setCreatorEmail] = useState('');

  useEffect(() => {
    axios.get(`https://pet-adoption-server-steel.vercel.app/pets/${id}`)
      .then(res => {
        const pet = res.data;
        setValue('name', pet.name);
        setValue('age', pet.age);
        setValue('category', pet.category);
        setValue('location', pet.location);
        setValue('shortDescription', pet.shortDescription);
        setValue('longDescription', pet.longDescription);
        setCreatorEmail(pet.creatorEmail || '');
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
        toast.error("Failed to load pet data");
      });
  }, [id, setValue]);

  const onSubmit = async (data) => {
    try {
      data.creatorEmail = creatorEmail;  // Add creatorEmail to update payload
      await axios.put(`https://pet-adoption-server-steel.vercel.app/pets/${id}`, data);
      toast.success('Pet updated successfully!');
    //   setTimeout(() => navigate('/my-added-pets'), 1500);
    } catch (err) {
      toast.error('Failed to update pet.');
    }
  };

  if (loading) return <p className="text-center text-lg font-medium text-purple-600 mt-10">Loading pet info...</p>;

  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      <Toaster position="top-center" reverseOrder={false} />
      <h2 className="text-3xl font-bold text-center text-purple-700 mb-6">Update Pet Information 🐾</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="bg-white p-8 rounded-2xl shadow-xl space-y-6">
        {/* Hidden input for creatorEmail (optional) */}
        <input type="hidden" value={creatorEmail} {...register('creatorEmail')} />

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Pet Name</label>
          <input
            {...register('name')}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            placeholder="Pet Name"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Age</label>
          <input
            {...register('age')}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            placeholder="Pet Age"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
          <input
            {...register('category')}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            placeholder="e.g., Cat, Dog, Rabbit"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
          <input
            {...register('location')}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            placeholder="Location"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Short Description</label>
          <textarea
            {...register('shortDescription')}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            placeholder="A short description about the pet"
            rows={2}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Long Description</label>
          <textarea
            {...register('longDescription')}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            placeholder="A detailed description about the pet"
            rows={4}
          />
        </div>

        <button
          type="submit"
          className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2.5 rounded-lg transition duration-300"
        >
          Update Pet
        </button>
      </form>
    </div>
  );
};

export default Update;
