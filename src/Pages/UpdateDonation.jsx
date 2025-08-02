import React, { useEffect, useState } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router";
import toast, { Toaster } from "react-hot-toast";

const UpdateDonation = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { register, handleSubmit, setValue } = useForm();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`https://pet-adoption-server-steel.vercel.app/donation-campaigns/${id}`)
      .then((res) => {
        const donation = res.data;
        setValue("petName", donation.petName);
        setValue("petImage", donation.petImage);
        setValue("maxDonation", donation.maxDonation);
        setValue("description", donation.description || "");
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching donation", err);
        setLoading(false);
      });
  }, [id, setValue]);

  const onSubmit = (data) => {
    axios
      .put(`https://pet-adoption-server-steel.vercel.app/donation-campaigns/${id}`, data)
      .then((res) => {
        if (res.data.success) {
          toast.success("Donation updated successfully!");
        //   navigate("/dashboard/my-campaigns");
        } else {
          toast.error("Failed to update donation.");
        }
      })
      .catch((error) => {
        console.error("Error updating donation:", error.response?.data || error);
        toast.error("Failed to update donation.");
      });
  };

  if (loading) return <p className="text-center mt-10">Loading donation...</p>;

  return (
    <div className="max-w-xl mx-auto p-6 bg-white shadow-md rounded-xl mt-10">
      <Toaster position="top-center" reverseOrder={false} />
      <h2 className="text-2xl font-bold mb-6 text-center">Update Donation Campaign</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="block font-medium">Pet Name</label>
          <input
            type="text"
            {...register("petName", { required: true })}
            className="w-full border px-4 py-2 rounded-md"
            placeholder="Enter pet name"
          />
        </div>
        <div>
          <label className="block font-medium">Pet Image URL</label>
          <input
            type="text"
            {...register("petImage", { required: true })}
            className="w-full border px-4 py-2 rounded-md"
            placeholder="Enter image URL"
          />
        </div>
        <div>
          <label className="block font-medium">Max Donation Amount</label>
          <input
            type="number"
            {...register("maxDonation", { required: true })}
            className="w-full border px-4 py-2 rounded-md"
            placeholder="Enter max donation"
          />
        </div>
        <div>
          <label className="block font-medium">Description (optional)</label>
          <textarea
            {...register("description")}
            className="w-full border px-4 py-2 rounded-md"
            placeholder="Enter description"
            rows={4}
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
        >
          Update Campaign
        </button>
      </form>
    </div>
  );
};

export default UpdateDonation;
