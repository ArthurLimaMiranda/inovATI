'use client'
import { User, Logado } from "../../../typings";
import { useAppContext } from "@/app/contexts/InfoContext"
import { createContext, useEffect, useState } from "react";
import { parseCookies, setCookie } from 'nookies'
import decode from "jwt-decode";
import { useRouter } from "next/navigation";

type AuthContextType = {
  isAuthenticated: boolean,
  user: User,
  signIn: (data: signInData) => Promise<void>

}

type signInData = {
  email: string,
  senha: string
}

const jwt = require('jsonwebtoken');

const secret = '139278d6e53435c6e598475318d70d7b45d64f990f225f94fb81080a1bffeff579f004d3d5477e270c92af5355ddc186d28e1dbd1c090b092c23a27b82a08bc5';

export const AuthContext = createContext({} as AuthContextType)

export function AuthProvider({ children }: { children: React.ReactNode }){

  const [user, setUser] = useState<User | null>(null)
  
  const {
    usuarios,
    logado,
    setLogado
  } = useAppContext()

  const router = useRouter()

  const isAuthenticated = !!logado.isLogado;

  useEffect(() => {
    if (logado.isLogado) {
      router.push('/search');
    }

    else if (!logado.isLogado) {
      router.push('/');
    }
  }, [logado.isLogado]);
  

  async function signIn(data: signInData): Promise<void> {
    return new Promise((resolve, reject) => {
      const foundUser = usuarios.find((u) => u.email === data.email);
  
      if (foundUser && foundUser.verified && foundUser.senha === data.senha) {
        setLogado({ isLogado: true, id: foundUser.id });
        jwt.sign(
          { id: foundUser.id, login: foundUser.login, nome: foundUser.nome, tipo: foundUser.tipo },
          secret,
          { expiresIn: '3h', algorithm: 'HS256' },
          (err: any, token: any) => {
            if (err) {
              console.error('JWT sign error:', err);
              reject(new Error('Erro ao gerar token'));
              return;
            }
            if (token) {
              setCookie(undefined, 'inovATI.token', token, {
                maxAge: 60 * 60 * 3,
                path: '/',
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'lax',
              });
              router.push('/search');
              resolve();
            }
          }
        );
      } else {
        reject(new Error("Usuário não encontrado ou credenciais inválidas."));
      }
    });
  }
  


  return (
    <AuthContext.Provider value={{
      user: user || { id: 0, login: "", descricao:'', documentacao:[], email:'', nome:'', empresaVinculo:'', senha: '', tipo:'', verified:false, equipeNome:'',inovaEquipe:false, membroEquipe:false,salaDeAulaEquipe:false},
      isAuthenticated,
      signIn
    }}>
      {children}
    </AuthContext.Provider>
  );
}
