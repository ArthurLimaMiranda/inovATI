import { useAppContext } from "@/app/contexts/InfoContext";
import React, { useState } from "react";
import { FaBuilding } from "react-icons/fa";
import {Empresa} from "../../typings";

export function NovaEmpresa() { //Criação de Usuário pelo Admin
  const [showModal, setShowModal] = React.useState(false);
  const [nome, setNome] = useState("");
  const [cnpj, setCNPJ] = useState("");
  const [telefone, setTelefone] = useState("");
  const [email, setEmail] = useState("");

  const {
        empresas,
        setEmpresa
      } = useAppContext()

  async function handleNewEmpresa() {
    const cnpjExists = empresas.some((emp) => emp.email === email);
    const newId = empresas.length > 0 
      ? empresas.reduce((maxId, emp) => Math.max(maxId, emp.id), 0) + 1 
      : 1;
    if(!cnpjExists){
      const newEmpresa: Empresa = {
        id: newId,
        nome:nome,
        cnpj:cnpj,
        telefone:telefone,
        email:email,
      };

      setEmpresa((prevEmpresas) => {
        const updatedEmpresas = [...prevEmpresas, newEmpresa];
        localStorage.setItem("empresas", JSON.stringify(updatedEmpresas));
        return updatedEmpresas;
      });
      setShowModal(false)
    }
    else{
      alert('cnpj ja cadastrado!')
    }
  }

  function resetModal() {
    setShowModal(true);
    setNome("");
    setEmail("");
    setCNPJ("");
    setTelefone('')
  }

  return (
    <>
      <button
        title="Criar empresa"
        className="bg-[#37B7C3] bg-opacity-60 hover:bg-[#088395] mr-2 rounded-md px-6 py-2 text-center"
        onClick={() => resetModal()}
      >
        <FaBuilding />
      </button>

      {showModal ? (
        <>
          <div className="flex items-center justify-center min-h-screen overflow-x-hidden overflow-y-auto fixed inset-0 z-50">
            <div
              className={`text-center bg-gray-1000 shadow-lg shadow-gray-500 rounded-2xl w-[35rem] h-[30rem] pt-12`}
            >
              <div className="text-black font-bold text-2xl text-center mb-8">
                Nova empresa
              </div>

              <div className="mx-28 mt-3">
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleNewEmpresa();
                  }}
                  id="New empresa"
                  className="flex flex-1 flex-col gap-2"
                >
                  <input
                    className="focus:border-green-1100 border-transparent focus:ring-0 bg-white border-white placeholder:text-gray-200 text-gray-800 appearance-none rounded-sm w-full py-2 px-4 leading-tight"
                    id="empresaEmail"
                    type={"text"}
                    placeholder="Email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                    }}
                    required
                    title="Nome"
                  />

                  <input
                    className="focus:border-green-1100 border-transparent focus:ring-0 bg-white border-white placeholder:text-gray-200 text-gray-800 appearance-none rounded-sm w-full py-2 px-4 leading-tight"
                    id="userName"
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
                    className={`focus:border-green-1100 border-transparent focus:ring-0 bg-white placeholder:text-gray-200 text-gray-800 appearance-none rounded-sm w-full py-2 px-4 leading-tight`}
                    id="userCNPJ"
                    type={"text"}
                    placeholder="CNPJ"
                    value={cnpj}
                    onChange={(e) => {
                      setCNPJ(e.target.value);
                    }}
                    required
                    title="CNPJ"
                  />

                  <input
                    className={`focus:border-green-1100 border-transparent focus:ring-0 bg-white placeholder:text-gray-200 text-gray-800 appearance-none rounded-sm w-full py-2 px-4 leading-tight`}
                    id="userSenha"
                    type='number'
                    placeholder="Telefone"
                    value={telefone}
                    onChange={(e) => {
                      setTelefone(e.target.value);
                    }}
                    required
                    title="Senha"
                  />

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
