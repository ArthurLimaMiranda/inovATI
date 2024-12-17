//Modal para a criação de um novo edital, visível apenas para usuários administradores
"use client";
import { criarEdital, criarPreProjeto, uploadFile, urlBase } from "@/lib/api";
import React, { useEffect, useState } from "react";
import { FaFileUpload } from "react-icons/fa";
import { IoIosArrowRoundBack } from "react-icons/io";

type User = {
  id: number;
  login: string;
  nome: string;
  idPerfil: number;
  senha: string;
};

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  files: File[];
  setFiles: React.Dispatch<React.SetStateAction<File[]>>;
  descricao: string;
  setDescricao: React.Dispatch<React.SetStateAction<string>>;
}

export function NovaDocumentacao(props: ModalProps) {

  useEffect(() => {
    //Bloqueia o scroll pela página quando o modal está aberto
    if (props.isOpen) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }
    return () => {
      document.body.classList.remove("overflow-hidden");
    };
  }, [props.isOpen]);
  
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(e.target.files || []);
    props.setFiles((prev) => [...prev, ...selectedFiles]);
  };

  const removeFile = (fileToRemove: File) => {
    props.setFiles((prev) => prev.filter((file) => file !== fileToRemove));
  };

  const submitEdital = () => {
    if (props.files.length > 0) {
      console.log("Arquivos prontos para envio:", props.files);
    }
    props.onClose()

  };
  
  if (!props.isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-transparent p-6 rounded-lg shadow-lg w-full max-w-4xl mx-4 max-h-screen overflow-y-auto">
        <div className="bg-[#F0F0F0] h-auto w-full rounded-lg shadow-lg p-6">
          <div className="mb-4">
            <button
              onClick={() => {
                props.onClose();
              }}
              className="flex items-center gap-1 hover:underline hover:text-[#088395] text-lg"
            >
              <IoIosArrowRoundBack size={22} /> Voltar
            </button>
          </div>
          <div className="flex justify-center mb-10">
            <h2 className="font-semibold text-3xl text-[#088395]">
              Cadastrar Documentos
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
          <div className="flex flex-col">
            <label
              className="block text-[#3C3C3C] text-md font-bold mb-2"
              htmlFor="Descricao"
            >
              Descricao
            </label>
            <textarea
              className="shadow bg-white border-[#BEBEBE] appearance-none border rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline h-28 resize-none"
              id="Descricao"
              value={props.descricao}
              onChange={(e) => {props.setDescricao(e.target.value)}}
              name="nome"
            ></textarea>
          </div>
            <div className="flex flex-col">
              {props.files.length > 0 && (
                <>
                <label
                  className="block text-[#3C3C3C] text-md font-bold mb-2"
                  htmlFor="categoria"
                >
                  Categoria
                </label>
                <div className="overflow-y-scroll  h-28 rounded-xl p-2 border-2">
                  <ul>
                    {props.files.map((file, index) => (
                      <li key={index}>
                        <span className="text-sm">{file.name}{" "}</span>
                        <button onClick={() => removeFile (file)} className="font-semibold text-red-500 hover:text-red-300">
                          | Remover
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
                </>
              )}
            </div>
          </div>
          <div className="flex justify-between mt-6">
            <div className="relative inline-block">
            <input
        type="file"
        id="file-upload"
        className="hidden"
        onChange={handleFileUpload }
        multiple
      />
      <label
        htmlFor="file-upload"
        className={`flex items-center px-3 py-2 rounded-md text-white font-semibold cursor-pointer ${
          props.files.length > 0 ? "bg-[#DC1D00]" : "bg-green-700"
        } hover:opacity-60 select-none whitespace-nowrap`}
      >
        {props.files.length > 0 ? <span>Escolher outro arquivo</span> : <span>Subir PDF</span>}
        <FaFileUpload className="ml-2" />
      </label>
            </div>
            <button
              type="button"
              onClick={submitEdital}
              className="flex items-center px-3 py-2 rounded-md text-white font-semibold cursor-pointer bg-[#088395] hover:opacity-60 select-none whitespace-nowrap"
            >
              Enviar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
