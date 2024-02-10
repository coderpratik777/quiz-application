import { useEffect, useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export const CreateProblem = ({ socket, roomId }: { socket: any, roomId: any }) => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("")
    const [answer, setAnswer] = useState(0);
    const [invalid, setInvalid] = useState(false)
    const [options, setOptions] = useState([
        {
            id: 0,
            title: ""
        },
        {
            id: 1,
            title: ""
        },
        {
            id: 2,
            title: ""
        },
        {
            id: 3,
            title: ""
        }
    ])

    useEffect(() => {
        setTimeout(() => {
            setInvalid(false);
        }, 3000)
    }, [invalid])

    return (
        // <div>
        //     <h1>Create Problem</h1>
        //     <h2> Tittle</h2><input type="text" onChange={(e) => {
        //         setTitle(e.target.value);
        //     }}></input>
        //      <h2> Description</h2><input type="text" onChange={(e) => {
        //         setDescription(e.target.value);
        //     }}></input>
        //     <h2>Set Options</h2>
        // {[0, 1, 2, 3].map(optionId => <div>
        //     <input type="radio" checked={optionId === answer}   onChange={()=>{
        //         setAnswer(optionId)
        //     }}></input>
        //     Option {optionId} 
        //     <input type="text" onChange={(e) => {
        //         setOptions(options => options.map(x => {
        //             if (x.id === optionId) {
        //                 return {
        //                     ...x,
        //                     title: e.target.value
        //                 }
        //             }
        //             return x;
        //         }))
        //     }}>
        //     </input>
        // </div>)}

        // <button onClick={() => {
        //     if (!title || !description || !options || !answer) {
        //         setInvalid(true)
        //     } else {
        //         console.log(title, description, options, answer)
        //         socket.emit("createProblem", {
        //             roomId,
        //             problem: {
        //                 title,
        //                 description,
        //                 options
        //             }
        //         });
        //     }

        //     } }>Add Problem</button>
        // </div>
        <div className="">
            <form className="space-y-6" action="#">
                <h5 className="text-xl text-center font-medium text-gray-900 dark:text-white">Create a Question</h5>
                <div>
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Title</label>
                    <input type="text" onChange={(e) => {
                        setTitle(e.target.value);
                    }} name="title" id="title" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" placeholder="Enter the Question" required />
                </div>
                <div>
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Decription</label>
                    <input type="description" onChange={(e) => {
                        setDescription(e.target.value);
                    }} name="description" id="description" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" placeholder="Enter the Description e.g Science,Math,G.k" required />
                </div>
                {[0, 1, 2, 3].map(optionId =>
                    <div>
                        <input type="radio" checked={optionId === answer} onChange={() => {
                            setAnswer(optionId)
                        }}></input>
                        <label className="mx-2 mb-2 text-sm font-medium text-gray-900 dark:text-white">option {optionId + 1}</label>
                        <input type="text" onChange={(e) => {
                            setOptions(options => options.map(x => {
                                if (x.id === optionId) {
                                    return {
                                        ...x,
                                        title: e.target.value
                                    }
                                }
                                return x;
                            }))
                        }} name={String(optionId)} id={String(optionId)} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" required />
                    </div>)}
                <div>

                    {
                        invalid && <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
                            <strong className="font-bold">Invalid! </strong>
                            <span className="block sm:inline">Please Enter All the required fields.</span>
                            <span className="absolute top-0 bottom-0 right-0 px-4 py-3">
                                <svg className="fill-current h-6 w-6 text-red-500" role="button" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><title>Close</title><path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z" /></svg>
                            </span>
                        </div>
                    }
                </div>
                <button type="button" onClick={() => {
                    if (!title || !description || !options || !answer) {
                        setInvalid(true)
                    } else {
                        console.log(title, description, options, answer)
                        socket.emit("createProblem", {
                            roomId,
                            problem: {
                                title,
                                description,
                                options
                            }
                        });
                        socket.on("problemAdded", (data:any) => {
                            console.log(data);
                            toast.success('Success fully added Problem!', {
                                position: "top-center",
                                autoClose: 5000,
                                hideProgressBar: false,
                                closeOnClick: true,
                                pauseOnHover: true,
                                draggable: true,
                                progress: undefined,
                                theme: "dark"
                                });
                        })
                    }
                }} className="w-full text-white bg-[#764abc] hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Add Problem</button>
            </form>
        </div>
    )
}