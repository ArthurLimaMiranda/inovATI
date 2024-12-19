//Footer
"use client";
import React from "react";

export function Footer() {
  {
    /*Exposição de Informações no final da página */
  }
  return (
    <>
      <footer>
        <div className="container mx-auto flex flex-col md:flex-row justify-center gap-x-[15vw] my-[10vh]">
          <div className="mb-6 md:mb-0 flex flex-col items-center md:items-start">
            <h3 className="text-xl mb-6 text-[#1d7982] text-center md:text-left">
              INFORMAÇÕES
            </h3>
            <div className="flex flex-col md:flex-row md:space-x-12">
              <ul className="text-center md:text-left mb-4 md:mb-0">
                <li className="mb-2">
                  <a href="#" className="text-gray-600 hover:text-gray-800">
                    Página Inicial
                  </a>
                </li>
                <li className="mb-2">
                  <a href="#" className="text-gray-600 hover:text-gray-800">
                    Editais Disponíveis
                  </a>
                </li>
                <li className="mb-2">
                  <a href="#" className="text-gray-600 hover:text-gray-800">
                    Sobre
                  </a>
                </li>
              </ul>
              <ul className="text-center md:text-left">
                <li className="mb-2">
                  <a href="#" className="text-gray-600 hover:text-gray-800">
                    Política de Privacidade
                  </a>
                </li>
                <li className="mb-2">
                  <a href="#" className="text-gray-600 hover:text-gray-800">
                    Termos de Uso
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-600 hover:text-gray-800">
                    Política de Cookies
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="pb-4 w-full md:w-[32%] flex flex-col items-center">
            <h3 className="text-xl mb-6 text-[#1d7982] text-center">CONTATO</h3>
            <p className="mb-2 text-center">
              Queremos ouvir de você! Envie suas perguntas, comentários ou
              sugestões.
            </p>
            <p className="mb-4 text-center">
              <strong>Envie sua Mensagem</strong>
            </p>
            <p className="mb-4 text-center">Ou contate-nos por outros meios:</p>
            <p className="mb-4 text-center">
              <a
                href="mailto:Contato@inovAti.upe.br"
                className="text-gray-600 hover:text-gray-800"
              >
                Contato@inovAti.upe.br
              </a>
            </p>
            <div className="flex justify-center space-x-4">
              <a href="#" className="text-gray-600 hover:text-gray-800">
                <i className="fab fa-instagram"></i>
              </a>
              <a href="#" className="text-gray-600 hover:text-gray-800">
                <i className="fab fa-whatsapp"></i>
              </a>
            </div>
          </div>
        </div>
        <div className="p-7 bg-[#088395] w-full"></div>
      </footer>
    </>
  );
}
