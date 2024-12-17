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
  user: User;
  cardData: Card[];
  setCardData: (cards: Card[]) => void;
  filteredEditais: Card[];
  setFilteredEditais: (editais: Card[]) => void;
}

interface Card {
  id: number;
  nome: string;
  categoria: string;
  publicoAlvo: string;
  area: string;
  dataPublicacao: string;
  dataInicial: string;
  dataFinal: string;
  resultado: string;
  idOrgaoFomento: number;
  idUsuario: number;
  criadoPorBot: boolean;
  link: string;
}

export function NovoEdital(props: ModalProps) {
  const [file, setFile] = useState<File | undefined>();
  const [editaisData, setEditaisData] = useState({
    nome: "",
    categoria: "",
    publicoAlvo: "",
    area: "",
    datapublicacao: "",
    datainicial: "",
    datafinal: "",
    resultado: "",
    idOrgaoFomento: 1,
    criadoPorBot: false,
    idUsuario: props.user.id,
    horaPublicacao: "",
    horaInicial: "",
    horaFinal: "",
    link: "#",
  });

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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    //Atualiza as informações do edital com o preenchimento dos inputs
    const { name, value } = e.target;
    setEditaisData({
      ...editaisData,
      [name]: value,
    });
  };

  const formatDateTime = (date: string, time: string) => {
    //Converte as infos de data e horários dos inputs para se adequar ao backend
    const [year, month, day] = date.split("-");
    const [hour, minute] = time.split(":");
    return `${day}/${month}/${year} ${hour}:${minute}:00`;
  };

  async function subirPdf(e: React.FormEvent<HTMLInputElement>) {
    //Lida com o upload de pdf's de editais
    const target = e.target as HTMLInputElement & {
      files: FileList;
    };
    setFile(target.files[0]);
  }

  const cadastrarEdital = async () => {
    //Agrega todas as informações do edital
    const dataPublicacao = formatDateTime(
      editaisData.datapublicacao,
      editaisData.horaPublicacao || "00:00:00"
    );
    const dataInicial = formatDateTime(
      editaisData.datainicial,
      editaisData.horaInicial || "00:00:00"
    );
    const dataFinal = formatDateTime(
      editaisData.datafinal,
      editaisData.horaFinal || "00:00:00"
    );

    const editalData = {
      ...editaisData,
      dataPublicacao,
      dataInicial,
      dataFinal,
    };

    if (file) {
      try {
        //Cria um edital com as informaÇões
        const novoEdital: Card = await criarEdital(editalData);

        //Linka o pdf inserido ao edital criado
        const formData = new FormData();
        formData.append("edital_pdf", file);
        try {
          const uploadResponse = await uploadFile(
            "edital",
            novoEdital.id,
            formData
          );
          console.log("File uploaded successfully:", uploadResponse);
          novoEdital.link = `${urlBase}edital/${novoEdital.id}/pdf`;
        } catch (error) {
          console.error("Error uploading file:", error);
        }

        const updatedCardData = [...props.cardData, novoEdital];
        const updatedFilteredEditais = [...props.filteredEditais, novoEdital];

        props.setCardData(updatedCardData);
        props.setFilteredEditais(updatedFilteredEditais);

        setFile(undefined);
        props.onClose();
        console.log("Edital cadastrado com sucesso.");
      } catch (error) {
        console.error("Erro ao criar edital", error);
      }
    } else {
      alert("Insira algum arquivo para criar o edital");
    }
  };

  if (!props.isOpen) return null;

  return props.isOpen ? (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-transparent p-6 rounded-lg shadow-lg w-full max-w-4xl mx-4 max-h-screen overflow-y-auto">
        <div className="bg-[#F0F0F0] h-auto w-full rounded-lg shadow-lg p-6">
          <div className="mb-4">
            <button
              onClick={() => {
                setFile(undefined);
                props.onClose();
              }}
              className="flex items-center gap-1 hover:underline hover:text-[#088395] text-lg"
            >
              <IoIosArrowRoundBack size={22} /> Voltar
            </button>
          </div>
          <div className="flex justify-center mb-10">
            <h2 className="font-semibold text-3xl text-[#088395]">
              Cadastrar Novo Edital
            </h2>
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
                onChange={handleInputChange}
                name="nome"
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
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
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
                name="publicoAlvo"
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
            <div className="flex flex-col">
              <label
                className="block text-[#3C3C3C] text-md font-bold mb-2"
                htmlFor="idOrgao"
              >
                ID Orgão de Fomento
              </label>
              <input
                className="shadow bg-white border-[#BEBEBE] appearance-none border rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="idOrgao"
                type="text"
                onChange={handleInputChange}
                name="idOrgaoFomento"
              />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
            <div className="flex flex-col">
              <label
                className="block text-[#3C3C3C] text-md font-bold mb-2"
                htmlFor="datapublicacao"
              >
                Data e Hora de Publicação
              </label>
              <input
                className="shadow bg-white border-[#BEBEBE] appearance-none border rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="datapublicacao"
                type="date"
                onChange={handleInputChange}
                name="datapublicacao"
              />
              <input
                className="shadow bg-white border-[#BEBEBE] appearance-none border rounded w-full py-2 px-4 mt-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="horapublicacao"
                type="time"
                onChange={handleInputChange}
                name="horaPublicacao"
              />
            </div>
            <div className="flex flex-col">
              <label
                className="block text-[#3C3C3C] text-md font-bold mb-2"
                htmlFor="datainicial"
              >
                Data e Hora Inicial
              </label>
              <input
                className="shadow bg-white border-[#BEBEBE] appearance-none border rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="datainicial"
                type="date"
                onChange={handleInputChange}
                name="datainicial"
              />
              <input
                className="shadow bg-white border-[#BEBEBE] appearance-none border rounded w-full py-2 px-4 mt-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="horainicial"
                type="time"
                onChange={handleInputChange}
                name="horaInicial"
              />
            </div>
            <div className="flex flex-col">
              <label
                className="block text-[#3C3C3C] text-md font-bold mb-2"
                htmlFor="datafinal"
              >
                Data Final
              </label>
              <input
                className="shadow bg-white border-[#BEBEBE] appearance-none border rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="datafinal"
                type="date"
                onChange={handleInputChange}
                name="datafinal"
              />
              <input
                className="shadow bg-white border-[#BEBEBE] appearance-none border rounded w-full py-2 px-4 mt-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="horafinal"
                type="time"
                onChange={handleInputChange}
                name="horaFinal"
              />
            </div>
          </div>
          <div className="flex flex-col mt-6">
            <label
              className="block text-[#3C3C3C] text-md font-bold mb-2"
              htmlFor="resultado"
            >
              Resultado
            </label>
            <input
              className="shadow bg-white border-[#BEBEBE] appearance-none border rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="resultado"
              type="date"
              onChange={handleInputChange}
              name="resultado"
            />
          </div>
          <div className="flex justify-between mt-6">
            <div className="relative inline-block">
              <input
                type="file"
                id="file-upload"
                className="hidden"
                onChange={subirPdf}
              />
              <label
                htmlFor="file-upload"
                className={`flex items-center px-3 py-2 rounded-md text-white font-semibold cursor-pointer ${
                  !file ? "bg-green-700" : "bg-[#DC1D00]"
                } hover:opacity-60 select-none whitespace-nowrap`}
              >
                {file ? (
                  <span>Escolher outro arquivo</span>
                ) : (
                  <span>Subir PDF</span>
                )}
                <FaFileUpload className="ml-2" />
              </label>
            </div>
            <button
              onClick={cadastrarEdital}
              className="flex items-center px-3 py-2 rounded-md text-white font-semibold cursor-pointer bg-[#088395] hover:opacity-60 select-none whitespace-nowrap"
            >
              Enviar
            </button>
          </div>
        </div>
      </div>
    </div>
  ) : null;
}
