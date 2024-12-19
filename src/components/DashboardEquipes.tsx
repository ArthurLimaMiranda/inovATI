"use client";
import { useAppContext } from "@/app/contexts/InfoContext";
import { useEffect, useState } from "react";
import { NovaEquipe } from "./NovaEquipe";
import { Equipe } from "../../typings";

export function DashboardEquipes() {
  const { equipes, setEquipe, usuarios, logado} = useAppContext();
  const [selectedTeamId, setSelectedTeamId] = useState<number | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedType, setSelectedType] = useState<string>("");
  const [userTeams, setUserTeams] = useState<Equipe[]>([]);


  const foundUser = usuarios.find((u) => u.id === logado.id);

  useEffect(() => {
    if (foundUser) {
      const filteredTeams = equipes.filter((team) =>
        team.participantesEmail.split(/[, ]+/).includes(foundUser.email)
      );
      setUserTeams(filteredTeams);
    }
  }, [equipes, foundUser]);

  const handleRemoveTeam = (id: number) => {
    if (confirm("Tem certeza que deseja remover esta equipe?")) {
      setEquipe((prevTeams) => {
        const updatedTeams = prevTeams.filter((team) => team.id !== id);
        localStorage.setItem("equipes", JSON.stringify(updatedTeams));
        return updatedTeams;
      });
    }
  };

  const handleRemoveParticipante = (teamId: number) => {
    if (!logado || !logado.isLogado) return;

    const updatedTeams = equipes.map((team) => {
      if (team.id === teamId&&foundUser) {
        const updatedEmails = team.participantesEmail
          .split(/[, ]+/) // Divide por vírgulas ou espaços
          .filter((email) => email !== foundUser.email) // Remove o email do usuário logado
          .join(", "); // Junta de volta em uma string
        return { ...team, participantesEmail: updatedEmails };
      }
      return team;
    });

    // Atualiza o estado com as equipes modificadas
    setEquipe(updatedTeams);
  };

  return (
    <div className="px-4 sm:px-6 md:px-7 py-6 rounded-xl w-full h-full">

      
      {((foundUser?.tipo == 'admGeral') || (foundUser?.tipo == 'avaliador'))&&<>
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
              {equipes.map((eq) => (
                <div
                  key={eq.id}
                  className="p-4 border rounded-lg shadow-lg bg-white flex flex-col justify-between"
                >
                  <div>
                    <p className="font-semibold text-lg">{eq.nome}</p>
                    <p className="text-md mt-2 font-medium my-2">{eq.inova?('Inova'):('ATI')}</p>
                    <p className="text-sm mt-2 font-medium">Participantes:</p>
                    <ul className="mt-1 text-sm text-gray-600">
                      {eq.participantesEmail
                        .split(/[, ]+/) // Divide a string em vírgulas ou espaços
                        .map((email, index) => (
                          <li key={index}>{email}</li>
                        ))}
                    </ul>
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
      </>}
      
      {!((foundUser?.tipo == 'admGeral') || (foundUser?.tipo == 'avaliador'))&&<>
        <div className="w-full grid grid-cols-1 sm:grid-cols-3 items-center border-b mb-6 pb-5">
          <div />
          <p className="text-lg sm:text-xl text-center font-semibold">
            Equipes Membro
          </p>
          <div className="flex justify-center">
            <NovaEquipe/>
          </div>
        </div>

        <div className="flex flex-col overflow-y-scroll h-[85%] gap-y-10">
          <div className="border rounded-xl flex flex-col p-4 items-center">
            <div className="grid grid-cols-4 gap-x-6 gap-y-6 overflow-auto max-h-[80vh]">
              {userTeams.map((team) => (
                <div
                  key={team.id}
                  className="p-4 border rounded-lg shadow-lg bg-white flex flex-col justify-between"
                >
                  <div>
                    <p className="font-semibold text-lg">{team.nome}</p>
                    <p className="font-semibold text-lg">{team.inova?('Inova'):('ATI')}</p>
                    <p className="text-sm mt-2 font-medium">Participantes:</p>
                    <ul className="mt-1 text-sm text-gray-600">
                      {team.participantesEmail
                        .split(/[, ]+/) // Divide a string em vírgulas ou espaços
                        .map((email, index) => (
                          <li key={index}>{email}</li>
                        ))}
                    </ul>
                  </div>
                  <button
                    onClick={() => handleRemoveParticipante(team.id)}
                    className="mt-4 bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded"
                  >
                    Sair
                  </button>
                </div>
              ))}
              {userTeams.length === 0 && (
                <p className="text-gray-600 text-center col-span-4">
                  Você não faz parte de nenhuma equipe no momento.
                </p>
              )}
            </div>
          </div>
        </div>
      </>}

    </div>
  );
}
