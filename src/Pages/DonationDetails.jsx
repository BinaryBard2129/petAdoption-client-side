import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "./CheckoutForm";
import { useParams, Link } from "react-router";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

const DonationDetails = () => {
  const { id } = useParams();
  const [showModal, setShowModal] = useState(false);
  const [donationAmount, setDonationAmount] = useState("");

  const { data: donation, isLoading, error } = useQuery({
    queryKey: ["donation", id],
    queryFn: async () => {
      const res = await axios.get(`https://pet-adoption-server-steel.vercel.app/donation-campaigns/${id}`);
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
    <div className="max-w-6xl mx-auto px-4 py-12">
      {/* Main Donation Section */}
      <div className="grid md:grid-cols-2 gap-8 items-center bg-white shadow-lg rounded-xl p-6">
        <img
          src={donation.petImage}
          alt={donation.petName}
          className="w-full h-96 object-cover rounded-xl shadow-md"
        />
        <div>
          <h2 className="text-4xl font-bold text-blue-600 mb-4">{donation.petName}</h2>
          <p className="text-gray-700 mb-2">🎯 Max Goal: <span className="font-semibold">${donation.maxAmount}</span></p>
          <p className="text-gray-700 mb-4">💰 Donated: <span className="font-semibold">${donation.donatedAmount}</span></p>
          <p className="text-gray-600 mb-6">{donation.description}</p>
          <button
            onClick={() => setShowModal(true)}
            className="bg-gradient-to-r from-blue-500 to-blue-700 text-white px-6 py-3 rounded-xl shadow hover:scale-105 transition-transform duration-200"
          >
            Donate Now
          </button>
        </div>
      </div>

      {/* Donation Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex justify-center items-center px-4">
          <div className="bg-white rounded-xl p-6 max-w-md w-full relative shadow-2xl">
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-900 font-bold text-xl"
            >
              ✕
            </button>
            <h3 className="text-2xl font-bold text-blue-600 mb-4">
              Donate to {donation.petName}
            </h3>

            <input
              type="number"
              min={1}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 mb-4 focus:ring-2 focus:ring-blue-400 outline-none"
              placeholder="Enter amount (USD)"
              value={donationAmount}
              onChange={(e) => setDonationAmount(e.target.value)}
            />

            {donationAmount > 0 ? (
              <Elements stripe={stripePromise}>
                <CheckoutForm
                  donationId={donation._id}
                  amount={parseInt(donationAmount)}
                  onSuccess={() => {
                    setShowModal(false);
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

      {/* Recommended Donations */}
      <div className="mt-16">
        <h3 className="text-3xl font-bold mb-6 text-gray-800">Recommended Donations</h3>
        <div className="grid md:grid-cols-3 gap-6">
          {recommended.slice(0, 3).map((rec) => (
            <div
              key={rec._id}
              className="bg-white shadow-lg rounded-xl overflow-hidden hover:shadow-2xl transition-all duration-300 flex flex-col h-full"
            >
              <img
                src={rec.petImage}
                alt={rec.petName}
                className="w-full h-48 object-cover"
              />
              <div className="p-4 flex flex-col flex-1">
                <h4 className="text-xl font-semibold text-blue-600">{rec.petName}</h4>
                <p className="text-gray-600 text-sm mt-1">🎯 Max: ${rec.maxAmount}</p>
                <p className="text-gray-600 text-sm">💰 Donated: ${rec.donatedAmount}</p>
                <Link to={`/donationCampaigns/${rec._id}`} className="mt-auto">
                  <button className="mt-3 py-2 w-full bg-gradient-to-r from-blue-500 to-blue-700 text-white rounded-xl font-semibold shadow hover:scale-105 transition-transform duration-200">
                    View Details
                  </button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DonationDetails;
