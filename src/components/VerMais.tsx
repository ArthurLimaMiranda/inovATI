//Exibe as informações do Edital, para vizualização ou edição, junto com seu botão de download
import React, { useEffect, useState } from "react";
import inova from "../../public/images/inova.png";
import ati from "../../public/images/ati.png";
import Image from "next/image";
import { FaFileDownload } from "react-icons/fa";
import { AiFillEdit } from "react-icons/ai";

interface Card {
  id: number;
  titulo: string;
  descricao: string;
  proponenteID: number | null; // Altere para permitir null
  categoria: string;
  publicAlvo: string;
  area: string;
  inova: boolean;
  status: boolean;
  aprovado:boolean
}

interface CardsProps {
  id: number;
    titulo: string;
    categoria: string;
    area: string;
    descricao: string;
    publicAlvo: string;
    inova: boolean;
    proponenteID: number | null;
    logged: boolean;
    filteredCards: Card[];
    setFilteredCards: Function;
}

export function VerMais(props: CardsProps) { {/*Modal Ver Mais com informações dos editais */}
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    //Bloqueia o scroll pela página quando o modal está aberto
    if (showModal) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }
    return () => {
      document.body.classList.remove("overflow-hidden");
    };
  }, [showModal]);


  function resetModal() {
    //Reseta as informações dos campos importantes para preparar a vizualização do novo edital
    setShowModal(true);
  }


  return (
    <>
      
      <button
        onClick={() => resetModal()}
        className="flex justify-center gap-x-3 leading-none border-none outline-none rounded-xl bg-[#088395] px-8 py-2 text-lg text-white items-center cursor-pointer hover:shadow-button-Home-hover-focus focus:shadow-button-Home-hover-focus"
      >
        Ver mais
      </button>
      

      {showModal ? ( //Verifica condições de "editar" e "só visualização"
        <>
          <div className="flex items-center justify-center min-h-screen overflow-x-hidden overflow-y-auto fixed inset-0 z-50">
            <div
              className={`bg-gray-1000 shadow-lg shadow-gray-500 rounded-2xl w-full md:w-[60vw] min-h-[65vh]  max-h-[75vh]`}
            >
              <div className="flex bg-white flex-col px-4 md:px-10 gap-6 md:gap-8 rounded-xl w-full h-full overflow-y-scroll">
                <div
                  className={`flex flex-col w-full justify-center px-4 md:px-6 pt-5 rounded-lg gap-y-5`}
                >
                  <div className="flex justify-center items-center">
                    {props.inova === true ? (
                      <Image
                        src={inova}
                        alt="Inova"
                        width={300}
                        height={200}
                      />
                    ) : (
                      <Image
                        src={ati}
                        alt="ATI"
                        width={300}
                        height={200}
                      />
                    )}
                  </div>

                  <div className="flex text-center flex-col md:flex-row justify-between w-full">
                    <p className="font-bold text-2xl">{props.titulo}</p>
                  </div>

                  <div className="flex flex-row justify-between mt-5 border w-[100%] items-center p-5 rounded-2xl">
                    <div className="gap-x-2 gap-y-2 md:gap-x-10 w-[50%] flex flex-col">
                      <div className="flex">
                        <p className="font-semibold">Disponibilizado por:</p>
                        <p className="ml-1">
                          {props.inova === true ? "INOVA" : "ATI"}
                        </p>
                      </div>

                      <div className="flex gap-x-2 items-center">
                        <p className="font-semibold">Área: </p> 
                        <p className="ml-1">{props.area}</p>
                      </div>

                      <div className="flex gap-x-2 items-center">
                        <p className="font-semibold">Categoria:</p>
                        <p className="ml-1">props.categoria</p>
                      </div>
                      <div className="flex gap-x-2 items-center">
                        <p className="font-semibold">Público Alvo:</p>
                        <p className="ml-1">{props.publicAlvo}</p>
                      </div>
                    </div>

                    <div className="flex flex-col justify-start w-[50%] ">
                      <p className="font-semibold">Descrição</p>
                      <p className="text-gray-600 mt-4 border rounded-xl p-5 max-h-40 overflow-y-scroll">{props.descricao}</p>
                    </div>

                  </div>

                  <div className="w-full pb-10 flex flex-col md:flex-row items-center justify-between font-semibold gap-y-4 md:gap-y-0">
                    <button
                      onClick={() => {
                        setShowModal(false);
                      }}
                      className="flex items-center px-3 py-2 rounded-md text-black text-semibold cursor-pointer border border-[#088395] hover:opacity-60"
                    >
                      Voltar
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : null}
    </>
  );
}
