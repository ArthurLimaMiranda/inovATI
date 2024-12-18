"use client";

import React from "react";

export default function EditalList({ editais }) {
  return (
    <table className="w-full bg-white border rounded shadow-sm">
      <thead className="bg-gray-200 text-gray-700">
        <tr>
          <th className="py-2 px-4 text-left">Nome do Edital</th>
          <th className="py-2 px-4 text-left">Data de Início</th>
          <th className="py-2 px-4 text-left">Data de Término</th>
          <th className="py-2 px-4 text-left">Informação</th>
        </tr>
      </thead>
      <tbody>
        {editais.map((edital) => (
          <tr
            key={edital.id}
            className="border-t hover:bg-gray-100 transition duration-200"
          >
            <td className="py-2 px-4">{edital.name}</td>
            <td className="py-2 px-4">{edital.startDate}</td>
            <td className="py-2 px-4">{edital.endDate}</td>
            <td className="py-2 px-4">
              <button className="text-blue-500 hover:underline">
                🔗 Ver mais
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
