import { useState } from "react";
import CheckoutForm from "./CheckoutForm";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe("pk_test_51RpZk8HDDcAhke..."); // your publishable key

const DonateModal = ({ campaign, onClose }) => {
  const [amount, setAmount] = useState("");

  const handleSuccess = () => {
    alert("Donation successful!");
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg w-full max-w-md relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-red-600"
        >
          ✖
        </button>
        <h3 className="text-xl font-bold mb-4">Donate to {campaign.petName}</h3>

        <input
          type="number"
          placeholder="Enter donation amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="w-full px-4 py-2 border rounded mb-4"
        />

        <Elements stripe={stripePromise}>
          <CheckoutForm
            donationId={campaign._id}
            amount={parseFloat(amount)}
            onSuccess={handleSuccess}
          />
        </Elements>
      </div>
    </div>
  );
};

export default DonateModal;
