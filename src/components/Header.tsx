//Header para navegação dentro e fora da área logada
"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { AiOutlineDashboard } from "react-icons/ai";
import { FaBars, FaRegEye } from "react-icons/fa6";
import { IoEnterOutline } from "react-icons/io5";
import { parseCookies, destroyCookie } from "nookies";
import { IoIosHome } from "react-icons/io";
import { FaSearch, FaTimes } from "react-icons/fa";
import { useAppContext } from "@/app/contexts/InfoContext";

interface HeaderOutProps {
  fix: boolean;
}

interface HeaderInProps {
  adm: boolean;
  setPage: Function;
  curPage: string;
}

export function HeaderOut(props: HeaderOutProps) { //header não logado
  const [menuOpen, setMenuOpen] = useState(false);

  const {
    setLogado,
    logado
  } = useAppContext()

  const handleLogout = async () => {
    await fetch("/api/auth/logout");
    destroyCookie(null, "inovATI.token");
    setLogado({id:null,isLogado:false})
  };

  return (
    <div
      className={`${props.fix ? "fixed bg-[#088395] bg-opacity-60" : "absolute"} flex justify-center w-full text-white font-semibold text-xl py-3 bg-opacity-90 top-0 z-40`}
    >
      <div className="container h-full px-8 lg:px-0">
        <div className="flex items-center h-full justify-between">
          <Link href="/">
            <p className="flex flex-row items-center gap-x-2">
              inovATI <FaRegEye />
            </p>
          </Link>
          <div className="lg:hidden">
            <button
              className="text-white focus:outline-none"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              {menuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
            </button>
          </div>
          <ul
            className={`lg:flex gap-x-6 items-center justify-center ${
              menuOpen ? "flex" : "hidden"
            } flex-col lg:flex-row absolute lg:relative top-16 lg:top-0 left-0 w-full lg:w-auto bg-[#088395] lg:bg-transparent lg:opacity-100 opacity-90`}
          >
            <li className="w-full lg:w-auto">
              <Link href="/">
                <p className="py-3 lg:py-0 text-center lg:text-left">Início</p>
              </Link>
            </li>
            <li className="w-full lg:w-auto">
              <Link href="/search">
                <p className="py-3 lg:py-0 text-center lg:text-left">Noticias</p>
              </Link>
            </li>
            <li className="w-full lg:w-auto">
              <Link href="/ranking">
                <p className="py-3 lg:py-0 text-center lg:text-left">Ranking</p>
              </Link>
            </li>
            <li className="w-full lg:w-auto">
              <Link href="/#sobre">
                <p className="py-3 lg:py-0 text-center lg:text-left">Sobre</p>
              </Link>
            </li>
            {logado.isLogado&&<li>
                <Link
                href="/api/auth/logout"
                onClick={handleLogout}
              >
                <button className="font-normal border lg:hidden border-white rounded-xl flex flex-row items-center gap-x-2 py-1 px-3 hover:opacity-60 hover:bg-gray-100">
                  <IoEnterOutline /> Sair
                </button>
              </Link>
            </li>
              }
          </ul>
          <div className="flex items-center gap-x-5">
            {!logado.isLogado ? (
              <Link href="/login">
                <button className="font-normal border border-white rounded-xl flex flex-row items-center gap-x-2 py-1 px-3 hover:opacity-60 hover:bg-gray-100">
                  <IoEnterOutline /> Login
                </button>
              </Link>
            ) : (
              <>
                <Link
                  className="font-normal border border-white rounded-xl flex flex-row items-center gap-x-2 py-1 px-3 hover:opacity-60 hover:bg-gray-100"
                  href="/dashboard"
                >
                  <AiOutlineDashboard /> Dashboard
                </Link>
                <Link
                  href="/api/auth/logout"
                  onClick={handleLogout}
                >
                  <button className="font-normal border border-white rounded-xl hidden lg:flex flex-row items-center gap-x-2 py-1 px-3 hover:opacity-60 hover:bg-gray-100">
                    <IoEnterOutline /> Sair
                  </button>
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export function HeaderIn(props: HeaderInProps) { //Header logado
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  const {
    setLogado,
  } = useAppContext()

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLogout = async () => {
    await fetch("/api/auth/logout");
    destroyCookie(null, "inovATI.token");
    setLogado({id:null,isLogado:false})
    window.location.reload(); // Reload the page to ensure the state is updated
  };

  return (
    <div
      className={`flex justify-center w-full bg-[#E9EDF0] py-3 bg-opacity-90 fixed top-0 z-40`}
      style={{
        boxShadow: "5px 5px 5px rgba(0, 0, 0, 0.2)",
        transition: "opacity 0.3s ease-in-out",
      }}
    >
      <div className="container h-full px-8 lg:px-0">
        <div className="flex items-center h-full justify-between">
          <Link href="/">
            <p className="flex flex-row items-center gap-x-2">
              InovATI <FaRegEye />
            </p>
          </Link>
          <ul className={`hidden lg:flex gap-x-6 items-center justify-center`}>
            <li>
              <button onClick={() => props.setPage("editais")}>
                <p
                  className={`${props.curPage == "editais" && "underline underline-offset-4 font-semibold"} hover:opacity-50`}
                >
                  Submissões
                </p>
              </button>
            </li>
            <li className={`${!props.adm && "hidden"}`}>
              <button onClick={() => props.setPage("users")}>
                <p
                  className={`${props.curPage == "users" && "underline underline-offset-4 font-semibold"} hover:opacity-50`}
                >
                  Usuários
                </p>
              </button>
            </li>
            <li>
              <button onClick={() => props.setPage("empresas")}>
                <p
                  className={`${props.curPage == "empresas" && "underline underline-offset-4 font-semibold"} hover:opacity-50`}
                >
                  Empresas
                </p>
              </button>
            </li>
          </ul>
          <div className="flex flex-row justify-end gap-x-5 items-center">
            <div className="lg:hidden">
              <button onClick={toggleMenu} className="text-2xl">
                {isMenuOpen ? <FaTimes /> : <FaBars />}
              </button>
            </div>
            <Link href={`/`}>
              <button className="hidden lg:flex font-normal border border-white rounded-xl flex-row items-center gap-x-2 py-1 px-3 hover:opacity-60 hover:bg-gray-100">
                <IoIosHome /> Inicio
              </button>
            </Link>
            <Link href={`/search`}>
              <button className="hidden lg:flex font-normal border border-white rounded-xl flex-row items-center gap-x-2 py-1 px-3 hover:opacity-60 hover:bg-gray-100">
                <FaSearch /> Problemas
              </button>
            </Link>
            <button onClick={handleLogout} className="hidden lg:flex font-normal border border-white rounded-xl flex-row items-center gap-x-2 py-1 px-3 hover:opacity-60 hover:bg-gray-100">
              <IoEnterOutline /> Sair
            </button>
          </div>
        </div>
        {isMenuOpen && (
          <div className="lg:hidden mt-2">
            <ul className="flex flex-col gap-y-4 items-center justify-center">
              <li>
                <button
                  onClick={() => {
                    props.setPage("editais");
                    toggleMenu();
                  }}
                >
                  <p
                    className={`${props.curPage == "editais" && "underline underline-offset-4 font-semibold"} hover:opacity-50`}
                  >
                    Favoritos
                  </p>
                </button>
              </li>
              <li className={`${!props.adm && "hidden"}`}>
                <button
                  onClick={() => {
                    props.setPage("users");
                    toggleMenu();
                  }}
                >
                  <p
                    className={`${props.curPage == "users" && "underline underline-offset-4 font-semibold"} hover:opacity-50`}
                  >
                    Usuários
                  </p>
                </button>
              </li>
              <li>
                <Link href={`/`}>
                  <button
                    onClick={toggleMenu}
                    className="font-normal border border-white rounded-xl flex flex-row items-center gap-x-2 py-1 px-3 hover:opacity-60 hover:bg-gray-100"
                  >
                    <IoIosHome /> Inicio
                  </button>
                </Link>
              </li>
              <li>
                <Link href={`/search`}>
                  <button
                    onClick={toggleMenu}
                    className="font-normal border border-white rounded-xl flex flex-row items-center gap-x-2 py-1 px-3 hover:opacity-60 hover:bg-gray-100"
                  >
                    <FaSearch /> Problemas
                  </button>
                </Link>
              </li>
              <li>
                <button
                  onClick={()=>{toggleMenu(); handleLogout()}}
                  className="font-normal border border-white rounded-xl flex flex-row items-center gap-x-2 py-1 px-3 hover:opacity-60 hover:bg-gray-100"
                >
                  <IoEnterOutline /> Sair
                </button>
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
