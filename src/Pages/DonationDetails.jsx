import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "./CheckoutForm";
import { useParams } from "react-router";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

const DonationDetails = () => {
  const { id } = useParams();
  const [showModal, setShowModal] = useState(false);
  const [donationAmount, setDonationAmount] = useState("");

  const { data: donation, isLoading, error } = useQuery({
    queryKey: ["donation", id],
    queryFn: async () => {
      const res = await axios.get(`https://pet-adoption-server-steel.vercel.app/donation/${id}`);
      return res.data;
    },
  });

  const { data: recommended = [] } = useQuery({
    queryKey: ["recommendedDonations"],
    queryFn: async () => {
      const res = await axios.get("https://pet-adoption-server-steel.vercel.app/donation/recommended");
      return res.data;
    },
  });

  if (isLoading) return <p className="text-center mt-10">Loading donation details...</p>;
  if (error) return <p className="text-red-500 text-center">Failed to load donation.</p>;

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <div className="grid md:grid-cols-2 gap-6 items-center">
        <img
          src={donation.petImage}
          alt={donation.petName}
          className="w-full h-[400px] object-cover rounded-lg shadow"
        />
        <div>
          <h2 className="text-3xl font-bold text-purple-700 mb-2">{donation.petName}</h2>
          <p className="mb-1">🎯 Max Goal: ${donation.maxAmount}</p>
          <p className="mb-4">💰 Donated: ${donation.donatedAmount}</p>
          <p className="mb-6">📝 {donation.description}</p>
          <button
            onClick={() => setShowModal(true)}
            className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-2 rounded shadow"
          >
            Donate Now
          </button>
        </div>
      </div>

      {/* 💳 Donation Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 z-40 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg max-w-md w-full z-50 relative">
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-2 right-3 text-gray-500 hover:text-black"
            >
              ✕
            </button>
            <h3 className="text-xl font-semibold mb-4 text-purple-600">
              Donate to {donation.petName}
            </h3>

            <input
              type="number"
              className="w-full border border-gray-300 rounded px-3 py-2 mb-4"
              placeholder="Enter amount (USD)"
              value={donationAmount}
              onChange={(e) => setDonationAmount(e.target.value)}
              min={1}
            />

            {donationAmount > 0 ? (
              <Elements stripe={stripePromise}>
                <CheckoutForm
                  donationId={donation._id}
                  amount={parseInt(donationAmount)}
                  onSuccess={() => {
                    setShowModal(false);
                    alert("🎉 Thank you for your donation!");
                    setDonationAmount("");
                  }}
                />
              </Elements>
            ) : (
              <p className="text-sm text-red-500">Please enter a valid amount</p>
            )}
          </div>
        </div>
      )}

      {/* 💡 Recommended Donations */}
      <div className="mt-16">
        <h3 className="text-2xl font-bold mb-6 text-gray-800">Recommended Donations</h3>
        <div className="grid md:grid-cols-3 gap-6">
          {recommended.slice(0, 3).map((rec) => (
            <div
              key={rec._id}
              className="bg-white shadow rounded-lg p-4 border border-gray-100"
            >
              <img
                src={rec.petImage}
                alt={rec.petName}
                className="w-full h-48 object-cover rounded"
              />
              <h4 className="text-lg font-semibold mt-3 text-purple-700">{rec.petName}</h4>
              <p className="text-sm mt-1">🎯 Max: ${rec.maxAmount}</p>
              <p className="text-sm">💰 Donated: ${rec.donatedAmount}</p>
              <button className="mt-3 text-sm text-purple-500 hover:underline">
                View Details
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DonationDetails;
