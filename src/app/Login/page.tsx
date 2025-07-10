'use client';

import { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import z from 'zod';
import toast from 'react-hot-toast'
import { validateCredentials } from '@/app/libs/credentials';
import { email } from 'zod/v4';

export interface LoginCredentials {  
    email: string,
    password: string
}

const LoginSchema = z.object({
    email: z.string().trim().email('Email com formato incorreto'),
    password: z.string({message: 'Insira uma senha'}).trim().min(4, {message: 'Senha requer no mínimo 4 caracteres'})
})

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);

  const loginAction = async (formData: FormData) => {  

        const loginData: LoginCredentials = {
            email: formData.get('email') as string,
            password: formData.get('senha') as string
        }

        console.log(loginData.email);
        console.log(loginData.password);

        const result = LoginSchema.safeParse(loginData);

        if(!result.success){  //validação do zod

            let errorMsg = '';

            result.error.issues.forEach((issue) => {
                errorMsg = errorMsg + issue.message + '. ';
            });

            toast.error(errorMsg);

            return;
        }
        
        //validação e errormessage de validação no db
        const loginValidacao = await validateCredentials(loginData);

        if(loginValidacao){
            toast.error(loginValidacao.error);
            return;
        } 

        
    }

  return (
    <div className="h-[90%] flex items-center bg-[url('/mountainGuy.jpg')] bg-cover bg-center" >
    <div className="relative max-w-xs bg-amber-50 p-5 rounded-xl mx-auto md:mx-30 overflow-hidden">
      <h1 className="text-2xl font-bold text-center mb-3">Faça Login</h1>

      <form className="lg:space-y-2" action={loginAction} >
        

        <div>
          <label htmlFor="email" className="block mb-1 text-sm font-medium">
            E-mail
          </label>
          <input
            id="email"
            name='email'
            type="email"
            placeholder="Escreva seu e-mail"
            className="w-full px-4 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300"
          />
        </div>

        <div>
          <label htmlFor="senha" className="block mb-1 text-sm font-medium">
            Senha
          </label>
          <div className="relative">
            <input
              id="senha"
              name='senha'
              type={showPassword ? 'text' : 'password'}
              placeholder="Escreva sua senha"
              className="w-full px-4 py-2  text-sm border border-gray-300 rounded-md pr-10 focus:outline-none focus:ring-2 focus:ring-blue-300"
            />
            <button
              type="button"
              className="absolute  right-2 top-2 text-gray-500 hover:text-black"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>
        </div>

        

        <button
          type="submit"
          className="w-full mt-2 bg-gray-800 text-white py-2 rounded-md hover:bg-gray-900 transition"
        >
          Entrar
        </button>
      </form>

      <div className="flex items-center justify-center my-4 space-x-2 text-gray-500">
        <span className="w-full h-px bg-gray-300" />
        <span className="text-sm">ou</span>
        <span className="w-full h-px bg-gray-300" />
      </div>

      

      <p className="text-sm text-center">
        Não tem uma conta?{' '}
        <a href="/" className="font-semibold underline text-blue-600 hover:text-blue-800">
          Criar Conta
        </a>
      </p>
    </div>
    </div>
  );
}
