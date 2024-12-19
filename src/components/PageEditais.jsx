"use client";

import React, { useState } from "react";
import SearchBar from "./SearchBar";
import EditalList from "./EditalList";

export  function Edital() {
  const [searchTerm, setSearchTerm] = useState("");
  const [editais, setEditais] = useState([
    {
      id: 1,
      name: "EDITAL INOVA CICLO 6",
      startDate: "MARÇO 22, 2025 ÀS 17:16",
      endDate: "MARÇO 30, 2025 ÀS 17:16",
    },
    {
      id: 2,
      name: "EDITAL INOVA CICLO 7",
      startDate: "AGOSTO 22, 2025 ÀS 17:19",
      endDate: "AGOSTO 30, 2025 ÀS 17:19",
    },
  ]);

  const filteredEditais = editais.filter((edital) =>
    edital.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-[#088395] text-white py-4 px-6">
        <h1 className="text-2xl font-bold">Editais Inova</h1>
      </header>

      {/* Main Content */}
      <main className="p-6">
        {/* Barra de Pesquisa */}
        <SearchBar onSearch={(term) => setSearchTerm(term)} />

        {/* Lista de Editais */}
        <EditalList editais={filteredEditais} />
      </main>
    </div>
  );
}
