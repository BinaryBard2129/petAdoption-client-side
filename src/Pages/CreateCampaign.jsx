import React, { useState } from 'react';
import axios from 'axios';

const CreateCampaign = ({ userEmail, onCreated }) => {
  const [formData, setFormData] = useState({
    petName: '',
    petImage: '',
    description: '',
    maxAmount: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const { petName, petImage, description, maxAmount } = formData;

    if (!petName || !petImage || !description || !maxAmount) {
      setError('Please fill all fields');
      setLoading(false);
      return;
    }

    try {
      const response = await axios.post('https://pet-adoption-server-steel.vercel.app/donation-campaigns', {
        petName,
        petImage,
        description,
        maxAmount: Number(maxAmount),
        donatedAmount: 0,
        creatorEmail: userEmail,
      });

      // Try calling onCreated only if it's passed
      if (onCreated && typeof onCreated === 'function') {
        try {
          onCreated(response.data);
        } catch (callbackErr) {
          console.warn('onCreated callback failed:', callbackErr);
        }
      }

      // Clear form and show success message
      setFormData({
        petName: '',
        petImage: '',
        description: '',
        maxAmount: '',
      });

      setError('✅ Campaign created successfully!');
    } catch (err) {
      setError('❌ Failed to create campaign');
      console.error('API error:', err.response?.data || err.message);
    }

    setLoading(false);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-md mx-auto p-4 border rounded shadow-md bg-white dark:bg-gray-900 dark:text-white"
    >
      <h2 className="text-xl font-semibold mb-4">Create Donation Campaign</h2>

      {error && <p className={`${error.includes('❌') ? 'text-red-600' : 'text-green-600'} mb-2`}>{error}</p>}

      <input
        name="petName"
        placeholder="Pet Name"
        value={formData.petName}
        onChange={handleChange}
        className="w-full mb-2 p-2 border rounded"
      />

      <input
        name="petImage"
        placeholder="Pet Image URL"
        value={formData.petImage}
        onChange={handleChange}
        className="w-full mb-2 p-2 border rounded"
      />

      <textarea
        name="description"
        placeholder="Description"
        value={formData.description}
        onChange={handleChange}
        className="w-full mb-2 p-2 border rounded"
      />

      <input
        name="maxAmount"
        type="number"
        placeholder="Max Donation Amount"
        value={formData.maxAmount}
        onChange={handleChange}
        className="w-full mb-4 p-2 border rounded"
      />

      <button
        type="submit"
        disabled={loading}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 w-full"
      >
        {loading ? 'Creating...' : 'Create Campaign'}
      </button>
    </form>
  );
};

export default CreateCampaign;
