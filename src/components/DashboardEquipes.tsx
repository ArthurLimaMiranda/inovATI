"use client";
import { useAppContext } from "@/app/contexts/InfoContext";
import { useState } from "react";
import { NovaEquipe } from "./NovaEquipe";

export function DashboardEquipes() {
  const { equipes, setEquipe, logado} = useAppContext();
  const [selectedTeamId, setSelectedTeamId] = useState<number | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedType, setSelectedType] = useState<string>("");

  const handleRemoveTeam = (id: number) => {
    if (confirm("Tem certeza que deseja remover esta equipe?")) {
      setEquipe((prevTeams) => {
        const updatedTeams = prevTeams.filter((team) => team.id !== id);
        localStorage.setItem("equipes", JSON.stringify(updatedTeams));
        return updatedTeams;
      });
    }
  };

  return (
    <div className="px-4 sm:px-6 md:px-7 py-6 rounded-xl w-full h-full">
      <div className="w-full grid grid-cols-1 sm:grid-cols-3 items-center border-b mb-6 pb-5">
        <div />
        <p className="text-lg sm:text-xl text-center font-semibold">
          Equipes Cadastradas
        </p>
        <div className="flex justify-center">
          <NovaEquipe/>
        </div>
      </div>

      <div className="flex flex-col overflow-y-scroll h-[85%] gap-y-10">
        <div className="border rounded-xl flex flex-col p-4 items-center">
          <div className="grid grid-cols-4 gap-x-6 gap-y-6 overflow-auto max-h-[80vh]">
            {equipes
              .map((eq) => (
                <div
                  key={eq.id}
                  className="p-4 border rounded-lg shadow-lg bg-white flex flex-col justify-between"
                >
                  <div>
                    <p className="font-semibold text-lg">{eq.nome}</p>
                  </div>
                  
                  <button
                    onClick={() => handleRemoveTeam(eq.id)}
                    className="mt-4 bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded"
                  >
                    Remover
                  </button>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}
