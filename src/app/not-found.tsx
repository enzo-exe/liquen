// app/not-found.tsx

import Image from 'next/image';
import Link from 'next/link';


export default function NotFound() {
  return (
    <main className="h-screen flex flex-col justify-center items-center bg-amber-50 text-center px-4">
      <div className="max-w-md bg-white shadow-xl rounded-2xl p-6">
        <Image
          src="/trail-closed.png" 
          alt="Trilha sem saída"
          width={300}
          height={300}
          className="mx-auto mb-4"
        />
        <h1 className="text-20 font-bold mb-2 text-gray-800">Ops! Essa trilha não tem saída</h1>
        <p className="text-gray-600 mb-4">
          404 - Page not Found
        </p>
        <Link
          href="/Home"
          className="inline-block bg-gray-800 text-white px-6 py-2 rounded-full hover:bg-gray-900 transition"
        >
          Voltar para o Início
        </Link>
      </div>
    </main>
  );
}
