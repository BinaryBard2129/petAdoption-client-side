import React, { useState } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import axios from "axios";
import { motion } from "framer-motion";
import InfiniteScroll from "react-infinite-scroll-component";
import { Link } from "react-router";
import Skeleton from "react-loading-skeleton";
import 'react-loading-skeleton/dist/skeleton.css';

const LIMIT = 6;

const PetListing = () => {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");

  const fetchPets = async ({ pageParam = 1 }) => {
    const params = { page: pageParam, limit: LIMIT };
    if (search) params.search = search;
    if (category) params.category = category;

    const res = await axios.get("https://pet-adoption-server-steel.vercel.app/pets", { params });
    return { pets: res.data.pets, nextPage: pageParam + 1, hasMore: res.data.hasMore };
  };

  const {
    data,
    fetchNextPage,
    hasNextPage,
    refetch,
    isLoading,
    error,
  } = useInfiniteQuery({
    queryKey: ["pets", search, category],
    queryFn: fetchPets,
    getNextPageParam: (lastPage) => (lastPage.hasMore ? lastPage.nextPage : undefined),
  });

  const pets = data?.pages.flatMap(page => page.pets) || [];

  if (isLoading) {
    return (
      <section className="max-w-7xl mt-16 mx-auto px-4 py-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {[...Array(LIMIT)].map((_, i) => (
            <div key={i} className="bg-white rounded-xl shadow-md overflow-hidden animate-pulse">
              <Skeleton height={224} />
              <div className="p-4">
                <Skeleton height={30} width={`80%`} className="mb-2" />
                <Skeleton height={20} width={`60%`} className="mb-1" />
                <Skeleton height={20} width={`40%`} />
                <div className="mt-3">
                  <Skeleton height={40} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    );
  }

  if (error) return <p className="text-red-500 text-center">Error fetching pets.</p>;
  if (!isLoading && pets.length === 0)
    return <p className="text-center text-gray-600">No pets found 😿</p>;

  return (
    <section className="max-w-7xl mt-16 mx-auto px-4 py-10">
      {/* Search + Filter */}
      <div className="flex flex-col sm:flex-row gap-4 mb-10">
        <input
          type="text"
          placeholder="🔍 Search by name"
          value={search}
          onChange={(e) => { setSearch(e.target.value); refetch(); }}
          className="w-full sm:w-1/2 px-5 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-md transition"
        />
        <select
          value={category}
          onChange={(e) => { setCategory(e.target.value); refetch(); }}
          className="w-full sm:w-1/4 px-5 py-3 rounded-lg border border-gray-300 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-md transition"
        >
          <option value="">All Categories</option>
          <option value="Cat">Cat</option>
          <option value="Dog">Dog</option>
          <option value="Rabbit">Rabbit</option>
          <option value="Fish">Fish</option>
          <option value="Bird">Bird</option>
        </select>
      </div>

      {/* Infinite Scroll */}
      <InfiniteScroll
        dataLength={pets.length}
        next={fetchNextPage}
        hasMore={hasNextPage || false}
        loader={<p className="text-center py-4">Loading more pets...</p>}
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {pets.map((pet, index) => (
            <motion.div
              key={pet._id}
              className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition duration-300 flex flex-col h-full"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
            >
              <div className="relative group w-full aspect-[4/3] overflow-hidden">
                <img
                  src={pet.image}
                  alt={pet.name}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute top-2 right-2 bg-white/80 px-3 py-1 rounded-full text-sm text-gray-800 font-semibold">
                  {pet.category}
                </div>
              </div>
              <div className="p-4 flex-1 flex flex-col justify-between">
                <div>
                  <h2 className="text-2xl font-bold text-gray-800">{pet.name}</h2>
                  <p className="text-gray-600 mb-1">📍 {pet.location}</p>
                  <p className="text-gray-600 mb-3">🎂 Age: {pet.age}</p>
                </div>
                <Link to={`/petListing/${pet._id}`}>
                  <button className="mt-3 w-full bg-gradient-to-r from-blue-500 to-blue-700 text-white font-semibold py-2 rounded-lg shadow-lg hover:from-blue-600 hover:to-blue-800 hover:scale-105 transition-all duration-300 ease-in-out">
                    View Details
                  </button>
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </InfiniteScroll>
    </section>
  );
};

export default PetListing;
