import React, { useContext } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useParams, Link } from "react-router";
import { AuthContext } from "./AuthProvider";
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";

const PetDetails = () => {
  const { id } = useParams();
  const { user } = useContext(AuthContext);

  const { data: pet, isLoading, error } = useQuery({
    queryKey: ["pet", id],
    queryFn: async () => {
      const res = await axios.get(`https://pet-adoption-server-steel.vercel.app/pets/${id}`);
      return res.data;
    }
  });

  const handleAdoption = () => {
    Swal.fire({
      title: `Adopt ${pet?.name || ""}`,
      html: `
        <input id="swal-userName" class="swal2-input" placeholder="User Name" value="${user?.displayName || ''}" disabled />
        <input id="swal-userEmail" class="swal2-input" placeholder="Email" value="${user?.email || ''}" disabled />
        <input id="swal-phone" class="swal2-input" placeholder="Phone Number" />
        <input id="swal-address" class="swal2-input" placeholder="Address" />
      `,
      focusConfirm: false,
      showCancelButton: true,
      preConfirm: () => {
        const phone = document.getElementById('swal-phone').value;
        const address = document.getElementById('swal-address').value;
        if (!phone || !address) {
          Swal.showValidationMessage('Please enter phone number and address');
          return false;
        }
        return { phone, address };
      }
    }).then(async (result) => {
      if (result.isConfirmed) {
        const { phone, address } = result.value;
        const adoptionData = {
          petId: pet._id,
          petName: pet.name,
          petImage: pet.image,
          userName: user?.displayName || "Anonymous",
          userEmail: user?.email || "No email",
          phone,
          address,
          status: "pending",
          requestedAt: new Date(),
        };
        try {
          await axios.post("https://pet-adoption-server-steel.vercel.app/adoptions", adoptionData);
          Swal.fire('Success!', 'Adoption request submitted!', 'success');
        } catch (err) {
          Swal.fire('Error!', 'Something went wrong. Please try again.', 'error');
        }
      }
    });
  };

  if (isLoading) return <p className="text-center mt-10">Loading pet...</p>;
  if (error) return <p className="text-red-500 text-center">Failed to load pet.</p>;

  return (
    <div className="bg-gray-50 min-h-screen py-12 px-4">
      <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow-lg overflow-hidden p-6 md:p-10">
        <Link
          to="/petListing"
          className="inline-block mb-6 text-blue-600 font-semibold hover:underline"
        >
          ← Back to Listing
        </Link>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
          {/* Pet Image */}
          <img
            src={pet.image || "https://via.placeholder.com/400x400"}
            alt={pet.name}
            className="w-full h-[400px] md:h-[500px] object-cover rounded-xl shadow-lg hover:scale-105 transition-transform duration-300"
          />

          {/* Pet Info */}
          <div className="flex flex-col justify-between">
            <div>
              <h2 className="text-4xl font-extrabold text-blue-600 mb-4">{pet.name}</h2>
              <p className="text-gray-700 mb-2">🎂 <span className="font-medium">Age:</span> {pet.age}</p>
              <p className="text-gray-700 mb-2">📍 <span className="font-medium">Location:</span> {pet.location}</p>
              <p className="text-gray-700 mb-2">🐾 <span className="font-medium">Category:</span> {pet.category}</p>
              <p className="text-gray-700 mb-4">🗓 <span className="font-medium">Listed:</span> {new Date(pet.date).toLocaleDateString()}</p>
              {pet.description && <p className="text-gray-600 mb-6">{pet.description}</p>}
            </div>

            <button
              onClick={handleAdoption}
              className="mt-4 bg-gradient-to-r from-blue-500 to-blue-700 text-white font-semibold px-6 py-3 rounded-lg shadow-lg hover:from-blue-600 hover:to-blue-800 hover:scale-105 transition-all"
            >
              Adopt Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PetDetails;
