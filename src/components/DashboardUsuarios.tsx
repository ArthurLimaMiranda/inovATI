//Mostra ao adm o CRUD de usuários
"use client";
import { useEffect, useState } from "react";
import { NovoUsuario } from "./NovoUsuario";
import { User } from "./User";
import { deleteUser, getUsers } from "@/lib/api";

interface NameCheck{
  loggedUser : string
}


export function DashboardUsuarios(props: NameCheck) { //Dash exclusivo do admin com acesso aos usuários cadastrados
  const [user, setUser] = useState<
    { id: number; login: string; nome: string; idPerfil: number }[]
  >([]);
  const [newUser, setNewUser] = useState(false);

  interface User {
    id: number;
    login: string;
    nome: string;
    idPerfil: number;
  }

  function handleDeleteUser(id: number, login: string) {
    if (confirm(`Deseja apagar o usuário: "${login}"?`) == true) {
      deleteUser(id);
      const updatedUser = user.filter((us) => us.id !== id);
      setUser(updatedUser);
      alert("Usuário remodivo!");
    }
  }

  useEffect(() => {
    getUsers().then((result) => {
      console.log(result);
      const newUsers = result
        .filter((user: User) => user.login !== "Bot" && user.login !== "bot" && user.login !== props.loggedUser)
        .map((user: User) => ({
          id: user.id,
          nome: user.nome,
          login: user.login,
          idPerfil: user.idPerfil,
        }));
      setUser(newUsers);
    });
  }, [newUser]);

  return (
    <div className="px-4 sm:px-6 md:px-7 py-6 rounded-xl w-full h-full">
      <div className="w-full grid grid-cols-1 sm:grid-cols-3 items-center border-b mb-6 pb-5">
        <div />
        <p className="text-lg sm:text-xl text-center font-semibold">
          Usuários Cadastrados
        </p>
        <div className="flex justify-center">
          <NovoUsuario setNewUser={setNewUser} newUser={newUser} />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-6 overflow-auto max-h-[80vh]">
        {user.map((us) => (
          <User
            key={us.id}
            onDelete={() => handleDeleteUser(us.id, us.login)}
            id={us.id}
            nome={us.nome}
            login={us.login}
            idPerfil={us.idPerfil}
          />
        ))}
      </div>
    </div>
  );
}
