import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import { CreateProblem } from "./CreateProblem";
import { QuizControls } from "./QuizControls";

export const Admin = () => {

    const [roomId, setRoomId] = useState("");
    const [socket, setSocket] = useState<null | any>(null);
    const [quizId, setQuizId] = useState("");

    useEffect(() => {
        const socket = io("http://localhost:4000");
        setSocket(socket)

        socket.on("connect", () => {
            console.log(socket.id)
            alert("Connected");
            socket.emit("joinAdmin", {
                password: "ADMIN_PASSWORD"
            })
        })


    }, [])

    //add the sign in and sign up for admin
    if (!quizId) {
        return (
            //     <div>
            //     <input type="text" onChange={(e)=>{
            //         setRoomId(e.target.value);
            //     }}></input>
            //     <button onClick={()=>{
            //         socket.emit("createQuiz",{
            //             roomId
            //         });
            //         setQuizId(roomId);
            //     } }>Create Room</button>

            // </div>
            <div className="h-lvh grid place-items-center">
            <div className="w-fit p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700">
                <form className="space-y-6" action="#">
                    <h5 className="text-xl text-center font-medium text-gray-900 dark:text-white">Welcome to Quizzy 🎉🎉<br />Create your Quiz and share with others</h5>
                    <div>
                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Enter Room Id</label>
                        <input type="email" onChange={(e) => {
                            setRoomId(e.target.value);
                        }} name="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" placeholder="Enter the code" required />
                    </div>
                    <button type="submit" onClick={() => {
                        socket.emit("createQuiz", {
                            roomId
                        });
                        setQuizId(roomId);
                    }} className="w-full text-white bg-[#764abc] hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Create Room</button>
                </form>
            </div>
            </div>
        )
    }

    return (
        <div className="grid grid-cols-3 gap-12 py-20 px-20">
            <div className="col-span-2 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700"><CreateProblem socket={socket} roomId={roomId} /></div>
            <div className="p-4 h-fit bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700"><QuizControls socket={socket} roomId={roomId} /></div>
        </div>
    )
}