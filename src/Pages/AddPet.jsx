import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import Select from 'react-select';
import axios from 'axios';

const petCategories = [
  { value: 'Cat', label: 'Cat' },
  { value: 'Dog', label: 'Dog' },
  { value: 'Rabbit', label: 'Rabbit' },
  { value: 'Fish', label: 'Fish' },
  { value: 'Bird', label: 'Bird' },
];

const AddPet = () => {
  const formik = useFormik({
    initialValues: {
      imageUrl: '',
      name: '',
      age: '',
      category: null,
      location: '',
      shortDescription: '',
      longDescription: '',
    },
    validationSchema: Yup.object({
      imageUrl: Yup.string().required('Image URL is required'),
      name: Yup.string().required('Pet name is required'),
      age: Yup.number().required('Pet age is required').positive().integer(),
      category: Yup.object().nullable().required('Category is required'),
      location: Yup.string().required('Location is required'),
      shortDescription: Yup.string().required('Short description is required'),
      longDescription: Yup.string().required('Long description is required'),
    }),
    onSubmit: async (values, { resetForm }) => {
      try {
        const petData = {
          image: values.imageUrl,
          name: values.name,
          age: values.age,
          category: values.category.value,
          location: values.location,
          shortDescription: values.shortDescription,
          longDescription: values.longDescription,
          addedAt: new Date().toISOString(),
          adopted: false,
        };

        const res = await axios.post('https://pet-adoption-server-steel.vercel.app/pets', petData);
        console.log('Pet added:', res.data);
        resetForm();
        alert('Pet added successfully!');
      } catch (err) {
        console.error('Error adding pet:', err);
        alert('Something went wrong while adding the pet.');
      }
    },
  });

  return (
    <div className="max-w-2xl mx-auto p-4 bg-white shadow rounded">
      <h2 className="text-2xl font-semibold mb-4">Add a Pet</h2>
      <form onSubmit={formik.handleSubmit} className="space-y-4">
        {/* Image URL */}
        <div>
          <label className="block text-sm font-medium">Image URL</label>
          <input
            type="text"
            name="imageUrl"
            value={formik.values.imageUrl}
            onChange={formik.handleChange}
            className="w-full mt-1 p-2 border rounded"
          />
          {formik.touched.imageUrl && formik.errors.imageUrl && (
            <div className="text-red-500 text-sm">{formik.errors.imageUrl}</div>
          )}
        </div>

        {/* Name */}
        <div>
          <label className="block text-sm font-medium">Pet Name</label>
          <input
            type="text"
            name="name"
            value={formik.values.name}
            onChange={formik.handleChange}
            className="w-full mt-1 p-2 border rounded"
          />
          {formik.touched.name && formik.errors.name && (
            <div className="text-red-500 text-sm">{formik.errors.name}</div>
          )}
        </div>

        {/* Age */}
        <div>
          <label className="block text-sm font-medium">Age</label>
          <input
            type="number"
            name="age"
            value={formik.values.age}
            onChange={formik.handleChange}
            className="w-full mt-1 p-2 border rounded"
          />
          {formik.touched.age && formik.errors.age && (
            <div className="text-red-500 text-sm">{formik.errors.age}</div>
          )}
        </div>

        {/* Category */}
        <div>
          <label className="block text-sm font-medium">Category</label>
          <Select
            options={petCategories}
            name="category"
            value={formik.values.category}
            onChange={(option) => formik.setFieldValue('category', option)}
          />
          {formik.touched.category && formik.errors.category && (
            <div className="text-red-500 text-sm">{formik.errors.category}</div>
          )}
        </div>

        {/* Location */}
        <div>
          <label className="block text-sm font-medium">Location</label>
          <input
            type="text"
            name="location"
            value={formik.values.location}
            onChange={formik.handleChange}
            className="w-full mt-1 p-2 border rounded"
          />
          {formik.touched.location && formik.errors.location && (
            <div className="text-red-500 text-sm">{formik.errors.location}</div>
          )}
        </div>

        {/* Short Description */}
        <div>
          <label className="block text-sm font-medium">Short Description</label>
          <input
            type="text"
            name="shortDescription"
            value={formik.values.shortDescription}
            onChange={formik.handleChange}
            className="w-full mt-1 p-2 border rounded"
          />
          {formik.touched.shortDescription && formik.errors.shortDescription && (
            <div className="text-red-500 text-sm">{formik.errors.shortDescription}</div>
          )}
        </div>

        {/* Long Description */}
        <div>
          <label className="block text-sm font-medium">Long Description</label>
          <textarea
            name="longDescription"
            value={formik.values.longDescription}
            onChange={formik.handleChange}
            className="w-full mt-1 p-2 border rounded"
            rows={5}
          ></textarea>
          {formik.touched.longDescription && formik.errors.longDescription && (
            <div className="text-red-500 text-sm">{formik.errors.longDescription}</div>
          )}
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Add Pet
        </button>
      </form>
    </div>
  );
};

export default AddPet;
