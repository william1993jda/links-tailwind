
import { FormEvent, useState, useEffect } from "react";
import { Header } from "../../components/header/header";
import { Input } from "../../components/input";
import { FiTrash } from "react-icons/fi";
import { db } from "../../services/firebaseConnection";
import {
     addDoc, 
     collection, 
     deleteDoc, 
     doc, 
     onSnapshot, 
     orderBy, 
     query } from "firebase/firestore";

     interface LinkProps{
        id: string;
        name: string;
        url: string;
        bg: string;
        color: string;
        created: string;
     }


export function Admin() {
    const [nameInput, setNameInput] = useState("")
    const [urlInput, setUrlInput] = useState("")
    const [textColorInput, setTextColorInput] = useState("#7BA0BA")
    const [backgroundColorInput, setBackgroundColorInput] = useState("#162C46")

    const [links, setLinks] = useState<LinkProps[]>([])

    // Buscando os dados do firebase
    useEffect(() => {
        // Indica qual é o db (coleção) e a "tabela (documento)"
        const linksRef = collection(db, 'links')
        // Cria a ordenação dos dados
        const queryRef = query(linksRef, orderBy('created', 'asc'))

        // Busca os dados. Cuidado que o onSnapshot fica monitorando o db o tempo todo
        // pode não ser performatico
        const unsub = onSnapshot(queryRef, (snapshot) => {
            const lista = [] as LinkProps[];

            snapshot.forEach((doc) => {
                lista.push({
                    id: doc.id,
                    name: doc.data().name,
                    url: doc.data().url,
                    bg: doc.data().bg,
                    color: doc.data().color,
                    created: doc.data().created
                })
            })

            setLinks(lista)
        })
        
        // Para cancelar esse evento caso não esteja nesta página
        return () => {
            unsub();
        }
    }, [])

    function handleRegister(e: FormEvent) {
        e.preventDefault()
        
        if(nameInput === '' || urlInput === '') {
            alert("Preencha todos os campos")
            return
        }

        addDoc(collection(db, 'links'), {
            name: nameInput,
            url: urlInput,
            bg: backgroundColorInput,
            color: textColorInput,
            created: new Date()
        })
        .then(() => {
            console.log("Cadastrado com sucesso")
            setNameInput('')
            setUrlInput('')
        })
        .catch((err) => {
            console.log(`Erro ao cadastrar no banco: ${err}`)
        })
    }

    async function handleDeleteLink(id: string) {
        const docRef = doc(db, 'links', id)
        await deleteDoc(docRef)
    }

    return (
        <div className="flex items-center flex-col min-h-screen pb-7 px-2">
            <Header />

            <form className="flex flex-col mt-8 mb-3 w-full max-w-xl" onSubmit={handleRegister}>
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

            
            {
                links.map((link) => (
                    <>
                        <h2 className="font-bold text-white mb-4 text-2xl">
                            Meus links
                        </h2>
                        <article 
                            key={link.id}
                            className="flex items-center justify-between w-11/12 max-w-xl rounded py-3 px-2 mb-2 select-none"
                            style={{ backgroundColor: link.bg, color: link.color }}
                        >
                            <a
                                className="hover:text-gray-400"
                                href={link.url}
                                target="_blank"
                            >
                                {link.name}
                            </a>
                            <div>
                                <button
                                    className="border border-dashed py-1 p-1 rounded"
                                    onClick={() => handleDeleteLink(link.id)}
                                >
                                    <FiTrash size={18} color="#FFF" />
                                </button>
                            </div>
                        </article>
                    </>
                ))
            }
        </div>
    )
}