import Link from "next/link";
import ConexaoBD from "../libs/conexao-bd";
import Trilha from "../components/trilhaCard";
import { isSessionValid } from "../libs/auth";
import { redirect } from "next/navigation";

const bd: string = 'trilhas-db.json';

export default async function Dashboard() {
    const sessionValida = await isSessionValid();

    if (!sessionValida) {
        redirect('/Login'); // redireciona se o token for inválido ou não existir
    }

    const dados = await ConexaoBD.retornaBD(bd);
    const trilhas = dados.map((trilha) => {
        return <Trilha {...trilha} key={trilha.id} />
    });

    return (
        <div className="px-4 py-6 bg-gray-200 max-w-7xl mx-auto">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold text-gray-1000">Minhas Trilhas</h1>
                <Link
                    href="/Home/create"
                    className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-900 transition"
                >
                    + Adicionar
                </Link>
            </div>

            <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                {trilhas}
            </div>
        </div>

    )
}