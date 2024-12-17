"use client";
import { useAppContext } from "@/app/contexts/InfoContext";
import { useState } from "react";
import { NovoUsuario } from "./NovoUsuario";

export function DashboardUsuarios() {
  const { usuarios, setUser, logado} = useAppContext();
  const [newUser, setNewUser] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedType, setSelectedType] = useState<string>("");

  const handleRemoveUser = (id: number) => {
    if (confirm("Tem certeza que deseja remover este usuário?")) {
      setUser((prevUsers) => {
        const updatedUsers = prevUsers.filter((user) => user.id !== id);
        localStorage.setItem("usuarios", JSON.stringify(updatedUsers));
        return updatedUsers;
      });
    }
  };

  const handleToggleVerified = (id: number) => {
    setSelectedUserId(id);
    setModalOpen(true);
  };

  const handleConfirmVerification = () => {
    if (selectedUserId !== null && selectedType) {
      setUser((prevUsers) => {
        const updatedUsers = prevUsers.map((user) =>
          user.id === selectedUserId
            ? { ...user, verified: true, tipo: selectedType }
            : user
        );
        localStorage.setItem("usuarios", JSON.stringify(updatedUsers));
        return updatedUsers;
      });
      setModalOpen(false);
      setSelectedUserId(null);
      setSelectedType("");
    } else {
      alert("Por favor, selecione um tipo de usuário.");
    }
  };

  return (
    <div className="px-4 sm:px-6 md:px-7 py-6 rounded-xl w-full h-full">
      <div className="w-full grid grid-cols-1 sm:grid-cols-3 items-center border-b mb-6 pb-5">
        <div />
        <p className="text-lg sm:text-xl text-center font-semibold">
          Usuários Cadastrados
        </p>
        <div className="flex justify-center">
          <NovoUsuario setNewUser={setNewUser} newUser={newUser} />
        </div>
      </div>

      <div className="flex flex-col overflow-y-scroll h-[85%] gap-y-10">
        {/* Usuários não validados */}
        <div className="border rounded-xl flex flex-col p-4 items-center">
          <p className="text-lg font-bold py-5">Usuários não validados</p>
          <div className="grid grid-cols-4 gap-x-6 gap-y-6 overflow-auto max-h-[80vh]">
            {usuarios
              .filter((us) => !us.verified)
              .map((us) => (
                <div
                  key={us.id}
                  className="p-4 border rounded-lg shadow-lg bg-white flex flex-col justify-between"
                >
                  <div>
                    <p className="font-semibold text-lg">{us.login}</p>
                    <p className="text-gray-600">{us.email}</p>
                  </div>

                  {us.documentacao && (
                    <button
                      onClick={() =>
                        us.documentacao?.forEach((base64) => {
                          if (!base64.startsWith("data:")) {
                            console.error("Formato Base64 inválido!");
                            return;
                          }
                          const link = document.createElement("a");
                          link.href = base64;
                          const mimeMatch = base64.match(/data:(.*?);base64,/);
                          const mime = mimeMatch ? mimeMatch[1] : "application/octet-stream";
                          link.download = `arquivo.${mime.split("/")[1] || "bin"}`; // Nomeia o arquivo de acordo com o tipo MIME
                          link.click();
                        })
                        
                      }
                      className="mt-2 bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded"
                    >
                      Baixar Documentação
                    </button>
                  )}
                  
                  <button
                    onClick={() => handleToggleVerified(us.id)}
                    className="mt-2 bg-yellow-500 hover:bg-yellow-600 text-white py-2 px-4 rounded"
                  >
                    Validar
                  </button>
                  <button
                    onClick={() => handleRemoveUser(us.id)}
                    className="mt-4 bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded"
                  >
                    Remover
                  </button>
                </div>
              ))}
          </div>
        </div>

        {/* Usuários validados */}
        <div className="border rounded-xl flex flex-col p-4 items-center">
          <p className="text-lg font-bold py-5">Usuários validados</p>
          <div className="grid grid-cols-4 gap-x-6 gap-y-6 overflow-auto max-h-[80vh]">
            {usuarios
              .filter((us) => us.verified&&us.id!=logado.id)
              .map((us) => (
                <div
                  key={us.id}
                  className="p-4 border rounded-lg shadow-lg bg-white flex flex-col justify-between"
                >
                  <div>
                    <p className="font-semibold text-lg">{us.login}</p>
                    <p className="text-gray-600">{us.email}</p>
                    <p className="text-sm text-gray-500">Tipo: {us.tipo}</p>
                  </div>

                  {us.documentacao && (
                    <button
                      onClick={() =>
                        us.documentacao?.forEach((base64) => {
                          if (!base64.startsWith("data:")) {
                            console.error("Formato Base64 inválido!");
                            return;
                          }
                          const link = document.createElement("a");
                          link.href = base64;
                          const mimeMatch = base64.match(/data:(.*?);base64,/);
                          const mime = mimeMatch ? mimeMatch[1] : "application/octet-stream";
                          link.download = `arquivo.${mime.split("/")[1] || "bin"}`; // Nomeia o arquivo de acordo com o tipo MIME
                          link.click();
                        })
                        
                      }
                      className="mt-2 bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded"
                    >
                      Baixar Documentação
                    </button>
                  )}

                  <button
                    onClick={() => handleToggleVerified(us.id)}
                    className="mt-2 bg-yellow-500 hover:bg-yellow-600 text-white py-2 px-4 rounded"
                  >
                    Alterar permissões
                  </button>
                  <button
                    onClick={() => handleRemoveUser(us.id)}
                    className="mt-4 bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded"
                  >
                    Remover
                  </button>
                </div>
              ))}
          </div>
        </div>
      </div>

      {/* Modal */}
      {modalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-[90%] max-w-md">
            <h2 className="text-lg font-bold mb-4">Selecione o tipo de usuário</h2>
            <div className="mb-4">
              <label htmlFor="userType" className="block text-sm font-medium text-gray-700 mb-2">
                Tipo de Usuário:
              </label>
              <select
                id="userType"
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="" disabled>
                  Selecione...
                </option>
                <option value="userBasico">Básico</option>
                <option value="admGeral">Administrador Geral</option>
                <option value="admATI">Administrador Geral</option>
                <option value="admINOVA">Administrador Geral</option>
                <option value="professor">Professor</option>
                <option value="aluno">Aluno</option>
                <option value="empresario">Empresário</option>
              </select>
            </div>
            <div className="flex justify-between">
              <button
                onClick={handleConfirmVerification}
                className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded"
              >
                Confirmar
              </button>
              <button
                onClick={() => setModalOpen(false)}
                className="bg-gray-500 hover:bg-gray-600 text-white py-2 px-4 rounded"
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
