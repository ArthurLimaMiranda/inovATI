'use client'
import { createContext, useContext, useEffect, useState } from "react";
import { Solucao, Noticias, Prolema, Edital, Ranking, Empresa, User, Equipe, Logado } from "../../../typings";

type Info = {
  solucoes: Solucao[],
  noticias: Noticias[],
  problemas: Prolema[],
  editais: Edital[],
  rankings: Ranking[],
  empresas: Empresa[],
  equipes: Equipe[],
  usuarios: User[],
  logado: Logado,
  setSolucao: React.Dispatch<React.SetStateAction<Solucao[]>>,
  setNoticias: React.Dispatch<React.SetStateAction<Noticias[]>>,
  setProlema: React.Dispatch<React.SetStateAction<Prolema[]>>,
  setEdital: React.Dispatch<React.SetStateAction<Edital[]>>,
  setRanking: React.Dispatch<React.SetStateAction<Ranking[]>>,
  setEmpresa: React.Dispatch<React.SetStateAction<Empresa[]>>,
  setEquipe: React.Dispatch<React.SetStateAction<Equipe[]>>,
  setUser: React.Dispatch<React.SetStateAction<User[]>>,
  setLogado: React.Dispatch<React.SetStateAction<Logado>>,
  revalidate: string,
  currentPage: string[],
  setCurrentPage: React.Dispatch<React.SetStateAction<string[]>>,
};

const infoContext = createContext<Info | undefined>(undefined);

export function InfoWrapper({ children }: { children: React.ReactNode }) {
  const [revalidate, setRevalidate] = useState("");
  const [currentPage, setCurrentPage] = useState<string[]>([""]);
  const [solucoes, setSolucao] = useState<Solucao[]>([]);
  const [noticias, setNoticias] = useState<Noticias[]>([]);
  const [editais, setEdital] = useState<Edital[]>([]);
  const [rankings, setRanking] = useState<Ranking[]>([]);
  const [equipes, setEquipe] = useState<Equipe[]>([]);
  const [problemas, setProlema] = useState<Prolema[]>(() => {
    const savedProblemas = localStorage.getItem("problemas");
    return savedProblemas ? JSON.parse(savedProblemas) : [];
  }); 
  
  const [usuarios, setUser] = useState<User[]>(() => {
    const savedUsers = localStorage.getItem("usuarios");
    return savedUsers ? JSON.parse(savedUsers) : [
      {
        id: 0,
        login: "admGeral0",
        name: "Joao Bastos",
        email: "joaobastos@hotmail.com",
        verified: true,
        tipo: "admGeral",
        senha: "123",
        descricao: "",
        documentacao: null,
        empresaVinculo:''
      },
    ];
  });


  const [logado, setLogado] = useState<Logado>(() => {
    const savedLogado = localStorage.getItem("logado");
    return savedLogado ? JSON.parse(savedLogado) : { id: null, isLogado: false };
  });

  const [empresas, setEmpresa] = useState<Empresa[]>(() => {
    const savedEmpresas = localStorage.getItem("empresas");
    return savedEmpresas ? JSON.parse(savedEmpresas) : [];
  });
  
  // Sincronizar mudanças no estado com o Local Storage
  useEffect(() => {
    localStorage.setItem("empresas", JSON.stringify(empresas));
  }, [empresas]);
  
  useEffect(() => {
    localStorage.setItem("usuarios", JSON.stringify(usuarios));
  }, [usuarios]);
  
  useEffect(() => {
    localStorage.setItem("logado", JSON.stringify(logado));
  }, [logado]);

  useEffect(() => {
    localStorage.setItem("problemas", JSON.stringify(problemas));
  }, [problemas]);
  

  return (
    <infoContext.Provider
      value={{
        solucoes,
        noticias,
        problemas,
        editais,
        rankings,
        empresas,
        equipes,
        usuarios,
        setSolucao,
        setNoticias,
        setProlema,
        setEdital,
        setRanking,
        setEmpresa,
        setEquipe,
        setUser,
        revalidate,
        currentPage,
        setCurrentPage,
        logado,
        setLogado,
      }}
    >
      {children}
    </infoContext.Provider>
  );
}

export function useAppContext() {
  const context = useContext(infoContext);
  if (context === undefined) {
    throw new Error("useAppContext must be used within a InfoWrapper");
  }
  return context;
}
