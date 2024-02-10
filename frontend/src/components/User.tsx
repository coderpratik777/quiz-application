import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import { Question } from "./Question";
import { LeaderBoard } from "./LeaderBoard";


export const User = () => {
    const [name, setName] = useState("");
    const [submitted, setSubmitted] = useState(Boolean);
    const [roomId, setRoomId] = useState("");

    if (!submitted) {
        return (
            // <div>
            //     Name - <input type="text" placeholder="name" onChange={(e) => {
            //         setName(e.target.value);
            //     }} />
            //     <div>
            //         Enter Code to Join <input type="text" onChange={(e) => {
            //             setRoomId(e.target.value);
            //         }}></input>
            //     </div>
            //     <button type="submit" onClick={() => {
            //         setSubmitted(true);
            //     }}>Submit</button>
            // </div>
            <div className="h-lvh grid place-items-center">
            <div className="w-fit p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700">
                <form className="space-y-6" action="#">
                    <h5 className="text-xl font-medium text-gray-900 dark:text-white">Welcome to Quizzy 🎉🎉✨</h5>
                    <div>
                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Enter code</label>
                        <input type="email" onChange={(e) => {
                            setRoomId(e.target.value);
                        }} name="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" placeholder="Enter the code" required />
                    </div>
                    <div>
                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Enter Your Name</label>
                        <input type="password" onChange={(e) => {
                            setName(e.target.value);
                        }} name="password" id="password" placeholder="Enter Your Name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" required />
                    </div>
                    <button type="submit" onClick={() => {
                        setSubmitted(true);
                    }} className="w-full text-white bg-[#764abc] hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
                </form>
            </div>
            </div>


        )
    }

    return <UserLoggedIn name={name} roomId={roomId} />
}


export const UserLoggedIn = ({ name, roomId }: { name: any, roomId: any }) => {
    // const searchParams = new URLSearchParams(document.location.search);
    // const roomId = searchParams.get("roomid");
    const [socket, setSocket] = useState<null | any>(null);
    const [currentState, setCurrentState] = useState("not_started");
    const [currentQuestion, setCurrentQuestion] = useState(null);
    const [leaderboard, setLeaderboard] = useState(null);
    const [userId, setUserId] = useState("");

    useEffect(() => {
        alert(roomId + "roomid")
        const socket = io("http://localhost:4000");
        setSocket(socket)

        socket.on("connect", () => {
            console.log(socket.id)
            alert("Connected");
            alert(`roomId ${roomId}`);
            socket.emit("join", {
                roomId,
                name
            })
        })

        socket.on("init", ({ userId, state }) => {
            alert(`init ${JSON.stringify(state)}`)

            setUserId(userId);
            if (state.leaderboard) {
                setLeaderboard(state.leaderboard);
            }

            if (state.problem) {
                setCurrentQuestion(state.problem);
            }
            setCurrentState(state.type);
        })

        socket.on("leaderboard", (data) => {
            alert(`Leaderboard called`)
            setCurrentState("leaderboard");
            setLeaderboard(data.leaderboard)
        });

        socket.on("problem", (data) => {
            alert(JSON.stringify(data));
            setCurrentState("question");
            setCurrentQuestion(data.problem);
        })

    }, [currentState])

    if (currentState === "not_started") {
        return <div> Quiz not yet started</div>
    }

    if (currentState === "question") {
        return <Question question={currentQuestion} />
    }

    if (currentState === "leaderboard") {
        return <LeaderBoard leaderboard={leaderboard} />
    }
    return (
        <div>User</div>
    )
}