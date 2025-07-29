import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import toast, { Toaster } from "react-hot-toast";

const MyAddedPets = ({ user }) => {
  const [pets, setPets] = useState([]);
  const [loading, setLoading] = useState(true);

  // Sorting state
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    if (!user?.email) return;
    setLoading(true);
    fetch(`http://localhost:5000/my-pets?email=${user.email}`)
      .then((res) => res.json())
      .then((data) => setPets(data))
      .catch(() => toast.error("Failed to load pets"))
      .finally(() => setLoading(false));
  }, [user?.email]);

  // Sort handler
  const handleSort = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };

  // Sort pets array
  const sortedPets = React.useMemo(() => {
    if (!sortConfig.key) return pets;
    return [...pets].sort((a, b) => {
      const aVal = a[sortConfig.key];
      const bVal = b[sortConfig.key];
      if (typeof aVal === "string") {
        if (sortConfig.direction === "asc") return aVal.localeCompare(bVal);
        else return bVal.localeCompare(aVal);
      } else if (typeof aVal === "boolean") {
        if (sortConfig.direction === "asc") return aVal - bVal;
        else return bVal - aVal;
      } else {
        if (sortConfig.direction === "asc") return aVal - bVal;
        else return bVal - aVal;
      }
    });
  }, [pets, sortConfig]);

  // Pagination calculations
  const totalPages = Math.ceil(sortedPets.length / itemsPerPage);
  const paginatedPets = sortedPets.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Delete pet
  const deletePet = async (pet) => {
    const result = await Swal.fire({
      title: `Delete ${pet.name}?`,
      text: "This action cannot be undone.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#dc2626",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Yes, delete it!",
    });

    if (result.isConfirmed) {
      try {
        const res = await fetch(`http://localhost:5000/pet/${pet._id}`, {
          method: "DELETE",
        });
        if (res.ok) {
          setPets((prev) => prev.filter((p) => p._id !== pet._id));
          toast.success(`${pet.name} deleted`);
          // Adjust current page if needed
          if (paginatedPets.length === 1 && currentPage > 1) {
            setCurrentPage(currentPage - 1);
          }
        } else {
          toast.error("Failed to delete pet");
        }
      } catch {
        toast.error("Error deleting pet");
      }
    }
  };

  // Mark pet as adopted
  const markAdopted = async (pet) => {
    try {
      const res = await fetch(`http://localhost:5000/pet/adopt/${pet._id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ adopted: true }),
      });
      if (res.ok) {
        setPets((prev) =>
          prev.map((p) =>
            p._id === pet._id ? { ...p, adopted: true } : p
          )
        );
        toast.success("Marked as adopted");
      } else {
        toast.error("Failed to update adoption status");
      }
    } catch {
      toast.error("Error updating adoption status");
    }
  };

  if (loading) return <p>Loading pets...</p>;
  if (!pets.length) return <p>No pets found.</p>;

  return (
    <div className="p-4 max-w-7xl mx-auto">
      <Toaster />
      <h2 className="text-3xl font-semibold mb-4">My Added Pets</h2>

      <table className="w-full border-collapse border border-gray-300">
        <thead className="bg-gray-100">
          <tr>
            <th
              className="border border-gray-300 px-4 py-2 cursor-pointer"
              onClick={() => handleSort("serial")}
            >
              S/N
            </th>
            <th
              className="border border-gray-300 px-4 py-2 cursor-pointer"
              onClick={() => handleSort("name")}
            >
              Pet Name {sortConfig.key === "name" ? (sortConfig.direction === "asc" ? "▲" : "▼") : ""}
            </th>
            <th
              className="border border-gray-300 px-4 py-2 cursor-pointer"
              onClick={() => handleSort("category")}
            >
              Category {sortConfig.key === "category" ? (sortConfig.direction === "asc" ? "▲" : "▼") : ""}
            </th>
            <th className="border border-gray-300 px-4 py-2">Image</th>
            <th
              className="border border-gray-300 px-4 py-2 cursor-pointer"
              onClick={() => handleSort("adopted")}
            >
              Adoption Status {sortConfig.key === "adopted" ? (sortConfig.direction === "asc" ? "▲" : "▼") : ""}
            </th>
            <th className="border border-gray-300 px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {paginatedPets.map((pet, idx) => (
            <tr
              key={pet._id}
              className="hover:bg-gray-50 text-center align-middle"
            >
              <td className="border border-gray-300 px-4 py-2">{(currentPage - 1) * itemsPerPage + idx + 1}</td>
              <td className="border border-gray-300 px-4 py-2">{pet.name}</td>
              <td className="border border-gray-300 px-4 py-2">{pet.category}</td>
              <td className="border border-gray-300 px-4 py-2">
                <img
                  src={pet.image}
                  alt={pet.name}
                  className="w-20 h-20 object-cover mx-auto rounded"
                />
              </td>
              <td className="border border-gray-300 px-4 py-2">
                {pet.adopted ? "Adopted" : "Not Adopted"}
              </td>
              <td className="border border-gray-300 px-4 py-2 space-x-2">
                <button
                  className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                  onClick={() =>
                    alert(`Redirect to update pet page for pet id: ${pet._id}`)
                  }
                >
                  Update
                </button>
                <button
                  className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                  onClick={() => deletePet(pet)}
                >
                  Delete
                </button>
                {!pet.adopted && (
                  <button
                    className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
                    onClick={() => markAdopted(pet)}
                  >
                    Adopted
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="flex justify-center mt-4 space-x-2">
          <button
            onClick={() => setCurrentPage(1)}
            disabled={currentPage === 1}
            className="px-3 py-1 border rounded disabled:opacity-50"
          >
            First
          </button>
          <button
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            disabled={currentPage === 1}
            className="px-3 py-1 border rounded disabled:opacity-50"
          >
            Prev
          </button>
          <span className="px-3 py-1 border rounded">
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
            className="px-3 py-1 border rounded disabled:opacity-50"
          >
            Next
          </button>
          <button
            onClick={() => setCurrentPage(totalPages)}
            disabled={currentPage === totalPages}
            className="px-3 py-1 border rounded disabled:opacity-50"
          >
            Last
          </button>
        </div>
      )}
    </div>
  );
};

export default MyAddedPets;
