//CRUD e pesquisa de editais
"use client";
import React, { useEffect, useState } from "react";
import { CardsGrid, CardsRow } from "./Cards";
import { HeaderOut } from "./Header";
import { IoGrid } from "react-icons/io5";
import { MdCreateNewFolder, MdTableRows } from "react-icons/md";
import { FaSearch } from "react-icons/fa";
import { useAppContext } from "@/app/contexts/InfoContext";
import { NovoProblema } from "./NovoProblema";


interface Card {
  id: number;
  titulo: string;
  descricao: string;
  proponenteID: number | null; // Altere para permitir null
  categoria: string;
  publicAlvo: string;
  area: string;
  inova: boolean;
  status: boolean;
  aprovado:boolean
}

export function Search() {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [filteredCards, setFilteredCards] = useState<Card[]>([]);

  const [vizualizacao, setVizualizacao] = useState("grid")

  const {
      usuarios,
      problemas,
      logado,
      equipes
    } = useAppContext()

  const foundUser = usuarios.find((u) => u.id === logado.id);

  const getFilteredProblems = () => {
    if (!problemas) return [];
  
    return problemas.filter((problema) => {
      if (problema.inova) {
        return true; // Todos usuários podem ver problemas da Inova
      }
      if (
        !problema.inova &&
        (
          (foundUser?.tipo === "professor") ||
          (foundUser?.tipo === "admGeral") ||
          (foundUser?.tipo === "admATI")
        )
      ) {
        return true; // Professores, admGeral e admATI podem ver problemas da ATI
      }
  
      // Verifica se o e-mail do usuário está em uma equipe cuja inova seja false
      const userInNonInovaTeam = equipes.some((equipe) =>
        equipe.inova === false &&
        equipe.participantesEmail.includes(foundUser?.email || "")
      );
  
      if (!problema.inova && userInNonInovaTeam) {
        return true; // Usuário em uma equipe não Inova pode ver problemas da ATI
      }
  
      return false;
    });
  };
  
  useEffect(() => {
    const filtered = getFilteredProblems().filter((problema) =>
      problema.titulo.toLowerCase().includes(searchTerm.toLowerCase().trim())
    );
    setFilteredCards(filtered);
  }, [searchTerm, problemas, foundUser]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      // Atualiza a pesquisa ao pressionar Enter
      const filtered = getFilteredProblems().filter((problema) =>
        problema.titulo.toLowerCase().includes(searchTerm.toLowerCase().trim())
      );
      setFilteredCards(filtered);
    }
  };

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  return (
    <>
      <div className="relative">
        <div className="min-h-screen">
          <HeaderOut fix={true} />
          <section className="relative flex flex-col items-center min-h-[400px]">
            <div className="w-full h-[70vh] bg-[#088395]" />
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

          <div className="absolute top-[14.58vh] w-[100vw]"> {/*Início da Página*/}
            <div className="flex flex-col justify-center">
              <p className="text-white text-5xl font-semibold px-8 lg:px-96 pb-8 text-center">
                Pesquisar
              </p>
              <p className="text-white font-[400] text-2xl pb-10 px-8 lg:px-96 text-center">
                Descubra problemas relevantes para você
              </p>
            </div>
            {/* -------------- BARRA DE PESQUISA -------------- */}
            <div className="flex flex-col w-full">
              <div className="flex items-center justify-between mb-8 px-4 lg:px-40">
                <div className="flex items-center bg-white w-full rounded-2xl pl-3 pr-2 py-2">
                  <input
                    type="text"
                    placeholder="Buscar editais..."
                    className="text-gray-400 text-lg pr-2 focus:ring-0 focus:border-1 focus:outline-none appearance-none leading-tight focus:border-white placeholder:text-generic-fields w-full border-none outline-none rounded-xl py-[1em]"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    onKeyDown={handleKeyDown}
                  />
                  <div
                    className="flex items-center justify-center bg-[#37B7C3] rounded-2xl px-5 py-5"
                  >
                    <FaSearch className="text-white" />
                  </div>
                </div>
              </div>

              {/* -------------- DASHBOARD -------------- */}
              <div className="flex flex-col mx-4 lg:mx-40 rounded-3xl bg-white border-2 border-[#088395] mb-16">
                <div className="border-b grid grid-cols-3 gap-2 w-full items-center px-4 lg:px-14 py-4">
                  <p className="text-lg lg:text-xl">
                    Total de {filteredCards.length} problemas disponíveis
                  </p>
                  <div />
                  <div className="flex flex-row items-center gap-x-5 justify-end">
                    <div className="bg-[#37B7C3] text-white hidden lg:flex items-center justify-around p-2 rounded-full lg:w-48 lg:h-14">
                      <button
                        onClick={() => setVizualizacao("grid")}
                        className={`p-2 lg:p-3 hover:opacity-60 ${vizualizacao == "grid" && "opacity-60"}`}
                      >
                        <IoGrid size={20} />
                      </button>
                      <div className="border-l h-6 mx-2 border-white"></div>
                      <button
                        onClick={() => setVizualizacao("row")}
                        className={`p-2 lg:p-3 hover:opacity-60 ${vizualizacao == "row" && "opacity-60"}`}
                      >
                        <MdTableRows size={24} />
                      </button>
                    </div>

                    {logado.isLogado && ((foundUser?.tipo==='representante')||(foundUser?.tipo==='admGeral')) && ( //Botão criar edital exclusivo para adms
                      <>
                        <button
                          onClick={handleOpenModal}
                          className="bg-[#37B7C3] text-white flex items-center justify-around py-2 h-14 w-14 rounded-full hover:opacity-60"
                        >
                          {" "}
                          <MdCreateNewFolder size={30} />
                        </button>
                        <NovoProblema
                          isOpen={isModalOpen}
                          onClose={handleCloseModal}
                        />
                      </>
                    )}
                  </div>
                </div>
                <div
                  className={`${
                    vizualizacao === "grid"
                      ? "grid grid-cols-1 sm:grid-cols-2"
                      : "flex flex-col"
                  } m-10 gap-x-20 gap-y-10 max-h-[80vh] overflow-scroll`}
                >
                  {filteredCards.map((card, index) => //Seta o modo de visualização grid/row
                    vizualizacao === "grid" ? (
                      <CardsGrid
                        logged={logado.isLogado}
                        key={index}
                        id={card.id}
                        area={card.area}
                        categoria={card.categoria}
                        descricao={card.descricao}
                        inova={card.inova}
                        proponenteID={card.proponenteID}
                        publicAlvo={card.publicAlvo}
                        titulo={card.titulo}
                        filteredCards={filteredCards}
                        setFilteredCards={setFilteredCards}
                      />
                    ) : vizualizacao === "row" ? (
                      <CardsRow
                        logged={logado.isLogado}
                        key={index}
                        id={card.id}
                        area={card.area}
                        categoria={card.categoria}
                        descricao={card.descricao}
                        inova={card.inova}
                        proponenteID={card.proponenteID}
                        publicAlvo={card.publicAlvo}
                        titulo={card.titulo}
                        filteredCards={filteredCards}
                        setFilteredCards={setFilteredCards}
                      />
                    ) : null
                  )}
                </div>
              </div>
              <div className="mt-32 w-full h-[8vh] bg-[#088395]" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
