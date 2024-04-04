
import { useState } from "react";
import { Header } from "../../components/header/header";
import { Input } from "../../components/input";
import { FiTrash } from "react-icons/fi";

export function Admin() {
    const [nameInput, setNameInput] = useState("")
    const [urlInput, setUrlInput] = useState("")
    const [textColorInput, setTextColorInput] = useState("#7BA0BA")
    const [backgroundColorInput, setBackgroundColorInput] = useState("#162C46")

    return (
        <div className="flex items-center flex-col min-h-screen pb-7 px-2">
            <Header />

            <form className="flex flex-col mt-8 mb-3 w-full max-w-xl">
                <label className="text-white font-medium mt-2 mb-2">Nome do link</label>
                <Input 
                    placeholder="🔗 Digite o nome do link."
                    value={nameInput}
                    onChange={(e) => setNameInput(e.target.value)}
                />
                <label className="text-white font-medium mt-2 mb-2">Url do link</label>
                <Input
                    type="url"
                    placeholder="🔗 Digite a link."
                    value={urlInput}
                    onChange={(e) => setUrlInput(e.target.value)}
                />
                <section className="flex my-4 gap-5">
                    <div className="flex gap-3 items-center">
                        <label className="text-white font-medium mt-2 mb-2">Cor do link</label>
                        <input
                            type="color"
                            value={textColorInput}
                            onChange={(e) => setTextColorInput(e.target.value)}
                        />
                    </div>
                    <div className="flex gap-3 items-center">
                        <label className="text-white font-medium mt-2 mb-2">Fundo do link</label>
                        <input
                            type="color"
                            value={backgroundColorInput}
                            onChange={(e) => setBackgroundColorInput(e.target.value)}
                        />
                    </div>
                </section>
                {
                    nameInput !== '' && (
                        <div 
                            className="flex items-center justify-start flex-col mb-7 p-1 border-gray-100/25 border rounded-md"
                        >
                            <label 
                                className="text-white font-medium mt-2 mb-3"
                            >
                                Veja como está ficando:
                            </label>
                            <article
                                className="w-11/12 max-w-lg flex flex-col items-center justify-between bg-zinc-900 rounded px-1 py-3"
                                style={{ marginBottom: 8, marginTop: 8, backgroundColor: backgroundColorInput }}
                            >
                                <p 
                                    className="font-medium"
                                    style={{ color: textColorInput }}
                                >
                                    {nameInput}
                                </p>
                            </article>
                        </div>
                    )
                }
                
                <button
                    type="submit"
                    className="mb-7 bg-blue-600 h-9 rounded-md text-white font-medium gap-4 flex justify-center items-center"
                >
                    Cadastrar
                </button>
            </form>

            <h2 className="font-bold text-white mb-4 text-2xl">
                Meus links
            </h2>
            <article 
                className="flex items-center justify-between w-11/12 max-w-xl rounded py-3 px-2 mb-2 select-none bg-blue-600"
                style={{ color: "#FFF" }}
            >
                <p>Canal do YouTube</p>
                <div>
                    <button
                        className="border border-dashed py-1 p-1 rounded"
                    >
                        <FiTrash size={18} color="#FFF" />
                    </button>
                </div>
            </article>
        </div>
    )
}