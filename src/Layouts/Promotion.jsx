import React from "react";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import toast, { Toaster } from "react-hot-toast";

const MySwal = withReactContent(Swal);

const promotions = [
  {
    id: 1,
    title: "Adopt a Pet & Get Free Starter Kit",
    image: "https://i.ibb.co.com/qLg6ZZCS/starterpack-v3.png",
    discount: "Free Food & Toys",
    validTill: "2025-09-30",
    description:
      "Adopt a pet this month and receive a free starter kit with food, toys, and essentials to welcome your new friend.",
  },
  {
    id: 2,
    title: "Donation Bonus: Double Impact",
    image: "https://i.ibb.co.com/yF9jDzdd/13.webp",
    discount: "Donate $50, Impact $100",
    validTill: "2025-10-15",
    description:
      "For every $50 donation, we double the impact to provide food and shelter for pets in need.",
  },
  {
    id: 3,
    title: "Pet Care Essentials Sale",
    image: "https://i.ibb.co.com/fV9cmZtR/dry-dog-food.jpg",
    discount: "Up to 30% Off",
    validTill: "2025-09-25",
    description:
      "Grab essential pet supplies with up to 30% discount. Limited stock, hurry before it ends!",
  },
];

const Promotion = () => {
  const handleClaim = (promo) => {
    MySwal.fire({
      title: <p>{promo.title}</p>,
      html: (
        <div>
          <p className="text-green-600 font-semibold mb-2">{promo.discount}</p>
          <p className="text-gray-500 mb-2">
            Valid Till: {new Date(promo.validTill).toLocaleDateString()}
          </p>
          <p className="text-gray-700">{promo.description}</p>
        </div>
      ),
      showCancelButton: true,
      confirmButtonText: "Confirm Claim",
      cancelButtonText: "Cancel",
      confirmButtonColor: "#2563EB", // blue-600
    }).then((result) => {
      if (result.isConfirmed) {
        toast.success("Offer Claimed!");
      }
    });
  };

  return (
    <div className="container max-w-7xl mx-auto px-4 py-12">
      <Toaster position="top-right" reverseOrder={false} />
      <h1 className="text-4xl font-bold text-center mb-12">Current Promotions & Offers</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {promotions.map((promo) => (
          <div
            key={promo.id}
            className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300 flex flex-col"
          >
            <div className="w-full aspect-[4/3] overflow-hidden">
              <img
                src={promo.image}
                alt={promo.title}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-5 flex-1 flex flex-col justify-between">
              <div>
                <h2 className="text-2xl font-semibold mb-2">{promo.title}</h2>
                <p className="text-green-600 font-bold mb-2">{promo.discount}</p>
                <p className="text-gray-500 text-sm mb-4">
                  Valid Till: {new Date(promo.validTill).toLocaleDateString()}
                </p>
                <p className="text-gray-700 mb-4">{promo.description}</p>
              </div>
              <button
                onClick={() => handleClaim(promo)}
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition mt-2"
              >
                Claim Offer
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Promotion;
