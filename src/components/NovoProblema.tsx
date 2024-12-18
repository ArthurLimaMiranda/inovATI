//Modal para a criação de um novo edital, visível apenas para usuários administradores
"use client";
import { Prolema } from "../../typings";
import { useAppContext } from "@/app/contexts/InfoContext";
import React, { useEffect, useState } from "react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function NovoProblema(props: ModalProps) {
  const { problemas, setProlema, logado } = useAppContext();

  const newId = problemas.length > 0 
    ? problemas.reduce((maxId, prob) => Math.max(maxId, prob.id), 0) + 1 
    : 1;

  const [problemaData, setProblemaData] = useState({
    id: newId,
    titulo: "",
    descricao: "",
    inova: false,
    proponenteID: logado.id,
    status: false,
    categoria: "",
    publicAlvo: "",
    area: "",
  });

  const isFormValid = () => {
    return (
      problemaData.titulo.trim() !== "" &&
      problemaData.categoria.trim() !== "" &&
      problemaData.publicAlvo.trim() !== "" &&
      problemaData.area.trim() !== "" &&
      problemaData.descricao.trim() !== ""
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
    setProblemaData({
      ...problemaData,
      [name]: value,
    });
  };
  

  const toggleInova = () => {
    setProblemaData((prevData) => ({
      ...prevData,
      inova: !prevData.inova,
    }));
  };

  const cadastrarProblema = () => {
    if (!isFormValid()) {
      alert("Por favor, preencha todos os campos antes de enviar.");
      return;
    }
    const updatedProblemas = [...problemas, problemaData];
    setProlema(updatedProblemas);
    localStorage.setItem("problemas", JSON.stringify(updatedProblemas));
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
              Submeter Novo Problema
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
                htmlFor="categoria"
              >
                Categoria
              </label>
              <input
                className="shadow bg-white border-[#BEBEBE] appearance-none border rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="categoria"
                type="text"
                onChange={handleInputChange}
                name="categoria"
              />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6 items-center justify-center">
            <div className="flex flex-col">
              <label
                className="block text-[#3C3C3C] text-md font-bold mb-2"
                htmlFor="publicoalvo"
              >
                Público Alvo
              </label>
              <input
                className="shadow bg-white border-[#BEBEBE] appearance-none border rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="publicoalvo"
                type="text"
                onChange={handleInputChange}
                name="publicAlvo"
              />
            </div>
            <div className="flex flex-col">
              <label
                className="block text-[#3C3C3C] text-md font-bold mb-2"
                htmlFor="area"
              >
                Área
              </label>
              <input
                className="shadow bg-white border-[#BEBEBE] appearance-none border rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="area"
                type="text"
                onChange={handleInputChange}
                name="area"
              />
            </div>
            
            <div className="flex flex-col justify-end">
              <label
                className="block text-[#3C3C3C] text-md font-bold mb-2"
              >
                Tipo de Inovação
              </label>
              <button
                onClick={toggleInova}
                className={`px-3 py-2 rounded-md text-white font-semibold cursor-pointer ${
                  problemaData.inova ? "bg-[#088395]" : "bg-red-400"
                } hover:opacity-60`}
              >
                {problemaData.inova ? "Inova" : "ATI"}
              </button>
            </div>

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
              onClick={cadastrarProblema}
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

