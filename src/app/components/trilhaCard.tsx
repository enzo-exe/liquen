import Image from "next/image";
import Link from "next/link";
import ConexaoBD from "../libs/conexao-bd";
import { redirect } from "next/navigation";
import { Star } from "lucide-react";

const bd : string = 'trilhas-db.json';

export interface TrilhaProps{
    id: string,
    nome: string,
    img: string,
    descricao: string
}

export default function Trilha(props: TrilhaProps)
{

    const deleteTrilha = async () => {
        'use server';
        const trilha = await ConexaoBD.retornaBD(bd);

        const trilhaToRemove =  trilha.findIndex((p) => p.id === props.id);

        trilha.splice(trilhaToRemove,1);

        await ConexaoBD.armazenaBD(bd, trilha);

        redirect('/Home');
        
    }

    return(
         
    <div className="max-w-sm w-full bg-amber-100 rounded-2xl overflow-hidden text-black shadow-lg hover:shadow-xl transition">
      <div className="relative">
        <Image
          src={props.img}
          alt={`Imagem da trilha ${props.nome}`}
          width={400}
          height={250}
          className="w-full h-48 object-cover"
        />

        <div className="absolute top-2 right-2">
          {/* Favorito (ícone de coração, opcional) */}
          <button className="text-white bg-black bg-opacity-40 p-1 rounded-full hover:bg-opacity-70">
            ❤️
          </button>
        </div>
      </div>

      <div className="p-4">
        <h2 className="text-lg font-semibold leading-tight mb-1">{props.nome}</h2>
        <p className="text-sm text-gray-600 mb-2 line-clamp-2">{props.descricao}</p>

        <div className="flex justify-between items-center gap-2">
          <Link href={`/Home/edit/${props.id}`} id="btn-edit" className="text-sm text-blue-400 hover:underline">
            Editar
          </Link>

          <form action={deleteTrilha}>
            <button type="submit" id="btn-delete" className="text-sm text-red-500 hover:underline">
              Deletar
            </button>
          </form>
        </div>
      </div>
    </div>

    );

}