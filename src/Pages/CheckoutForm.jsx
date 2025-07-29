import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useState } from "react";
import axios from "axios";

const CheckoutForm = ({ donationId, amount, onSuccess }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState(null);
  const [processing, setProcessing] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setProcessing(true);

    try {
      const { data } = await axios.post("http://localhost:5000/create-payment-intent", {
        amount,
      });

      const clientSecret = data.clientSecret;

      const card = elements.getElement(CardElement);

      const result = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card,
          billing_details: {
            name: "Anonymous",
          },
        },
      });

      if (result.error) {
        setError(result.error.message);
      } else if (result.paymentIntent.status === "succeeded") {
        await axios.post("http://localhost:5000/donations", {
          donationId,
          amount,
          transactionId: result.paymentIntent.id,
        });

        onSuccess();
      }
    } catch (err) {
      console.error(err);
      setError("Payment failed");
    }

    setProcessing(false);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <CardElement className="p-3 border border-gray-300 rounded-md" />
      {error && <p className="text-red-500">{error}</p>}
      <button
        type="submit"
        disabled={!stripe || processing || !amount}
        className="bg-green-600 text-white px-5 py-2 rounded hover:bg-green-700 transition-all w-full"
      >
        {processing ? "Processing..." : "Donate"}
      </button>
    </form>
  );
};

export default CheckoutForm;
