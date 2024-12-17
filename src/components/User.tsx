//Usuario do sistema
import { LuUser2 } from "react-icons/lu";
import { MdOutlineDeleteOutline } from "react-icons/md";

interface PhoneProps{
  id: number, 
  login: string, 
  nome: string, 
  idPerfil: number
  onDelete: () => void;
}

export function User(props:PhoneProps){

  return(
      <>
      <div className="border border-[#071952] border-3 rounded-2xl flex justify-between items-center p-5 bg-[#37B7C3] bg-opacity-20">
        <div className='text-left gap-y-3 flex flex-col'>
          <h1 className='flex flex-row items-center gap-x-2 text-xl font-semibold'> <LuUser2 /> {props.nome}</h1>
          <p>{props.login} - {props.idPerfil==1?('User'):('Admin')}</p>
        </div>
        <div className='flex flex-col gap-y-2 pr-5'>

          <div></div>

          <button title='Apagar usuário' className='text-xl bg-red-500 p-2 rounded-full hover:opacity-70' onClick={()=>props.onDelete()}><MdOutlineDeleteOutline/></button>

        </div>
      </div>
      </>
  )
}