//Modal para criação de usuários
import { createUser } from "@/lib/api";
import { isAxiosError } from "axios";
import React, { useState } from "react";
import { LuUserPlus2 } from "react-icons/lu";

interface NumberProps {
  setNewUser: Function;
  newUser: boolean;
}
export function NovoUsuario(props: NumberProps) { //Criação de Usuário pelo Admin
  const [showModal, setShowModal] = React.useState(false);
  const [nome, setNome] = useState("");
  const [login, setLogin] = useState("");
  const [senha, setSenha] = useState("");
  const [rule, setRule] = useState("USER");

  async function handleNewUser() {
    //Checa se o usuários ja existe e, caso não, cria um usuário novo
    let idP = rule === "USER" ? 2 : 1;
    try {
      await createUser(nome, login, senha, idP);
      props.setNewUser(!props.newUser);
      setShowModal(false);
    } catch (error) {
      if (
        isAxiosError(error) &&
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        if (
          error.response.data.message ===
          `Login '${login}' já cadastrado para outro usuário.`
        ) {
          alert("Este login já está em uso. Por favor, escolha outro login.");
        } else {
          alert(`Erro: ${error.response.data.message}`);
        }
      } else {
        alert("Ocorreu um erro ao criar o usuário.");
      }
    }
  }

  function resetModal() {
    setShowModal(true);
    setNome("");
    setLogin("");
    setRule("USER");
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
              className={`text-center bg-gray-1000 shadow-lg shadow-gray-500 rounded-2xl w-[35rem] h-[26rem] pt-12`}
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
                    <option value={2}>ADMIN</option>
                    <option value={1}>USER</option>
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
