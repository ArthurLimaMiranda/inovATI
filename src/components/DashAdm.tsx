"use client"
import { HeaderIn } from "./Header";
import { useState } from "react";
import React from 'react';;
import { COLORS } from '../../src/lib/AppStyles'
import { DashboardUsuarios } from "./DashboardUsuarios";
import { DashboardEquipes } from "./DashboardEquipes" ;

import { useAppContext } from "@/app/contexts/InfoContext";
import { DashboardEmpresas } from "./DashboardEmpresas";
import { DashSubmissoes } from "./DashSubmissoes";

export function DashAdm() {

  const {
    logado,
    usuarios
  } = useAppContext()

  const foundUser = usuarios.find((u) => u.id === logado.id);

  const [currentPage, setCurrentPage] = useState("editais");

  return (

    <>
      <HeaderIn adm={(foundUser?.tipo == 'admGeral') || (foundUser?.tipo == 'admATI')} setPage={setCurrentPage} curPage={currentPage} />
      {(currentPage == "editais") && (<DashSubmissoes />)}
      {(currentPage == "users") && (
        <div className={`bg-[${COLORS.bgDark}] h-[100vh] py-24`}>
          <div className={`h-full flex flex-row ${currentPage == "users" ? ('w-full justify-center') : ('mx-11 justify-between gap-x-10')}`}>
            <div
              className={`rounded-xl ${currentPage == "users" ? ('w-[80%] justify-center') : ('w-[25%]')} flex flex-col items-center`}
              style={{ boxShadow: '5px 5px 5px rgba(0, 0, 0, 0.4), -5px -5px 5px rgba(255, 255, 255, 0.5)', transition: 'opacity 0.3s ease-in-out', }}>
              <DashboardUsuarios />
            </div>
          </div>
        </div>
      )}

      {(currentPage == "equipes") && (
        <div className={`bg-[${COLORS.bgDark}] h-[100vh] py-24`}>
          <div className={`h-full flex flex-row ${currentPage == "equipes" ? ('w-full justify-center') : ('mx-11 justify-between gap-x-10')}`}>
            <div
              className={`rounded-xl ${currentPage == "equipes" ? ('w-[80%] justify-center') : ('w-[25%]')} flex flex-col items-center`}
              style={{ boxShadow: '5px 5px 5px rgba(0, 0, 0, 0.4), -5px -5px 5px rgba(255, 255, 255, 0.5)', transition: 'opacity 0.3s ease-in-out', }}>
              <DashboardEquipes />
            </div>
          </div>
        </div>
      )}

      {(currentPage == "empresas") && (
        <div className={`bg-[${COLORS.bgDark}] h-[100vh] py-24`}>
          <div className={`h-full flex flex-row ${currentPage == "empresas" ? ('w-full justify-center') : ('mx-11 justify-between gap-x-10')}`}>
            <div
              className={`rounded-xl ${currentPage == "empresas" ? ('w-[80%] justify-center') : ('w-[25%]')} flex flex-col items-center`}
              style={{ boxShadow: '5px 5px 5px rgba(0, 0, 0, 0.4), -5px -5px 5px rgba(255, 255, 255, 0.5)', transition: 'opacity 0.3s ease-in-out', }}>
              <DashboardEmpresas />
            </div>
          </div>
        </div>
      )}
    </>

  )
}