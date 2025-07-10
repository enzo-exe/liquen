
import ConexaoBD from "@/app/libs/conexao-bd";
import { TrilhaProps } from "@/app/components/trilhaCard";
import { redirect } from "next/navigation";
import { isSessionValid } from "@/app/libs/auth";

const arquivo = 'trilhas-db.json';

export default function CreateTrilha() {
    const sessionValida = isSessionValid();

    if (!sessionValida) {
        redirect('/Login'); // redireciona se o token for inválido ou não existir
    }

    const addTrilha = async (formData: FormData) => {
        "use server";

        const novaTrilha: TrilhaProps = {
            id: crypto.randomUUID(),
            nome: formData.get('nome') as string,
            descricao: formData.get('descricao') as string,
            img: formData.get('img') as string
        }

        const trilhaDb = await ConexaoBD.retornaBD(arquivo);
        trilhaDb.push(novaTrilha);
        await ConexaoBD.armazenaBD(arquivo, trilhaDb);
        redirect('/Home');
    }


    return (
        <section className="min-h-[90%] flex items-center justify-center bg-gray-900 px-4 py-12">
            <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
                    Inserir Nova Trilha
                </h2>

                <form action={addTrilha} className="space-y-5">
             
                    <div>
                        <label htmlFor="nome" className="block text-sm font-semibold text-gray-700 mb-1">
                            Nome da Trilha
                        </label>
                        <input
                            type="text"
                            id="nome"
                            name="nome"
                            placeholder="Ex: Pico do..."
                            aria-label="nome do pico"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <div>
                        <label htmlFor="descricao" className="block text-sm font-semibold text-gray-700 mb-1">
                            Descrição
                        </label>
                        <input
                            type="text"
                            id="descricao"
                            name="descricao"
                            placeholder="Ex: dificuldade, tempo..."
                            aria-label="Descrição da trilha"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <div>
                        <label htmlFor="img" className="block text-sm font-semibold text-gray-700 mb-1">
                            Link da Imagem
                        </label>
                        <input
                            type="text"
                            id="img"
                            name="img"
                            placeholder="Ex: https://linkdaimagem.jpg"
                            aria-label="Link da Imagem"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-green-600 text-white font-semibold py-2 rounded-lg hover:bg-green-900 transition"
                    >
                        Adicionar
                    </button>
                </form>
            </div>
        </section>
    );

}