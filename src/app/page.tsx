'use client';

import { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import toast from 'react-hot-toast';
import z from 'zod';
import { createUser } from "@/app/libs/credentials";
import { LoginCredentials } from './Login/page';
import { Redirect } from 'next';
import { redirect } from 'next/navigation';




export interface CadastroCredentials {  //codigo do phyl interface
    email: string,
    password: string,
    checkpassword: string,
    terms: boolean
}

const CreateUserSchema = z.object({
    email: z.string().trim().email('Email com formato incorreto'),
    password: z.string({message: 'Insira uma senha'}).trim().min(4, {message: 'Senha precisa no mínimo 4 caracteres'}),
    terms: z.literal(true, {
    errorMap: () => ({ message: "Você deve concordar com os termos." }),
  }),
    checkpassword: z.string({message: 'Insira uma confirmação de senha'}).trim().min(1, {message: 'Confirmar Senha não pode ser vazia'}),
}).refine((data) => data.password === data.checkpassword, {
    message: "Senhas não conferem",
    path: ["confPassword"]
});

export default function Cadastrar() {
  const [showPassword, setShowPassword] = useState(false);
  const [terms, setTerms] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [checkpassword, setCheckpassword] = useState(''); //usando variaveis de estado para persistência após falha de login


   const registrarAction = async (e: React.FormEvent) => {  

        e.preventDefault();
        const SigninData: CadastroCredentials = {
            email: email as string,
            password: password as string,
            checkpassword: checkpassword as string,
            terms: terms

        }
        
        const result = CreateUserSchema.safeParse(SigninData);
        

        if(!result.success){

            let errorMsg = '';

            result.error.issues.forEach((issue) => {
                errorMsg = errorMsg + issue.message + '. ';
            });

            toast.error(errorMsg);

            return;
        }

        const retornoCreateUser = await createUser(SigninData as LoginCredentials); 

        if(retornoCreateUser.error){
            toast.error(retornoCreateUser.error);
            return;
        }else if(retornoCreateUser.success){
            toast.success(retornoCreateUser.success);
            redirect('/Login');
        }

   }

  return (
    <div className="h-[90%] flex items-center bg-[url('/mountainGuy.jpg')] bg-cover bg-center" >
    <div className="relative max-w-xs bg-amber-50 p-5 rounded-xl mx-auto md:mx-30 overflow-hidden">
      <h1 className="text-2xl font-bold text-center mb-3">Crie uma conta</h1>

      <form className="lg:space-y-2" onSubmit={registrarAction} >
        <div>
          <label htmlFor="email" className="block mb-1 text-sm font-medium">
            E-mail
          </label>
          <input
            id="email"
            name='email'
            type="text"
            placeholder="Escreva seu e-mail"
            className="w-full px-4 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300"
            onChange={(e)=> setEmail(e.target.value)}
          />
        </div>

        <div>
          <label htmlFor="email" className="block mb-1 text-sm font-medium">
            Senha
          </label>
          <div className='relative' >
            <input
              id="senha"
              name='password'
              type={showPassword ? 'text' : 'password'}
              placeholder="Escreva sua senha"
              className="w-full px-4 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300"
              onChange={(e)=> setPassword(e.target.value)}
            />
            <button
              type="button"
              className="absolute right-2 top-2 text-gray-500 hover:text-black"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>
          
        </div>

        <div>
          <label htmlFor="senha" className="block mb-1 text-sm font-medium">
            Confirme sua Senha
          </label>
          <div className="relative">
            <input
              id="checkSenha"
              name='checkSenha'
              type={showPassword ? 'text' : 'password'}
              placeholder="Repita sua senha"
              className="w-full px-4 py-2 text-sm border border-gray-300 rounded-md pr-10 focus:outline-none focus:ring-2 focus:ring-blue-300"
              onChange={(e)=> setCheckpassword(e.target.value)}
            />
            
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <input type="checkbox" id="terms" name="terms" className="accent-black" checked={terms} onChange={(e)=> setTerms(!terms)} />
          <label htmlFor="terms" className="text-sm">
            Eu concordo com todos os termos.
          </label>
        </div>

        <button
          type="submit"
          className="w-full bg-gray-800 text-white py-2 rounded-md hover:bg-gray-900 transition"
        >
          Cadastrar
        </button>
      </form>

      <div className="flex items-center justify-center my-4 space-x-2 text-gray-500">
        <span className="w-full h-px bg-gray-300" />
        <span className="text-sm">ou</span>
        <span className="w-full h-px bg-gray-300" />
      </div>

      

      <p className="text-sm text-center">
        Já tem uma conta?{''}
        <a href="/Login" className="font-semibold underline text-blue-600 hover:text-blue-800">
          Log in
        </a>
      </p>
    </div>
    </div>
  );

}
