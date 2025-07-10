'use server';

import { redirect } from "next/navigation";
import ConexaoBD from "./conexao-bd";
import { createSessionToken } from "./auth";
import bcrypt from 'bcrypt'; //Para criptografar a senha. npm i bcrypt
import { LoginCredentials } from "../Login/page";

const userDBFile = 'usuarios-db.json';

export async function createUser(data: LoginCredentials){

    const email = data.email;
    const password = data.password;

    const passwordCrypt = await bcrypt.hash(password,10);

    const novoUser = {
        id: crypto.randomUUID(),
        email,
        password: passwordCrypt
    }

    const users = await ConexaoBD.retornaBD(userDBFile);

    for(const user of users)
    {
        if(user.email === email){
            return {error: 'Usuário ou senha incorretos'}; //usuário já cadastrado
        }
    }
    users.push(novoUser);
    ConexaoBD.armazenaBD(userDBFile,users);
    return {success: 'Usuário Criado com Sucesso'}

}

export async function validateCredentials(data: LoginCredentials){

    const email = data.email;
    const password = data.password;

    const usuariosDB = await ConexaoBD.retornaBD(userDBFile);

    const user = usuariosDB.find(user => user.email === email);

    if(!user)
        return {error: 'Usuário não encontrado'};
    const isMatch = await bcrypt.compare(password, user.password);

    if(isMatch)
    {   
        await createSessionToken({ email: user.email });
        redirect('/Home');
    }
    else{
        return {error: 'Usuario ou senhas incorretos'} //Manter privacidade
    }

}
