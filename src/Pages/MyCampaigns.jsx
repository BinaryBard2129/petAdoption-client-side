import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { AuthContext } from "./AuthProvider";
import { Link } from "react-router";

const MyCampaigns = () => {
  const { user } = useContext(AuthContext);
  const [campaigns, setCampaigns] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchCampaigns = () => {
    setLoading(true);
    axios
      .get(`https://pet-adoption-server-steel.vercel.app/my-campaigns?email=${user.email}`)
      .then((res) => {
        setCampaigns(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error loading campaigns", err);
        setError("Failed to load campaigns. Please try again later.");
        setLoading(false);
      });
  };

  useEffect(() => {
    if (!user?.email) return;
    fetchCampaigns();
  }, [user?.email]);

  const handleDelete = async (id) => {
    const confirm = window.confirm(
      "Are you sure you want to delete this campaign?"
    );
    if (!confirm) return;

    try {
      const res = await axios.delete(`https://pet-adoption-server-steel.vercel.app/campaigns/${id}`);
      if (res.data?.deletedCount > 0) {
        setCampaigns((prevCampaigns) =>
          prevCampaigns.filter((campaign) => campaign._id !== id)
        );
      } else {
        alert("Failed to delete campaign.");
      }
    } catch (err) {
      console.error("Delete error:", err);
      alert("Failed to delete campaign.");
    }
  };

  if (loading)
    return (
      <p className="text-center mt-10 text-purple-600 font-semibold">
        Loading campaigns...
      </p>
    );

  if (error)
    return (
      <p className="text-center mt-10 text-red-600 font-semibold">{error}</p>
    );

  if (campaigns.length === 0)
    return (
      <p className="text-center mt-10 text-gray-600">No campaigns found.</p>
    );

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
      {campaigns.map((campaign) => {
        const max = campaign.maxDonation || 0;
        const donated = campaign.donatedAmount || 0;
        const percent = max > 0 ? Math.min((donated / max) * 100, 100) : 0;

        return (
          <div
            key={campaign._id}
            className="border shadow-md rounded-xl p-4 bg-white space-y-2"
          >
            <img
              src={campaign.petImage || "/default-pet.jpg"}
              alt={campaign.petName || "Pet image"}
              className="w-full h-48 object-cover rounded-md"
            />
            <h2 className="text-xl font-semibold">
              {campaign.petName || "Unnamed Pet"}
            </h2>
            <p>
              <strong>Max Donation:</strong> ${max}
            </p>
            <p>
              <strong>Donated:</strong> ${donated}
            </p>

            {/* Progress Bar */}
            <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden">
              <div
                className="h-full bg-green-500"
                style={{ width: `${percent}%` }}
              ></div>
            </div>
            <p className="text-sm text-gray-600">{percent.toFixed(1)}% funded</p>

            <p className="text-sm text-gray-500">
              Created on:{" "}
              {campaign.date
                ? new Date(campaign.date).toLocaleDateString()
                : "Unknown date"}
            </p>
            <div className="flex gap-2">
              <Link to={`/dashboard/update-campaign/${campaign._id}`}>
                <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition">
                  Update
                </button>
              </Link>
              <button
                onClick={() => handleDelete(campaign._id)}
                className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition"
              >
                Delete
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default MyCampaigns;
