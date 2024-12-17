//Cadastro de novo usuário
"use client";
import {User} from "../../typings";

import React, { useContext, useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FaRegEye } from "react-icons/fa6";
import { AiOutlineLock, AiOutlineMail } from "react-icons/ai";
import { AuthContext } from "../app/contexts/AuthContext";
import { parseCookies } from "nookies";
import { FaRegUserCircle } from "react-icons/fa";
import { IoEnterOutline } from "react-icons/io5";
import { MdDriveFileRenameOutline } from "react-icons/md";

import { createUser } from "@/lib/api";

import { MdCreateNewFolder } from "react-icons/md";
import { NovaDocumentacao } from "./NovaDocumentacao";
import { useAppContext } from "@/app/contexts/InfoContext";

export function Register() {

    const {
      usuarios,
      setUser,
      logado
    } = useAppContext()
  
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [login, setLogin] = useState("");
  const [senha, setSenha] = useState("");

  const [descricao, setDescricao] = useState("");
  const [files, setFiles] = useState<File[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const { signIn } = useContext(AuthContext);
  const [badRegister, setBadRegister] = useState(false);
  const router = useRouter();

  function fileToBase64(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string); // Retorna o Base64
      reader.onerror = reject;
      reader.readAsDataURL(file); // Lê o arquivo e converte para Base64
    });
  }

  async function handleRegister() {
    // Verificar se o email já existe
    const emailExists = usuarios.some((user) => user.email === email);
    if (emailExists) {
      setBadRegister(true);
      return;
    }
  
    try {
      // Converter arquivos para Base64
      const base64Files = await Promise.all(files.map(fileToBase64));
  
      const newId = usuarios.length > 0 
        ? usuarios.reduce((maxId, user) => Math.max(maxId, user.id), 0) + 1 
        : 1;
  
      const newUser: User = {
        id: newId,
        login: login,
        name: nome,
        email: email,
        senha: senha,
        tipo: "", // Defina o tipo de usuário, se necessário
        verified: false,
        descricao: descricao,
        documentacao: base64Files, // Armazena os arquivos em Base64
      };
  
      // Atualizar usuários no estado e salvar no localStorage
      setUser((prevUsuarios) => {
        const updatedUsuarios = [...prevUsuarios, newUser];
        localStorage.setItem("usuarios", JSON.stringify(updatedUsuarios));
        return updatedUsuarios;
      });
  
      router.push("/");
    } catch (error) {
      console.error("Erro ao registrar usuário:", error);
      setBadRegister(true);
    }
  }
  
  

  useEffect(() => {
    if (logado.isLogado) {
      router.push("/dashboard");
    }
    setBadRegister(false);
  }, []);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => { //Fecha modal criar Novo Edital
    setIsModalOpen(false);
  };

  return ( //Cadastro de Usuário
    <div className="flex flex-col items-center justify-center min-h-screen py-2 bg-[#EBF4F6]">
      <main className="flex flex-col items-center justify-center w-full flex-1 px-6 sm:px-10 text-center">
        <div className="bg-white rounded-2xl shadow-2xl flex flex-col md:flex-row w-full max-w-4xl">
          <form
            className="w-full md:w-3/5 p-6 md:p-10"
            onSubmit={(e) => {
              e.preventDefault();
              handleRegister();
            }}
          >
            <div className="flex justify-between">
              <p className="font-bold flex flex-row items-center gap-x-2">
                inovATI <FaRegEye />
              </p>
              <Link href="/login">
                <div className="font-normal border rounded-xl flex flex-row items-center gap-x-2 py-1 px-3 hover:opacity-60 hover:bg-gray-50">
                  <IoEnterOutline />
                  Voltar
                </div>
              </Link>
            </div>
            <div className="py-6 md:py-10">
              <h2 className="text-3xl text-center font-sans text-[#088395] mb-2">
                Cadastro de Usuário
              </h2>
              <p className="text-sm text-center font-sans mr-3 text-gray-400 mb-5">
                Crie sua conta e encontre oportunidades de inovação tecnológica
                facilmente.
              </p>
              <div className="flex flex-col items-center text-left">
                <div className="relative my-4 w-4/5 hover:opacity-70 hover:border-gray-400">
                  <input
                    type="username"
                    value={nome}
                    onChange={(e) => {setNome(e.target.value); setBadRegister(false)}}
                    className="border border-[#1C1C1C] rounded-md pl-10 pr-3 py-2 w-full block text-sm text-[#1C1C1C] bg-transparent border-1 appearance-none focus:outline-none focus:ring-0 focus:border-[#088395]"
                    placeholder="Nome Completo"
                    required
                  />
                  <FaRegUserCircle className="absolute top-1/2 left-3 transform -translate-y-1/2 text-[#1C1C1C]" />
                </div>
                <div className="relative my-4 w-4/5 hover:opacity-70 hover:border-gray-400">
                  <input
                    type="username"
                    value={login}
                    onChange={(e) => {setLogin(e.target.value); setBadRegister(false)}}
                    className="border border-[#1C1C1C] rounded-md pl-10 pr-3 py-2 w-full block text-sm text-[#1C1C1C] bg-transparent border-1 appearance-none focus:outline-none focus:ring-0 focus:border-[#088395]"
                    placeholder="Usuário"
                    required
                  />
                  <MdDriveFileRenameOutline className="absolute top-1/2 left-3 transform -translate-y-1/2 text-[#1C1C1C]" />
                </div>
                <div className="relative my-4 w-4/5 hover:opacity-70 hover:border-gray-400">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => {setEmail(e.target.value); setBadRegister(false)}}
                    className="border border-[#1C1C1C] rounded-md pl-10 pr-3 py-2 w-full block text-sm text-[#1C1C1C] bg-transparent border-1 appearance-none focus:outline-none focus:ring-0 focus:border-[#088395]"
                    placeholder="Email"
                    required
                  />
                  <AiOutlineMail className="absolute top-1/2 left-3 transform -translate-y-1/2 text-[#1C1C1C]" />
                </div>
                <div className="relative my-4 w-4/5 hover:opacity-70 hover:border-gray-400">
                  <input
                    type="password"
                    value={senha}
                    onChange={(e) =>{ setSenha(e.target.value); setBadRegister(false)}}
                    className="hover:opacity-70 border border-[#1C1C1C] rounded-md pl-10 pr-3 py-2 w-full block text-sm text-[#1C1C1C] bg-transparent border-1 appearance-none focus:outline-none focus:ring-0 focus:border-[#088395]"
                    placeholder="Senha"
                    required
                  />
                  <AiOutlineLock className="absolute top-1/2 left-3 transform -translate-y-1/2 text-[#1C1C1C]" />
                </div>
                <>
                  <button
                    type="button"
                    onClick={handleOpenModal}
                    className="bg-[#37B7C3] text-white flex items-center justify-around py-2 h-14 w-14 rounded-full hover:opacity-60"
                  >
                    {" "}
                    <MdCreateNewFolder size={30} />
                  </button>
                  <NovaDocumentacao
                    descricao={descricao}
                    setDescricao={setDescricao}
                    files={files}
                    setFiles={setFiles}
                    isOpen={isModalOpen}
                    onClose={handleCloseModal}
                  />
                </>
                                    
                {badRegister&&(<p className="text-red-400">Já existe um usuário com esse login</p>)}
              </div>
              <button
                type="submit"
                className="hover:opacity-70 w-48 mb-4 text-[18px] mt-6 rounded-xl bg-gradient-to-r from-[#37B7C3] to-[#088395] px-4 text-white font-semibold font-sans py-2 "
              >
                Enviar
              </button>
            </div>
          </form>
          <div className="w-full md:w-2/5  bg-gradient-to-r from-[#37B7C3] to-[#088395] text-white rounded-b-2xl md:rounded-tr-2xl md:rounded-br-2xl py-10 md:py-36 px-6 md:px-12"></div>
        </div>
      </main>
    </div>
  );
}
