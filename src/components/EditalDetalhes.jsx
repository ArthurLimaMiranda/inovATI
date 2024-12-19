import React from "react";

export default function EditalDetails({ params }) {
  const { id } = params; // Pega o ID da URL

  // Aqui você pode buscar os detalhes do edital usando o ID
  // Exemplo:
  // const edital = fetchEditalById(id);

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Mais informações em breve...</h2>
      <h2 className = "text-exl font-bold mb-4">No momento não tenho mais nada a informar</h2>
      <p>ID do Edital: {id}</p>
      {/* Renderize as informações do edital aqui */}
    </div>
  );
}
