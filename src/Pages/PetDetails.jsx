import React, { useContext } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useParams } from "react-router";
import { AuthContext } from "./AuthProvider"; // Adjust import path
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";

const PetDetails = () => {
  const { id } = useParams();
  const { user } = useContext(AuthContext);

  const { data: pet, isLoading, error } = useQuery({
    queryKey: ["pet", id],
    queryFn: async () => {
      const res = await axios.get(`http://localhost:5000/pets/${id}`);
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
          await axios.post("http://localhost:5000/adoptions", adoptionData);
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
    <div className="max-w-5xl mt-16 mx-auto px-4 py-10">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        <img
          src={pet.image}
          alt={pet.name}
          className="w-full h-[400px] object-cover rounded-lg shadow-lg"
        />
        <div>
          <h2 className="text-4xl font-bold text-purple-700 mb-3">{pet.name}</h2>
          <p className="text-gray-600 mb-2">🎂 Age: {pet.age}</p>
          <p className="text-gray-600 mb-2">📍 Location: {pet.location}</p>
          <p className="text-gray-600 mb-2">🐾 Category: {pet.category}</p>
          <p className="text-gray-600 mb-4">🗓 Listed: {new Date(pet.date).toLocaleDateString()}</p>
          {pet.description && (
            <p className="text-gray-700 mb-6">{pet.description}</p>
          )}
          <button
            onClick={handleAdoption}
            className="bg-gradient-to-r from-pink-500 to-purple-600 text-white font-semibold px-6 py-3 rounded-lg shadow hover:scale-105 transition-all"
          >
            Adopt Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default PetDetails;
