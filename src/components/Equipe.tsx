//Cadastro de novo usuário
"use client";
import {Equipe, User} from "../../typings";

import React, { useContext, useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FaRegEye } from "react-icons/fa6";
import { AiOutlineLock, AiOutlineMail } from "react-icons/ai";
import { AuthContext } from "../app/contexts/AuthContext";
import { FaRegUserCircle } from "react-icons/fa";
import { IoEnterOutline } from "react-icons/io5";
import { MdDriveFileRenameOutline } from "react-icons/md";
import { MdCreateNewFolder } from "react-icons/md";
import { NovaDocumentacao } from "./NovaDocumentacao";
import { useAppContext } from "@/app/contexts/InfoContext";

export function Equipe() {

    const {
      usuarios,
      equipes,
			setEquipe,
			logado
    } = useAppContext()
  
  const [nome, setNome] = useState("");

  const [isModalOpen, setIsModalOpen] = useState(false);

  const [badRegister, setBadRegister] = useState(false);
  const router = useRouter();

  async function handleRegister() {
    // Verificar se o time já existe
    const teamExists = equipes.some((equipe) => equipe.nome === nome);
    if (teamExists) {
      setBadRegister(true);
      return;
    }
  
    try {
      const newId = equipes.length > 0 ? 
				equipes.reduce((maxId, equipe) => Math.max(maxId, equipe.id), 0) + 1 :
				 1;

      const newTeam: Equipe = {
        id: newId,
        nome: nome
      };

			setEquipe((prevEquipes) => {
				const updatedTeams = [...prevEquipes, newTeam];
				localStorage.setItem("equipes", JSON.stringify(updatedTeams));
				return updatedTeams;
			});
  
      router.push("/");
    } catch (error) {
      console.error("Erro ao registrar equipe:", error);
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

  return ( //Registro de Equipe
    <div className="flex flex-col items-center justify-center min-h-screen py-2 bg-[#EBF4F6]">
      <main className="flex flex-col items-center justify-center w-full flex-1 px-6 sm:px-10 text-center">
        <div className="bg-white rounded-2xl shadow-2xl flex flex-col md:flex-row w-full max-w-4xl">
          
          <div className="w-full md:w-2/5  bg-gradient-to-r from-[#37B7C3] to-[#088395] text-white rounded-b-2xl md:rounded-tr-2xl md:rounded-br-2xl py-10 md:py-36 px-6 md:px-12"></div>
        </div>
      </main>
    </div>
  );
}
