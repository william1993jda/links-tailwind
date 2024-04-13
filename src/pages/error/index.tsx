import React from "react";
import { FaArrowLeft } from "react-icons/fa";
import { Link } from "react-router-dom";


export function ErrorPage() {
    return(
        <div className="flex w-full min-h-screen justify-center items-center flex-col text-white">
            <h1 className="text-4xl font-medium mb-4">Página não encontrada.</h1>
            <p
                className="italic text-1xl"
            >
                Você caiu em uma página que não existe!
            </p>
            <Link
                className="flex items-center gap-3 mt-7 hover:text-slate-500 italic"
                to="/"
            >
                <FaArrowLeft size={18} /> Voltar para a página home.
            </Link>
        </div>
    )
}