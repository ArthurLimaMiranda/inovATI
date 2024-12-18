//Cards para a pré vizualização dos editais, em grid e em row
import React, { useContext, useState } from "react";
import Image from "next/image";
import { VerMais } from "./VerMais";
import { AuthContext } from "@/app/contexts/AuthContext"
import inova from "../../public/images/inova.png";
import ati from "../../public/images/ati.png";

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

export function CardsGrid(props: CardsProps) {;

  return (
    <div className="border rounded-lg shadow-md h-auto flex flex-col">
      <div className="relative border-b px-4 sm:px-8">
        {props.inova ? (
          <Image
            src="/images/inova.png"
            alt="Logo do INOVA"
            className="object-fill w-full"
            width={200}
            height={200}
          />
        ) : (
          <Image
            src="/images/ati.png"
            alt="Logo do ATI"
            className="object-fill w-full"
            width={200}
            height={200}
          />
        )}
      </div>
      <div className="flex flex-col gap-y-2 sm:gap-y-3 items-start py-4 px-4 sm:px-6">
        <p className="text-base sm:text-lg font-semibold text-start w-full">
          {props.titulo.length > 40
            ? `${props.titulo.slice(0, 40)}...`
            : props.titulo}
        </p>
        <p className="text-gray-600 text-md">
          Categoria: {props.categoria}
        </p>
        <p className="text-gray-600 text-md">
          Área: {props.area}
        </p>
        <div className="flex justify-end w-full">
          <VerMais
              logged={props.logged}
              id={props.id}
              area={props.area}
              categoria={props.categoria}
              descricao={props.descricao}
              inova={props.inova}
              proponenteID={props.proponenteID}
              publicAlvo={props.publicAlvo}
              titulo={props.titulo}
              filteredCards={props.filteredCards}
              setFilteredCards={props.setFilteredCards}
            />
        </div>
      </div>
    </div>
  );
}

export function CardsRow(props: CardsProps) {

  return (
    <div className="border rounded-lg shadow-md w-full flex flex-col md:flex-row">
      <div className="relative border-b md:border-r px-5 py-4 md:w-[30%] flex items-center justify-center">
        {props.inova ? (
          <Image
            src="/images/inova.png"
            alt="Logo do INOVA"
            width={300}
            height={200}
          />
        ) : (
          <Image
            src="/images/ati.png"
            alt="Logo do ATI"
            width={300}
            height={200}
          />
        )}
      </div>
      <div className="flex flex-col w-full items-center gap-y-6 py-3 px-6">
        <div className="flex flex-row justify-between w-full items-center gap-x-10">
          <h3 className="text-xl font-semibold h-[5vh]">
            {props.titulo.length > 70
              ? `${props.titulo.slice(0, 70)}...`
              : props.titulo}
          </h3>

        </div>
        <div className="flex flex-col md:flex-row items-center w-full justify-between">
          <p className="text-gray-600">Categoria: {props.categoria}</p>
          <p className="text-gray-600">Área: {props.area}</p>
          <VerMais
            logged={props.logged}
            id={props.id}
            area={props.area}
            categoria={props.categoria}
            descricao={props.descricao}
            inova={props.inova}
            proponenteID={props.proponenteID}
            publicAlvo={props.publicAlvo}
            titulo={props.titulo}
            filteredCards={props.filteredCards}
            setFilteredCards={props.setFilteredCards}
          />
        </div>
      </div>
    </div>
  );
}
