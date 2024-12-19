"use client";

import React, { useState } from "react";

export default function SearchBar({ onSearch }) {
  const [inputValue, setInputValue] = useState("");

  const handleSearch = () => {
    onSearch(inputValue);
  };

  return (
    <div className="flex gap-2 mb-4">
      <input
        type="text"
        placeholder="Nome da Edital"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        className="flex-1 px-3 py-2 border rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-400"
      />
      <button
        onClick={() => setInputValue("")}
        className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 transition duration-200"
      >
        Limpar
      </button>
      <button
        onClick={handleSearch}
        className="px-4 py-2 bg-[#088395] text-white rounded hover:bg-teal-600 transition duration-200"
      >
        Pesquisar
      </button>
    </div>
  );
}
