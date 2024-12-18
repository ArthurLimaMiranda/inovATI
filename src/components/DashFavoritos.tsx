//Dashboard para a vizualização de editais favoritados e criação de pré-projeto
"use client";
import { Solucao, Noticias, Prolema, Edital, Ranking, Empresa, User, Equipe, Logado } from "../../typings";
import React, { useContext, useEffect, useState } from "react";
import {
  FaChevronDown,
  FaChevronUp,
  FaFileDownload,
  FaFileUpload,
  FaRegStar,
  FaRegTrashAlt,
  FaSearch,
  FaStar,
} from "react-icons/fa";
import { useRouter } from "next/navigation";
import Image from "next/image";
import ati from "../../public/images/ati.png";
import inova from "../../public/images/inova.png";
import { urlBase } from "@/lib/api";
import { useAppContext } from "@/app/contexts/InfoContext";

export function DashProblemas() {
  const { problemas } = useAppContext();
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [filterInova, setFilterInova] = useState<boolean | null>(null);
  const [filterStatus, setFilterStatus] = useState<boolean | null>(null);
  const [filteredProblemas, setFilteredProblemas] = useState<Prolema[]>(problemas);
  
  const [isSelected, setIsSelected] = useState(false);
  const [selectedProblema, setSelectedProblema] = useState<Prolema | null>(null);
  const [isProblemasVisible, setIsProblemasVisible] = useState(false);


  useEffect(() => {
    let filtered = problemas;

    // Filtra pelo título
    if (searchTerm.trim()) {
      filtered = filtered.filter((problema) =>
        problema.titulo.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filtra por "Inova"
    if (filterInova !== null) {
      filtered = filtered.filter((problema) => problema.inova === filterInova);
    }

    // Filtra por "Status"
    if (filterStatus !== null) {
      filtered = filtered.filter((problema) => problema.status === filterStatus);
    }

    setFilteredProblemas(filtered);
  }, [searchTerm, filterInova, filterStatus, problemas]);

  function showEditais(card: Prolema) { //Expõe editais
    const selectedProblema = problemas.find((problema) => problema.id === card.id);

    if (selectedProblema) {
      setSelectedProblema(selectedProblema);
      setIsProblemasVisible(true);
    } else {
      setSelectedProblema(null);
      setIsProblemasVisible(false);
    }
  }

  const [isCardsVisible, setIsCardsVisible] = useState(false);

  const toggleCardsVisibility = () => {
    setIsCardsVisible(!isCardsVisible);
  };

  return (
    <div className="relative ">
      <div className={`bg-[#C5E2E6]`}>
        <section className="relative flex flex-col items-center min-h-[400px]">
          <div className="w-full h-[65vh] bg-gradient-to-r from-[#37B7C3] to-[#088395]" />
          <div className="absolute bottom-0 left-0 w-[100%] overflow-hidden">
            <svg
              data-name="Layer 1"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 1200 120"
              preserveAspectRatio="none"
              style={{ transform: "scaleY(-1)" }}
            >
              <path
                d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"
                className="relative block h-[600px] fill-white"
              ></path>
            </svg>
          </div>
        </section>

        <div className="absolute top-28 w-full justify-between flex flex-col lg:flex-row">
          <div className="bg-[#C5E2E6] w-full lg:w-[28vw] mb-12 lg:ml-16 lg:h-[80vh] rounded-xl shadow-lg lg:shadow-2xl flex flex-col items-center">
            <div className="items-center flex justify-center my-5">
              <FaRegStar
                className="mr-2 items-center flex text-[#088395]"
                size={20}
              />
              <h2 className="font-bold text-xl text-[#088395] font-sans">
                Lista de Problemas
              </h2>
              <div className="border-t-2 border-gray-50"></div>
            </div>

            <div className=" w-full h-full">
              <div className="flex flex-col items-center justify-start w-full mt-6 mb-2">
                <div className="flex items-center bg-white w-80 rounded-2xl pl-2 pr-2 py-2 mb-6">
                  <input
                    type="text"
                    placeholder="Pesquisar pelo título..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="text-gray-400 text-lg pr-2 focus:ring-0 focus:border-1 focus:outline-none appearance-none leading-tight focus:border-white placeholder:text-generic-fields w-full border-none outline-none rounded-xl py-1 px-2"
                  />
                  
                </div>

                <div>
                <div className="flex items-center gap-2">
                    <label className="font-semibold">Inova:</label>
                    <select
                      value={filterInova === null ? "" : filterInova ? "true" : "false"}
                      onChange={(e) =>
                        setFilterInova(
                          e.target.value === "true"
                            ? true
                            : e.target.value === "false"
                            ? false
                            : null
                        )
                      }
                      className="border border-gray-300 rounded px-4 py-2"
                    >
                      <option value="">Todos</option>
                      <option value="true">Sim</option>
                      <option value="false">Não</option>
                    </select>
                  </div>

                  {/* Filtro: Status */}
                  <div className="flex items-center gap-2">
                    <label className="font-semibold">Status:</label>
                    <select
                      value={filterStatus === null ? "" : filterStatus ? "true" : "false"}
                      onChange={(e) =>
                        setFilterStatus(
                          e.target.value === "true"
                            ? true
                            : e.target.value === "false"
                            ? false
                            : null
                        )
                      }
                      className="border border-gray-300 rounded px-4 py-2"
                    >
                      <option value="">Todos</option>
                      <option value="true">Ativo</option>
                      <option value="false">Inativo</option>
                    </select>
                  </div>
                </div>

                <div
                  className={`flex flex-col w-full px-5 overflow-y-scroll h-[55vh] pt-5 ${!isCardsVisible && "hidden"} lg:block`}
                  style={{ scrollbarWidth: "thin" }}
                >
                  {filteredProblemas.map((card, index) => (
                    <div
                      key={index}
                      className={`bg-white rounded-xl p-3 mb-4 shadow-md w-[100%] hover:opacity-60 flex flex-col justify-between ${card.id === selectedProblema?.id && "cursor-pointer"} ${isSelected ? (card.id === selectedProblema?.id ? "border bgb" : "opacity-30") : ""}`}
                      onClick={() => {
                        showEditais(card);
                        setIsSelected(true);
                      }}
                    >
                      <div className="flex items-start justify-between mb-4">
                        <h2 className="text-xl font-bold">{card.titulo}</h2>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {isProblemasVisible && selectedProblema && (
            <div
              className="bg-[#F5F5F5] lg:w-[60vw] lg:mr-16 mb-12 h-[80vh] rounded-xl shadow-lg lg:shadow-2xl flex flex-col overflow-y-scroll"
              style={{ maxHeight: "80vh", scrollbarWidth: "thin" }}
            >
              <div className="flex items-center justify-center mt-8 border-b py-5">
                {selectedProblema.inova === true ? (
                  <Image
                    src={inova}
                    alt="Inova"
                    width={300}
                    height={200}
                  />
                ) : (
                  <Image
                    src={ati}
                    alt="ATI"
                    width={300}
                    height={200}
                  />
                )}
              </div>
              <div className="flex text-center items-center justify-center w-full mt-6">
                <p className="font-bold text-lg text-center">
                  {selectedProblema.titulo}
                </p>
              </div>

              <div className="mx-4 mt-6">
                <div className="flex flex-col gap-y-6">
                  <div className="flex items-center gap-x-2 text-center">
                    <p className="font-semibold">Órgão de Fomento:</p>
                    <p>
                      {selectedProblema.inova === true ? "FACEPE" : "FINEP"}
                    </p>
                  </div>
                  <div className="flex items-center gap-x-2 text-center">
                    <p className="font-semibold">Área:</p>
                    <p>{selectedProblema.area}</p>
                  </div>
                  <div className="flex items-center gap-x-2 text-center">
                    <p className="font-semibold">Categoria:</p>
                    <p>{selectedProblema.categoria}</p>
                  </div>
                  <div className="flex items-center gap-x-2 text-center">
                    <p className="font-semibold">Público-alvo:</p>
                    <p>{selectedProblema.publicAlvo}</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
