"use client";
import { useAppContext } from "@/app/contexts/InfoContext";
import { useState } from "react";
import { NovaEmpresa } from "./NovaEmpresa";

export function DashboardEmpresas() {
  const { usuarios, empresas, setUser, setEmpresa, logado } = useAppContext();
  const [selectedEmpresaId, setSelectedEmpresaId] = useState<string>(""); // ID da empresa selecionada no modal
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null); // ID do usuário selecionado no modal
  const [modalOpen, setModalOpen] = useState(false);

  // Função para remover uma empresa
  const handleRemoveEmpresa = (id: number, cnpj: string) => {
    if (confirm("Tem certeza que deseja remover esta empresa?")) {
      // Remover empresa da lista
      setEmpresa((prevEmpresas) => {
        const updatedEmpresas = prevEmpresas.filter((emp) => emp.id !== id);
        localStorage.setItem("empresas", JSON.stringify(updatedEmpresas));
        return updatedEmpresas;
      });

      // Atualizar os usuários para desvincular a empresa
      setUser((prevUsuarios) => {
        const updatedUsuarios = prevUsuarios.map((user) =>
          user.empresaVinculo === cnpj ? { ...user, empresaVinculo: "" } : user
        );
        localStorage.setItem("usuarios", JSON.stringify(updatedUsuarios));
        return updatedUsuarios;
      });
    }
  };

  const handleVincularEmpresa = (userId: number) => {
    setSelectedUserId(userId);
    setModalOpen(true);
  };

  const handleConfirmVinculo = () => {
    if (!selectedEmpresaId || !selectedUserId) return;

    setUser((prevUsuarios) => {
      const updatedUsuarios = prevUsuarios.map((user) =>
        user.id === selectedUserId ? { ...user, empresaVinculo: selectedEmpresaId } : user
      );
      localStorage.setItem("usuarios", JSON.stringify(updatedUsuarios));
      return updatedUsuarios;
    });

    setModalOpen(false);
    setSelectedEmpresaId("");
    setSelectedUserId(null);
  };

  return (
    <div className="px-4 sm:px-6 md:px-7 py-6 rounded-xl w-full h-full">
      <div className="w-full grid grid-cols-1 sm:grid-cols-3 items-center border-b mb-6 pb-5">
        <div />
        <p className="text-lg sm:text-xl text-center font-semibold">Empresas</p>
        <div className="flex justify-center">
          <NovaEmpresa />
        </div>
      </div>

      <div className="flex flex-col overflow-y-scroll h-[85%] gap-y-10">
        {/* Representantes */}
        <div className="border rounded-xl flex flex-col p-4 items-center">
          <p className="text-lg font-bold py-5">Representantes</p>
          <div className="grid grid-cols-4 gap-x-6 gap-y-6 overflow-auto max-h-[80vh]">
            {usuarios
              .filter((us) => us.tipo === "empresa")
              .map((us) => (
                <div
                  key={us.id}
                  className="p-4 border rounded-lg shadow-lg bg-white flex flex-col justify-between"
                >
                  <div>
                    <p className="font-semibold text-lg">{us.login}</p>
                    <p className="text-gray-600">{us.email}</p>
                    <p className="text-sm text-gray-500">Empresa vinculada: {us.empresaVinculo || "Nenhuma"}</p>
                  </div>
                  <button
                    onClick={() => handleVincularEmpresa(us.id)}
                    className="mt-2 bg-yellow-500 hover:bg-yellow-600 text-white py-2 px-4 rounded"
                  >
                    Vincular Empresa
                  </button>
                </div>
              ))}
          </div>
        </div>

        {/* Empresas */}
        <div className="border rounded-xl flex flex-col p-4 items-center">
          <p className="text-lg font-bold py-5">Empresas Cadastradas</p>
          <div className="grid grid-cols-4 gap-x-6 gap-y-6 overflow-auto max-h-[80vh]">
            {empresas.map((emp) => (
              <div
                key={emp.id}
                className="p-4 border rounded-lg shadow-lg bg-white flex flex-col justify-between"
              >
                <div>
                  <p className="font-semibold text-lg">{emp.nome}</p>
                  <p className="text-gray-600">CNPJ: {emp.cnpj}</p>
                  <p className="text-sm text-gray-500">Email: {emp.email}</p>
                  <p className="text-sm text-gray-500">Telefone: {emp.telefone}</p>
                </div>
                <button
                  onClick={() => handleRemoveEmpresa(emp.id, emp.cnpj)}
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
            <h2 className="text-lg font-bold mb-4">Selecione a empresa para vincular</h2>
            <div className="mb-4">
              <label htmlFor="empresaVinc" className="block text-sm font-medium text-gray-700 mb-2">
                Empresas:
              </label>
              <select
                id="empresaVinc"
                value={selectedEmpresaId}
                onChange={(e) => setSelectedEmpresaId(e.target.value)}
                className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="" disabled>
                  Selecione...
                </option>
                {empresas.map((emp) => (
                  <option key={emp.id} value={emp.cnpj}>
                    {emp.nome} - {emp.cnpj}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex justify-between">
              <button
                onClick={handleConfirmVinculo}
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
