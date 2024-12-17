import { useAppContext } from "@/app/contexts/InfoContext";
import { createUser } from "@/lib/api";
import { isAxiosError } from "axios";
import React, { useState } from "react";
import { LuUserPlus2 } from "react-icons/lu";
import {User} from "../../typings";

interface NumberProps {
  setNewUser: Function;
  newUser: boolean;
}
export function NovoUsuario() { //Criação de Usuário pelo Admin
  const [showModal, setShowModal] = React.useState(false);
  const [nome, setNome] = useState("");
  const [login, setLogin] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [rule, setRule] = useState("");

  const {
        usuarios,
        setUser
      } = useAppContext()

  async function handleNewUser() {
    const emailExists = usuarios.some((user) => user.email === email);
    const newId = usuarios.length > 0 
      ? usuarios.reduce((maxId, user) => Math.max(maxId, user.id), 0) + 1 
      : 1;
    if(!emailExists){
      const newUser: User = {
        id: newId,
        login: login,
        name: nome,
        email: email,
        senha: senha,
        tipo: rule,
        verified: true,
        descricao: '',
        documentacao: [],
      };

      setUser((prevUsuarios) => {
        const updatedUsuarios = [...prevUsuarios, newUser];
        localStorage.setItem("usuarios", JSON.stringify(updatedUsuarios));
        return updatedUsuarios;
      });
      setShowModal(false)
    }
    else{
      alert('email ja cadastrado!')
    }
  }

  function resetModal() {
    setShowModal(true);
    setNome("");
    setEmail("");
    setLogin("");
    setSenha('')
    setRule("");
  }

  return (
    <>
      <button
        title="Criar usuário"
        className="bg-[#37B7C3] bg-opacity-60 hover:bg-[#088395] mr-2 rounded-md px-6 py-2 text-center"
        onClick={() => resetModal()}
      >
        <LuUserPlus2 />
      </button>

      {showModal ? (
        <>
          <div className="flex items-center justify-center min-h-screen overflow-x-hidden overflow-y-auto fixed inset-0 z-50">
            <div
              className={`text-center bg-gray-1000 shadow-lg shadow-gray-500 rounded-2xl w-[35rem] h-[32rem] pt-12`}
            >
              <div className="text-black font-bold text-2xl text-center mb-8">
                Novo usuário
              </div>

              <div className="mx-28 mt-3">
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleNewUser();
                  }}
                  id="New usuario"
                  className="flex flex-1 flex-col gap-2"
                >
                  <input
                    className="focus:border-green-1100 border-transparent focus:ring-0 bg-white border-white placeholder:text-gray-200 text-gray-800 appearance-none rounded-sm w-full py-2 px-4 leading-tight"
                    id="userEmail"
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
                    id="userLogin"
                    type={"text"}
                    placeholder="Login"
                    value={login}
                    onChange={(e) => {
                      setLogin(e.target.value);
                    }}
                    required
                    title="Login"
                  />

                  <input
                    className={`focus:border-green-1100 border-transparent focus:ring-0 bg-white placeholder:text-gray-200 text-gray-800 appearance-none rounded-sm w-full py-2 px-4 leading-tight`}
                    id="userSenha"
                    type={"password"}
                    placeholder="Senha"
                    value={senha}
                    onChange={(e) => {
                      setSenha(e.target.value);
                    }}
                    required
                    title="Senha"
                  />

                  <select
                    className={`focus:border-green-1100 border-transparent focus:ring-0 bg-white placeholder:text-gray-200 text-gray-800 appearance-none rounded-sm w-full py-2 px-4 leading-tight`}
                    id="userRule"
                    placeholder={rule}
                    value={rule}
                    onChange={(e) => setRule(e.target.value)}
                    required
                    title="Regra"
                  >
                    <option value="userBasico">Básico</option>
                    <option value="admGeral">Administrador Geral</option>
                    <option value="admATI">Administrador Geral</option>
                    <option value="admINOVA">Administrador Geral</option>
                    <option value="professor">Professor</option>
                    <option value="aluno">Aluno</option>
                    <option value="empresario">Empresário</option>
                  </select>

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
