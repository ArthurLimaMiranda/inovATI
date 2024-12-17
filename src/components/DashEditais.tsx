//Tela inicial do projeto
"use client";
import React, { useEffect, useState } from "react";
import { RiSearchEyeLine } from "react-icons/ri";
import { HeaderOut } from "./Header";
import Image from "next/image";
import Link from "next/link";

import portoGalinhas from "../../public/images/portoGalinhas.jpg";
import recAntigo1 from "../../public/images/recAntigo2.png";
import rec1 from "../../public/images/rec1.jpg";
import rec2 from "../../public/images/rec2.jpg";
import rec3 from "../../public/images/rec3.jpg";
import rec4 from "../../public/images/rec4.jpg";
import facepe from "../../public/images/facepe_img.jpg";
import finep from "../../public/images/finep_img.jpg";

import poli from "../../public/images/poli.png";
import { Footer } from "./Footer";

export function DashEditais() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const images = [rec4, rec3, portoGalinhas, rec2, recAntigo1, rec1];

  useEffect(() => {
    //Alterna as imagens mostradas no começo da página a cada 3 segundos
    const intervalId = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === images.length - 1 ? 0 : prevIndex + 1
      );
    }, 3000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <>
      <div className="min-h-screen">
        <HeaderOut fix={false} />
        <div className="w-full mb-20 md:mb-32 lg:mb-44">
          <section className="relative flex flex-col items-center min-h-[300px] md:min-h-[350px] lg:min-h-[400px]">
            <div className="flex flex-row w-full justify-end absolute">
              {images.map((image, index) => (
                <div
                  key={index}
                  className="justify-center flex h-[60vh] md:h-[70vh] lg:h-[80vh] w-full overflow-hidden relative"
                  style={
                    index === currentIndex
                      ? {
                          transition: "opacity 1s ease-in-out",
                          position: "absolute",
                          opacity: "1",
                        }
                      : {
                          transition: "opacity 1s ease-in-out",
                          position: "absolute",
                          opacity: "0",
                        }
                  }
                >
                  <Image
                    src={image}
                    alt=""
                    objectFit="cover"
                    className="w-full h-full absolute opacity-40"
                  />
                </div>
              ))}
            </div>
            <div className="w-full h-[60vh] md:h-[70vh] lg:h-[80vh] bg-[#088395]" />
            <div className="absolute top-0 left-0 w-full h-full flex flex-col items-center justify-center gap-y-4 px-4 md:px-8 lg:px-12">
              <p className="text-white text-lg md:text-2xl lg:text-3xl  font-semibold text-center">
                Encontre os editais ideais para você em um só lugar
              </p>
              <p className="text-white text-base md:text-lg lg:text-xl text-center  font-semibold">
                Acesse as principais oportunidades de apoio à pesquisa
                oferecidas por instituições de referência
              </p>
              <Link
                href="/search"
                className="flex justify-center leading-none border-none outline-none rounded-xl bg-[#088395] px-4 py-2 md:px-6 md:py-3 text-white font-semibold text-base md:text-lg cursor-pointer mb-4 hover:shadow-button-Home-hover-focus focus:shadow-button-Home-hover-focus items-center flex-row gap-x-3"
              >
                <p>Comece agora a explorar os editais</p>
                <RiSearchEyeLine />
              </Link>
            </div>
            <div className="absolute bottom-0 left-0 w-full overflow-hidden">
              <svg
                data-name="Layer 1"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 1200 120"
                preserveAspectRatio="none"
                style={{ transform: "scaleY(-1)" }}
              >
                <path
                  d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"
                  className="relative block h-[300px] md:h-[400px] lg:h-[600px] fill-white"
                ></path>
              </svg>
            </div>
          </section>
        </div>

        <section id="sobre" className="pt-12 lg:py-16">
          <div className="container mx-auto">
            <h2 className="text-[#1d7982] text-4xl lg:text-5xl font-bold mb-10 text-center">
              Sobre as Instituições
            </h2>

            {/* Bloco sobre a FACEPE */}
            <div className="flex flex-col lg:flex-row items-center justify-center lg:justify-between p-6 lg:p-10 rounded-lg mb-10 lg:mb-16 bg-white shadow-lg">
              <div className="lg:w-1/2 text-center lg:text-left lg:pr-10 order-2 lg:order-1">
                <h3 className="text-[#3ecad7] text-3xl lg:text-4xl mb-6 font-bold py-3 rounded-lg">
                  FACEPE
                </h3>
                <p className="text-gray-700 text-lg lg:text-xl">
                  A Fundação de Amparo à Ciência e Tecnologia de Pernambuco
                  (FACEPE) é uma instituição que promove o desenvolvimento
                  científico e tecnológico do estado. Apoia pesquisas em
                  diversas áreas do conhecimento, incentivando a produção de
                  conhecimento e a inovação. Suas iniciativas incluem programas
                  de fomento à pesquisa, bolsas de estudo e cooperações
                  internacionais.
                </p>
              </div>
              <div className="lg:w-1/2 mb-6 lg:mb-0 order-1 lg:order-2">
                <Image
                  src={facepe}
                  alt="FACEPE"
                  className="w-full h-auto rounded-lg"
                />
              </div>
            </div>

            {/* Bloco sobre o FINEP */}
            <div className="flex flex-col lg:flex-row items-center justify-center lg:justify-between p-6 lg:p-10 rounded-lg bg-white shadow-lg">
              <div className="lg:w-1/2 mt-6 lg:mb-0 order-2 lg:order-1">
                <Image
                  src={finep}
                  alt="FINEP"
                  className="w-full h-auto rounded-lg"
                />
              </div>
              <div className="lg:w-1/2 text-center lg:text-left lg:pl-10 order-1 lg:order-2">
                <h3 className="text-[#3ecad7] text-3xl lg:text-4xl mb-6 font-bold py-3 rounded-lg">
                  FINEP
                </h3>
                <p className="text-gray-700 text-lg lg:text-xl">
                  A Financiadora de Estudos e Projetos (FINEP) é uma empresa
                  pública brasileira vinculada ao Ministério da Ciência,
                  Tecnologia e Inovações (MCTI). A FINEP apoia a inovação e a
                  pesquisa científica e tecnológica em empresas, universidades,
                  institutos tecnológicos e outras entidades. Suas iniciativas
                  incluem financiamento de projetos, concessão de bolsas e
                  investimentos em infraestrutura de pesquisa.
                </p>
              </div>
            </div>
          </div>
        </section>

        <div className="w-full mt-20">
          <section className="relative flex flex-col items-center min-h-[400px]">
            <div className="absolute top-0 left-0 w-full overflow-hidden z-10">
              <svg
                data-name="Layer 1"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 1200 120"
                preserveAspectRatio="none"
                style={{
                  width: "calc(100% + 1.3px)",
                  transform: "scaleX(-1) scaleY(-1)",
                }}
              >
                <path
                  d="M985.66,92.83C906.67,72,823.78,31,743.84,14.19c-82.26-17.34-168.06-16.33-250.45.39-57.84,11.73-114,31.07-172,41.86A600.21,600.21,0,0,1,0,27.35V120H1200V95.8C1132.19,118.92,1055.71,111.31,985.66,92.83Z"
                  className="relative block h-[67px] fill-white"
                ></path>
              </svg>
            </div>

            <div className="relative w-full h-[60vh]">
              <div className="w-full h-full bg-[#088395] absolute opacity-80" />
              <Image
                src={poli}
                alt="ImagemTuristica"
                objectFit="fit"
                className="w-full h-full"
              />
            </div>

            <div className="absolute bottom-0 left-0 w-full overflow-hidden">
              <svg
                data-name="Layer 1"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 1200 120"
                preserveAspectRatio="none"
                style={{ transform: "scaleX(-1) scaleY(-1)" }}
              >
                <path
                  d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"
                  className="relative block h-[600px] fill-white"
                ></path>
              </svg>
            </div>
          </section>

          <Footer />
        </div>
      </div>
    </>
  );
}
