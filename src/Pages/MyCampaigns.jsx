import React, { useEffect, useState } from "react";
import axios from "axios";

const MyCampaigns = ({ user }) => {
  const [campaigns, setCampaigns] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user?.email) return;

    setLoading(true);
    axios
      .get(`http://localhost:5000/my-campaigns?email=${user.email}`)
      .then((res) => {
        setCampaigns(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error loading campaigns", err);
        setLoading(false);
      });
  }, [user?.email]);

  if (loading) return <p className="text-center mt-10">Loading...</p>;
  if (campaigns.length === 0)
    return <p className="text-center mt-10">No campaigns found.</p>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
      {campaigns.map((campaign) => (
        <div
          key={campaign._id}
          className="border shadow-md rounded-xl p-4 bg-white space-y-2"
        >
          <img
            src={campaign.petImage}
            alt={campaign.petName}
            className="w-full h-48 object-cover rounded-md"
          />
          <h2 className="text-xl font-semibold">{campaign.petName}</h2>
          <p>
            <strong>Max Donation:</strong> ${campaign.maxDonation}
          </p>
          <p>
            <strong>Donated:</strong> ${campaign.donatedAmount || 0}
          </p>
          <p className="text-sm text-gray-500">
            Created on: {new Date(campaign.date).toLocaleDateString()}
          </p>
        </div>
      ))}
    </div>
  );
};

export default MyCampaigns;
