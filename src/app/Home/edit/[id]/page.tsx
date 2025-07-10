
import ConexaoBD from "@/app/libs/conexao-bd";
import { TrilhaProps } from "@/app/components/trilhaCard";
import Image from "next/image";
import { redirect } from "next/navigation";
import { isSessionValid } from "@/app/libs/auth";

const arquivo = "trilhas-db.json";

interface EditTrilhaProps {
    params: { id: string };
}

export default async function EditTrlha({ params }: EditTrilhaProps) {
    const sessionValida = isSessionValid();

    if (!sessionValida) {
        redirect('/Login'); // redireciona se o token for inválido ou não existir
    }

    const { id } = params;

    const trilhaDB = await ConexaoBD.retornaBD(arquivo);

    const trilhaToEdit: TrilhaProps = trilhaDB.find((p: TrilhaProps) => p.id === id);
    const trilhaToEditIndex: number = trilhaDB.findIndex((p) => p.id === id);

    const updateTrilha = async (formData: FormData) => {
        "use server";

        const updatedTrilha: TrilhaProps = {
            id,
            nome: formData.get("nome") as string,
            descricao: formData.get("descricao") as string,
            img: formData.get("img") as string
        };

        trilhaDB.splice(trilhaToEditIndex, 1, updatedTrilha);

        await ConexaoBD.armazenaBD(arquivo, trilhaDB);

        redirect("/Home");
    };

    return (
        <section className="min-h-[90%] flex items-center justify-center bg-gray-900 px-4 py-12">
        <div className="max-w-md mx-auto mt-10 bg-white p-6 rounded-2xl shadow-lg border">
            <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">
                Editando: {trilhaToEdit.nome}
            </h2>
            <form action={updateTrilha} className="space-y-4">
                <div className="flex justify-center">
                    <Image
                        src={trilhaToEdit.img}
                        alt={trilhaToEdit.nome}
                        width={120}
                        height={120}
                        className="rounded-xl shadow-md"
                    />
                </div>

                <input
                    type="text"
                    id="nome"
                    name="nome"
                    placeholder="Nome da Trilha"
                    defaultValue={trilhaToEdit.nome}
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                />

                <input
                    type="text"
                    id="descricao"
                    name="descricao"
                    placeholder="Descrição da Trilha"
                    defaultValue={trilhaToEdit.descricao}
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                />

                <input
                    type="text"
                    id="img"
                    name="img"
                    placeholder="Link da imagem"
                    defaultValue={trilhaToEdit.img}
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                />

                

                <button
                    type="submit"
                    className="w-full bg-green-600 text-white font-semibold py-2 rounded-lg hover:bg-green-800 transition duration-300"
                >
                    Atualizar
                </button>
            </form>
        </div>
        </section>
    );
}
