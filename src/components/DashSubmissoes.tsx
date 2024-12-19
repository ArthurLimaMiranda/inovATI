//Dashboard para a vizualização de editais favoritados e criação de pré-projeto
"use client";
import { Prolema, Solucao} from "../../typings";
import React, { useEffect, useState } from "react";
import { FaRegStar } from "react-icons/fa";
import Image from "next/image";
import ati from "../../public/images/ati.png";
import inova from "../../public/images/inova.png";
import { Switch } from "@headlessui/react";
import { useAppContext } from "@/app/contexts/InfoContext";

export function DashSubmissoes() {
  const { problemas, solucoes, setProlema, setSolucao, usuarios, equipes } = useAppContext();
  const [searchTerm, setSearchTerm] = useState<string>("");
  
  // Estados para Problemas
  const [filterInovaProb, setFilterInovaProb] = useState<boolean | null>(null);
  const [filterStatusProb, setFilterStatusProb] = useState<boolean | null>(null);
  const [filterAvaliacaoProb, setFilterAvaliacaoProb] = useState<boolean | null>(null);
  const [filteredProblemas, setFilteredProblemas] = useState<Prolema[]>(problemas);

  // Estados para Soluções
  const [filterInovaSol, setFilterInovaSol] = useState<boolean | null>(null);
  const [filterStatusSol, setFilterStatusSol] = useState<boolean | null>(null);
  const [filterAvaliacaoSol, setFilterAvaliacaoSol] = useState<boolean | null>(null);
  const [filteredSolucoes, setFilteredSolucoes] = useState<Solucao[]>(solucoes);

  const [isSelected, setIsSelected] = useState(false);
  const [selectedProblema, setSelectedProblema] = useState<Prolema | null>(null);
  const [selectedSolucao, setSelectedSolucao] = useState<Solucao | null>(null);

  const [isProblemasVisible, setIsProblemasVisible] = useState(false);
  const [isSolucoesVisible, setIsSolucoesVisible] = useState(false);

  const [isProb, setIsProb] = useState(true);

  useEffect(() => {
    let filtered = problemas;

    if (searchTerm.trim()) {
      filtered = filtered.filter((problema) =>
        problema.titulo.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (filterInovaProb !== null) {
      filtered = filtered.filter((problema) => problema.inova === filterInovaProb);
    }

    if (filterStatusProb !== null) {
      filtered = filtered.filter((problema) => problema.status === filterStatusProb);
    }

    if (filterAvaliacaoProb !== null) {
      filtered = filtered.filter((problema) => problema.aprovado === filterAvaliacaoProb);
    }

    setFilteredProblemas(filtered);
  }, [searchTerm, filterInovaProb, filterStatusProb, filterAvaliacaoProb, problemas]);

  // Filtragem para soluções
  useEffect(() => {
    let filtered = solucoes;

    if (searchTerm.trim()) {
      filtered = filtered.filter((solucao) =>
        solucao.titulo.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (filterInovaSol !== null) {
      filtered = filtered.filter((solucao) => solucao.inova === filterInovaSol);
    }

    if (filterStatusSol !== null) {
      filtered = filtered.filter((solucao) => solucao.status === filterStatusSol);
    }

    if (filterAvaliacaoSol !== null) {
      filtered = filtered.filter((solucao) => solucao.aprovado === filterAvaliacaoSol);
    }

    setFilteredSolucoes(filtered);
  }, [searchTerm, filterInovaSol, filterStatusSol, filterAvaliacaoSol, solucoes]);


  function showEditais(card: Prolema | Solucao) {
    if (isProb) {
      const selected = problemas.find((problema) => problema.id === card.id);
      setSelectedProblema(selected || null);
      setIsProblemasVisible(!!selected);
    } else {
      const selected = solucoes.find((solucao) => solucao.id === card.id);
      setSelectedSolucao(selected || null);
      setIsSolucoesVisible(!!selected);
    }
  }


  const [isCardsVisible, setIsCardsVisible] = useState(false);

  const atualizarProblemas = (problemaAtualizado: Prolema) => {
    const novosProblemas = problemas.map((problema) =>
      problema.id === problemaAtualizado.id ? problemaAtualizado : problema
    );
    setProlema(novosProblemas);
    localStorage.setItem("problemas", JSON.stringify(novosProblemas));
  };

  const atualizarSolucoes = (solucaoAtualizado: Solucao) => {
    const novosSolucoes = solucoes.map((solucao) =>
      solucao.id === solucaoAtualizado.id ? solucaoAtualizado : solucao
    );
    setSolucao(novosSolucoes);
    localStorage.setItem("solucoes", JSON.stringify(novosSolucoes));
  };

  const toggleStatus = (card: Prolema|Solucao) => {
    if ("proponenteID" in card){
      const problemaAtualizado = { ...card, status: !card.status };
      atualizarProblemas(problemaAtualizado);
      setSelectedProblema(problemaAtualizado);
    }
    else{
      const solucaoAtualizado = { ...card, status: !card.status };
      atualizarSolucoes(solucaoAtualizado);
      setSelectedSolucao(solucaoAtualizado);
    }
  };

  // Alterna a aprovação do problema
  const toggleAprovacao = (card: Prolema|Solucao) => {

    if ("proponenteID" in card){
      const problemaAtualizado = { ...card, aprovado: !card.aprovado};
      atualizarProblemas(problemaAtualizado);
      setSelectedProblema(problemaAtualizado);
    }
    else{
      const solucaoAtualizado = { ...card, aprovado: !card.aprovado};
      atualizarSolucoes(solucaoAtualizado);
      setSelectedSolucao(solucaoAtualizado);
    }
  };

  function handleChangeSolProb(){
    setIsProb(!isProb)
    setFilterInovaSol(null);
    setFilterStatusSol(null);
    setFilterAvaliacaoSol(null);
    setFilteredSolucoes(solucoes);

    setIsSelected(false);
    setSelectedProblema(null);
    setSelectedSolucao(null);

    setIsProblemasVisible(false);
    setIsSolucoesVisible(false);

  }

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
              
              <button onClick={handleChangeSolProb} className="flex items-center flex-row gap-x-1 font-bold text-xl text-white py-2 px-3 font-sans hover:opacity-60 rounded-2xl bg-[#088395]">
                <FaRegStar className="mr-2 items-center flex text-white" size={20}/>
                Lista de {isProb?('Problemas'):('Soluções')}
              </button>
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

                <div className="flex flex-row justify-between gap-x-4">
  {/* Filtro Inova */}
  <div className="flex flex-col items-center gap-2">
    <label className="font-semibold">Inova:</label>
    <select
      value={
        isProb
          ? filterInovaProb === null
            ? ""
            : filterInovaProb
            ? "true"
            : "false"
          : filterInovaSol === null
          ? ""
          : filterInovaSol
          ? "true"
          : "false"
      }
      onChange={(e) => {
        if (isProb) {
          setFilterInovaProb(
            e.target.value === "true"
              ? true
              : e.target.value === "false"
              ? false
              : null
          );
        } else {
          setFilterInovaSol(
            e.target.value === "true"
              ? true
              : e.target.value === "false"
              ? false
              : null
          );
        }
      }}
      className="border border-gray-300 rounded px-4 py-2"
    >
      <option value="">Todos</option>
      <option value="true">Sim</option>
      <option value="false">Não</option>
    </select>
  </div>

  {/* Filtro Status */}
  <div className="flex flex-col items-center gap-2">
    <label className="font-semibold">Status:</label>
    <select
      value={
        isProb
          ? filterStatusProb === null
            ? ""
            : filterStatusProb
            ? "true"
            : "false"
          : filterStatusSol === null
          ? ""
          : filterStatusSol
          ? "true"
          : "false"
      }
      onChange={(e) => {
        if (isProb) {
          setFilterStatusProb(
            e.target.value === "true"
              ? true
              : e.target.value === "false"
              ? false
              : null
          );
        } else {
          setFilterStatusSol(
            e.target.value === "true"
              ? true
              : e.target.value === "false"
              ? false
              : null
          );
        }
      }}
      className="border border-gray-300 rounded px-4 py-2"
    >
      <option value="">Todos</option>
      <option value="true">Ativo</option>
      <option value="false">Inativo</option>
    </select>
  </div>

  {/* Filtro Condição */}
  <div className="flex flex-col items-center gap-2">
    <label className="font-semibold">Condição:</label>
    <select
      value={
        isProb
          ? filterAvaliacaoProb === null
            ? ""
            : filterAvaliacaoProb
            ? "true"
            : "false"
          : filterAvaliacaoSol === null
          ? ""
          : filterAvaliacaoSol
          ? "true"
          : "false"
      }
      onChange={(e) => {
        if (isProb) {
          setFilterAvaliacaoProb(
            e.target.value === "true"
              ? true
              : e.target.value === "false"
              ? false
              : null
          );
        } else {
          setFilterAvaliacaoSol(
            e.target.value === "true"
              ? true
              : e.target.value === "false"
              ? false
              : null
          );
        }
      }}
      className="border border-gray-300 rounded px-4 py-2"
    >
      <option value="">Todos</option>
      <option value="true">Aprovado</option>
      <option value="false">Não avaliado</option>
    </select>
  </div>
</div>


                <div
                  className={`flex flex-col w-full px-5 overflow-y-scroll h-[55vh] pt-5 ${!isCardsVisible && "hidden"} lg:block`}
                  style={{ scrollbarWidth: "thin" }}
                >
                  {isProb&&filteredProblemas.map((card, index) => (
                    <div
                      key={index}
                      className={`bg-white rounded-xl p-3 mb-4 shadow-md w-[100%] hover:opacity-60 flex flex-col justify-between ${card.id === selectedProblema?.id && "cursor-pointer"} ${isSelected ? (card.id === selectedProblema?.id ? "border bgb" : "opacity-30") : ""}`}
                      onClick={() => {
                        showEditais(card);
                        setIsSelected(card.id==selectedProblema?.id?(false):(true));
                        if(card.id==selectedProblema?.id){
                          setIsProblemasVisible(false)
                          setSelectedProblema(null)
                        }
                      }}
                    >
                      <div className="flex items-start justify-between mb-4">
                        <h2 className="text-xl font-bold">{card.titulo}</h2>
                      </div>
                    </div>
                  ))}
                  {!isProb&&filteredSolucoes.map((card, index) => (
                    <div
                      key={index}
                      className={`bg-white rounded-xl p-3 mb-4 shadow-md w-[100%] hover:opacity-60 flex flex-col justify-between ${card.id === selectedSolucao?.id && "cursor-pointer"} ${isSelected ? (card.id === selectedSolucao?.id ? "border bgb" : "opacity-30") : ""}`}
                      onClick={() => {
                        showEditais(card);
                        setIsSelected(card.id==selectedSolucao?.id?(false):(true));
                        if(card.id==selectedSolucao?.id){
                          setIsSolucoesVisible(false)
                          setSelectedSolucao(null)
                        }
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

          {isProb&&isProblemasVisible && selectedProblema && (
            <div
              className="bg-[#F5F5F5] border-2 lg:w-[60vw] lg:mr-16 mb-12 px-[5%] h-[80vh] rounded-xl shadow-lg lg:shadow-2xl flex flex-col overflow-y-scroll"
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

              <div className="flex flex-col items-center mt-6">
                <h2 className="font-bold text-2xl text-center">
                  {selectedProblema.titulo}
                </h2>
                <p className="text-gray-600 mt-4 mx-10 border rounded-xl p-5 max-h-40 overflow-y-scroll">{selectedProblema.descricao}</p>
              </div>

              <div className="mx-4 mt-6">
                <div className="flex flex-col px-10 gap-y-10">

                  <div className="flex items-center gap-x-2 text-center">
                    <p className="font-semibold">Proponente (e-mail):</p>
                    <p>{ usuarios.find((u) => u.id === selectedProblema.proponenteID)?.email || "Não especificado"}</p>
                  </div>

                  <div className="flex flex-row justify-between gap-x-5">
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

                  <div className="flex flex-row justify-between">
                    <div>
                      <div className="flex items-center gap-x-2 text-center">
                      <p className="font-semibold">Visibilidade:</p>
                      <div className="flex items-center gap-2">
                        <Switch
                          checked={selectedProblema.status}
                          onChange={() => toggleStatus(selectedProblema)}
                          className={`${
                            selectedProblema.status ? "bg-blue-600" : "bg-gray-400"
                          } relative inline-flex items-center h-6 rounded-full w-11`}
                        >
                          <span
                            className={`${
                              selectedProblema.status ? "translate-x-6" : "translate-x-1"
                            } inline-block w-4 h-4 transform bg-white rounded-full transition-transform`}
                          />
                        </Switch>
                        <label className="text-sm font-medium">
                          {selectedProblema.status ? "Ativo" : "Inativo"}
                        </label>
                      </div>
                    </div>

                    <div className="flex items-center gap-x-2 text-center">
                      <p className="font-semibold">Status:</p>
                      <div className="flex items-center gap-2">
                        <Switch
                          checked={selectedProblema.aprovado}
                          onChange={() => toggleAprovacao(selectedProblema)}
                          className={`${
                            selectedProblema.aprovado ? "bg-green-600" : "bg-gray-400"
                          } relative inline-flex items-center h-6 rounded-full w-11`}
                        >
                          <span
                            className={`${
                              selectedProblema.aprovado ? "translate-x-6" : "translate-x-1"
                            } inline-block w-4 h-4 transform bg-white rounded-full transition-transform`}
                          />
                        </Switch>
                        <label className="text-sm font-medium">
                          {selectedProblema.aprovado ? "Aprovado" : "Não Aprovado"}
                        </label>
                      </div>
                    </div>
                    </div>

                    <button
                      className="bg-red-500 text-white px-6 py-2 rounded-lg hover:bg-red-700"
                      onClick={() => {
                        if (confirm("Tem certeza que deseja apagar este problema?")) {
                          setProlema((prevProblemas) =>
                            prevProblemas.filter((problema) => problema.id !== selectedProblema.id)
                          );
                          setIsProblemasVisible(false);
                        }
                      }}
                    >
                      Apagar
                    </button>
                  </div>

                </div>
              </div>
            </div>)
          }

          {!isProb&&isSolucoesVisible && selectedSolucao && (
            <div
              className="bg-[#F5F5F5] border-2 lg:w-[60vw] lg:mr-16 mb-12 px-[5%] h-[80vh] rounded-xl shadow-lg lg:shadow-2xl flex flex-col overflow-y-scroll"
              style={{ maxHeight: "80vh", scrollbarWidth: "thin" }}
            >
              <div className="flex items-center justify-center mt-8 border-b py-5">
                {selectedSolucao.inova === true ? (
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

              <div className="flex flex-col items-center mt-6">
                <h2 className="font-bold text-2xl text-center">
                  {selectedSolucao.titulo}
                </h2>
                <p className="text-gray-600 mt-4 mx-10 border rounded-xl p-5 max-h-40 overflow-y-scroll">{selectedSolucao.descricao}</p>
              </div>

              <div className="mx-4 mt-6">
                <div className="flex flex-col px-10 gap-y-10">

                  <div className="flex items-center gap-x-2 text-center">
                    <p className="font-semibold">Nome da Equipe:</p>
                    <p>{ equipes.find((u) => u.id === selectedSolucao.equipeID)?.nome || "Não especificado"}</p>
                  </div>

                  <div className="flex flex-row justify-between gap-x-5">
                    <div className="flex items-center gap-x-2 text-center">
                      <p className="font-semibold">Link do Pich:</p>
                      <p>{selectedSolucao.pitchLink}</p>
                    </div>
                  </div>

                  <div className="flex flex-row justify-between">
                    <div>
                      <div className="flex items-center gap-x-2 text-center">
                      <p className="font-semibold">Visibilidade:</p>
                      <div className="flex items-center gap-2">
                        <Switch
                          checked={selectedSolucao.status}
                          onChange={() => toggleStatus(selectedSolucao)}
                          className={`${
                            selectedSolucao.status ? "bg-blue-600" : "bg-gray-400"
                          } relative inline-flex items-center h-6 rounded-full w-11`}
                        >
                          <span
                            className={`${
                              selectedSolucao.status ? "translate-x-6" : "translate-x-1"
                            } inline-block w-4 h-4 transform bg-white rounded-full transition-transform`}
                          />
                        </Switch>
                        <label className="text-sm font-medium">
                          {selectedSolucao.status ? "Ativo" : "Inativo"}
                        </label>
                      </div>
                    </div>

                    <div className="flex items-center gap-x-2 text-center">
                      <p className="font-semibold">Status:</p>
                      <div className="flex items-center gap-2">
                        <Switch
                          checked={selectedSolucao.aprovado}
                          onChange={() => toggleAprovacao(selectedSolucao)}
                          className={`${
                            selectedSolucao.aprovado ? "bg-green-600" : "bg-gray-400"
                          } relative inline-flex items-center h-6 rounded-full w-11`}
                        >
                          <span
                            className={`${
                              selectedSolucao.aprovado ? "translate-x-6" : "translate-x-1"
                            } inline-block w-4 h-4 transform bg-white rounded-full transition-transform`}
                          />
                        </Switch>
                        <label className="text-sm font-medium">
                          {selectedSolucao.aprovado ? "Aprovado" : "Não Aprovado"}
                        </label>
                      </div>
                    </div>
                    </div>

                    <button
                      className="bg-red-500 text-white px-6 py-2 rounded-lg hover:bg-red-700"
                      onClick={() => {
                        if (confirm("Tem certeza que deseja apagar este problema?")) {
                          setSolucao((prevSolucoes) =>
                            prevSolucoes.filter((solucao) => solucao.id !== selectedSolucao.id)
                          );
                          setIsSolucoesVisible(false);
                        }
                      }}
                    >
                      Apagar
                    </button>
                  </div>

                </div>
              </div>
            </div>)
          }

        </div>
      </div>
    </div>
  );
}
