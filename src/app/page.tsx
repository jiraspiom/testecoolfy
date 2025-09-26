'use client'
import { useState } from "react";
import { simpleAction } from "./actions/action";

export default function Home() {
  const [acao, setAcao] = useState('')

  const handleSubmit = async() =>{
    const retorno = await simpleAction();
    setAcao(retorno.message);
  }

  const handleApi = async() =>{
    try {
      const response = await fetch('/api/simple');

      if (!response.ok) {
        throw new Error(`Erro na API: ${response.statusText}`);
      }

      const retorno = await response.json();
      console.log('Resposta da API:', retorno); // Adicionado para depuração

      // Define a mensagem ou uma string vazia se a mensagem não existir
      setAcao(retorno.message || 'A API não retornou uma mensagem.');
    } catch (error) {
      console.error('Falha ao buscar dados da API:', error);
      setAcao('Erro ao carregar dados.');
    }
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24 gap-4">
      <div className="text-2xl">
        Retorno: <span className="font-bold text-green-500">{acao}</span>
      </div>
      <div className="flex gap-4">
      {/* 2. Use onSubmit em vez de action para controlar o formulário no cliente */}
      <form action={handleSubmit}>
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" 
        type="submit">Teste ACTION</button>
      </form>

       <button onClick={()=>{handleApi()}} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" 
        type="button">Teste API</button>
      </div>
    </main>
  )
}
