//Modal para a criação de um novo edital, visível apenas para usuários administradores
"use client";
import { useAppContext } from "@/app/contexts/InfoContext";
import React, { useEffect, useState } from "react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  problemaID: number; // Certifique-se de que esta propriedade está incluída
}

export function NovaSolucao(props: ModalProps) {
  const { problemas, setProlema, logado, solucoes, setSolucao, equipes } = useAppContext();

  const foundProblema = problemas.find((u) => u.id === props.problemaID);

  const newId = solucoes.length > 0 
    ? solucoes.reduce((maxId, solc) => Math.max(maxId, solc.id), 0) + 1 
    : 1;

  const [solucaoData, setSolucaoData] = useState({
    id: newId,
    titulo: '',
    descricao: '',
    equipeNome: '',
    pitchLink: '',
    inova: false,
    status: false,
    aprovado: false
  });


  useEffect(() => {
    if (foundProblema) {
    setSolucaoData({
    id: newId,
    titulo: '',
    descricao: '',
    equipeNome: '',
    pitchLink: '',
    inova: foundProblema.inova,
    status: false,
    aprovado: false
      });
    }
  }, [foundProblema]);

  const isFormValid = () => {
    return (
      solucaoData.titulo.trim() !== "" &&
      solucaoData.descricao.trim() !== "" &&
      solucaoData.equipeNome.trim() !== "" 
    );
  };
  
  useEffect(() => {
    if (props.isOpen) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }
    return () => {
      document.body.classList.remove("overflow-hidden");
    };
  }, [props.isOpen]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setSolucaoData({
      ...solucaoData,
      [name]: value,
    });
  };

  const cadastrarSolucao = () => {
    if (!isFormValid()) {
      alert("Por favor, preencha todos os campos antes de enviar.");
      return;
    }
  
    // Verifica se a equipe existe e se o atributo `inova` da equipe coincide com o do problema
    const equipeEncontrada = equipes.find(
      (equipe) =>
        equipe.nome === solucaoData.equipeNome &&
        equipe.inova === foundProblema?.inova
    );
  
    if (!equipeEncontrada) {
      alert(
        "A equipe informada não existe ou é da modalidade errada. Verifique e tente novamente."
      );
      return;
    }
  
    // Adiciona a nova solução à lista de soluções
    const updatedSolucoes = [...solucoes, solucaoData];
    setSolucao(updatedSolucoes);
    localStorage.setItem("solucoes", JSON.stringify(updatedSolucoes));
    props.onClose(); // Fecha o modal após cadastrar
  };
  
  

  if (!props.isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-transparent p-6 rounded-lg shadow-lg w-full max-w-4xl mx-4 max-h-screen overflow-y-auto">
        <div className="bg-[#F0F0F0] h-auto w-full rounded-lg shadow-lg p-6">
          <div className="flex flex-row justify-between mb-10">
            <button className="text-sm hover:underline" onClick={props.onClose}>
              {"<- Voltar"}
            </button>
            <h2 className="font-semibold text-3xl text-[#088395]">
              Submeter Nova Solução
            </h2>
            <div></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex flex-col">
              <label
                className="block text-[#3C3C3C] text-md font-bold mb-2"
                htmlFor="titulo"
              >
                Título
              </label>
              <input
                className="shadow bg-white border-[#BEBEBE] appearance-none border rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="titulo"
                type="text"
                required
                onChange={handleInputChange}
                name="titulo"
              />
            </div>
            <div className="flex flex-col">
              <label
                className="block text-[#3C3C3C] text-md font-bold mb-2"
                htmlFor="equipeNome"
              >
                Nome da Equipe
              </label>
              <input
                className="shadow bg-white border-[#BEBEBE] appearance-none border rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="equipeNome"
                type="text"
                onChange={handleInputChange}
                name="equipeNome"
              />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6 items-center justify-center">
           {foundProblema?.inova&& <div className="flex flex-col">
              <label
                className="block text-[#3C3C3C] text-md font-bold mb-2"
                htmlFor="pitchLink"
              >
                Link do Pitch
              </label>
              <input
                className="shadow bg-white border-[#BEBEBE] appearance-none border rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="pitchLink"
                type="text"
                onChange={handleInputChange}
                name="pitchLink"
              />
            </div>}
            <div></div>
            <div></div>

            <div className="flex flex-col justify-end">
              <label
                className="block text-[#3C3C3C] text-md font-bold mb-2"
                htmlFor="Descricao"
              >
                Descricao
              </label>
              <textarea
                className="shadow bg-white border-[#BEBEBE] appearance-none border rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline h-28 resize-none"
                id="descricao"
                onChange={handleInputChange}
                name="descricao"
              ></textarea>
            </div>

            <div></div>

            <div className="mt-6 flex justify-end">
            <button
              onClick={cadastrarSolucao}
              className={`px-4 py-2 rounded-md text-white font-semibold cursor-pointer ${
                isFormValid() ? "bg-[#088395]" : "bg-gray-400 cursor-not-allowed"
              } hover:opacity-60 h-10`}
              disabled={!isFormValid()}
            >
              Enviar
            </button>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

