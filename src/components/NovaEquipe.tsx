//Cadastro de nova equipe
import { useAppContext } from "@/app/contexts/InfoContext";
import React, { useState } from "react";
import { FaUsers } from "react-icons/fa6";
import { Equipe, User } from "../../typings";

export function NovaEquipe() {
  const [showModal, setShowModal] = React.useState(false);
  const [nome, setNome] = useState("");
  const [membros, setMembros] = useState("");
  const [inova, setInova] = useState(true);

  const {
    usuarios,
    equipes,
    setEquipe,
    logado
  } = useAppContext()

  const foundUser = usuarios.find((u) => u.id === logado.id);

  async function handleNewTeam() {
    // Verificar se o time já existe
    const teamExists = equipes.some((equipe) => equipe.nome === nome);
    if (!teamExists) {
      const newId = equipes.length > 0 ?
        equipes.reduce((maxId, equipe) => Math.max(maxId, equipe.id), 0) + 1 :
        1;

      const newTeam: Equipe = {
        id: newId,
        nome: nome,
        participantesEmail:membros,
        inova: inova
      };

      setEquipe((prevEquipes) => {
        const updatedTeams = [...prevEquipes, newTeam];
        localStorage.setItem("equipes", JSON.stringify(updatedTeams));
        return updatedTeams;
      });
      setShowModal(false)
    }
    else {
      alert("Equipe já registrada!");
    }
  }
  
  function resetModal() {
    setShowModal(true);
    setNome("");
    setMembros("")
    setInova(true)
  }

  return (
    <>
      <button
        title="Criar equipe"
        className="bg-[#37B7C3] bg-opacity-60 hover:bg-[#088395] mr-2 rounded-md px-6 py-2 text-center"
        onClick={() => resetModal()}
      >
        <FaUsers />
      </button>

      {showModal ? (
        <>
          <div className="flex items-center justify-center min-h-screen overflow-x-hidden overflow-y-auto fixed inset-0 z-50">
            <div
              className={`text-center bg-gray-1000 shadow-lg shadow-gray-500 rounded-2xl w-[35rem] h-[32rem] pt-12`}
            >
              <div className="text-black font-bold text-2xl text-center mb-8">
                Nova equipe
              </div>

              <div className="mx-28 mt-3">
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleNewTeam();
                  }}
                  id="New equipe"
                  className="flex flex-1 flex-col gap-2"
                >
                  <input
                    className="focus:border-green-1100 border-transparent focus:ring-0 bg-white border-white placeholder:text-gray-200 text-gray-800 appearance-none rounded-sm w-full py-2 px-4 leading-tight"
                    id="teamName"
                    type={"text"}
                    placeholder="Nome"
                    value={nome}
                    onChange={(e) => {
                      setNome(e.target.value);
                    }}
                    required
                    title="Nome"
                  />

                  <input
                    className="focus:border-green-1100 border-transparent focus:ring-0 bg-white border-white placeholder:text-gray-200 text-gray-800 appearance-none rounded-sm w-full py-2 px-4 leading-tight"
                    id="teamEmail"
                    type={"text"}
                    placeholder="Email dos participantes:"
                    value={membros}
                    onChange={(e) => {
                      setMembros(e.target.value);
                    }}
                    required
                    title="Nome"
                  />
                  {((foundUser?.tipo == 'admGeral') || (foundUser?.tipo == 'professor'))&&
                  <div className="flex items-center justify-between my-5">
                    <label className="font-semibold text-gray-700">ATI</label>
                    <div
                      className={`w-14 h-8 flex items-center rounded-full p-1 cursor-pointer ${
                        inova ? "bg-red-300" : "bg-green-300"
                      }`}
                      onClick={() => setInova(!inova)}
                    >
                      <div
                        className={`h-6 w-6 rounded-full shadow-md transform ${
                          inova ? "translate-x-6 bg-white" : "translate-x-0 bg-gray-400"
                        }`}
                      />
                    </div>
                    <label className="font-semibold text-gray-700">Inova</label>
                  </div>}

                  <button
                    title="Cadastrar"
                    type="submit"
                    className="mt-5 inline-block rounded-lg font-bold bg-green-1100 hover:bg-green-1200 px-5 py-2 leading-none text-white"
                  >
                    Cadastrar
                  </button>

                  <button
                    title="Fechar"
                    type="button"
                    className="mt-1 inline-block rounded-lg font-bold text-green-1100 hover:text-green-1200 hover:underline px-5 py-2 leading-none"
                    onClick={() => setShowModal(false)}
                  >
                    Fechar
                  </button>
                </form>
              </div>
            </div>
          </div>
        </>
      ) : null}
    </>
  );
}
