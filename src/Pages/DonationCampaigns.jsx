import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { Link } from "react-router";

const DonationCampaigns = () => {
  const [campaigns, setCampaigns] = useState([]);
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);

  const observerRef = useRef();

  const fetchCampaigns = async () => {
    if (!hasMore || loading) return;

    setLoading(true);
    try {
      const res = await axios.get(`http://localhost:5000/donation-campaigns?page=${page}&limit=6`);
      setCampaigns((prev) => [...prev, ...res.data.campaigns]);
      setHasMore(res.data.hasMore);
      setPage((prev) => prev + 1);
    } catch (err) {
      console.error("Failed to fetch campaigns:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCampaigns();
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !loading) {
          fetchCampaigns();
        }
      },
      { threshold: 1.0 }
    );

    if (observerRef.current) observer.observe(observerRef.current);

    return () => {
      if (observerRef.current) observer.unobserve(observerRef.current);
    };
  }, [campaigns, hasMore, loading]);

  return (
    <div className="max-w-6xl mx-auto px-4 py-20">
      <h2 className="text-4xl font-bold text-center text-purple-700 mb-12">
        🐾 Donation Campaigns
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {campaigns.map((campaign, index) => {
          const progress = Math.min(
            (campaign.donatedAmount / campaign.maxDonation) * 100,
            100
          ).toFixed(0);

          return (
            <div
              key={index}
              className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden"
            >
              <img
                src={campaign.petImage}
                alt={campaign.petName}
                className="w-full h-56 object-cover"
              />
              <div className="p-5">
                <h3 className="text-2xl font-semibold text-purple-700 mb-1">
                  {campaign.petName}
                </h3>
                <p className="text-gray-600 mb-1">
                  🎯 <span className="font-medium">Goal:</span> ${campaign.maxDonation}
                </p>
                <p className="text-gray-600 mb-3">
                  💰 <span className="font-medium">Donated:</span> ${campaign.donatedAmount}
                </p>

                {/* Progress Bar */}
                <div className="w-full bg-gray-200 rounded-full h-3 mb-4">
                  <div
                    className="bg-gradient-to-r from-pink-500 to-purple-600 h-3 rounded-full transition-all duration-300"
                    style={{ width: `${progress}%` }}
                  ></div>
                </div>
                <p className="text-sm text-gray-500 mb-3">Progress: {progress}%</p>

                <Link to={`/donationCampaigns/${campaign._id}`}>
                  <button className="w-full py-2 px-4 bg-gradient-to-r from-pink-500 to-purple-600 text-white font-semibold rounded-xl shadow hover:scale-105 transition-transform duration-200">
                  View Details
                </button>
                </Link>
              </div>
            </div>
          );
        })}
      </div>

      {/* Observer for Infinite Scroll */}
      <div ref={observerRef} className="h-20 mt-10 flex justify-center items-center">
        {loading && <p className="text-gray-500">Loading more campaigns...</p>}
        {!hasMore && (
          <p className="text-gray-400 italic">🎉 You’ve reached the end of the list</p>
        )}
      </div>
    </div>
  );
};

export default DonationCampaigns;
