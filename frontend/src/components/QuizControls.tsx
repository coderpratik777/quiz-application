import { CreateProblem } from "./CreateProblem";


export const QuizControls = ({ socket, roomId }: { socket: any, roomId: string }) => {
    return (
        // <div>
        //      <h1>Quiz Controls</h1>
        //      <button onClick={()=>{
        //         socket.emit("next",{
        //             roomId
        //         })
        //      }}>
        //         Next
        //      </button>
        //      <button onClick={()=>{
        //         socket.emit("start",{
        //             roomId
        //         })
        //      }}> Start
        //      </button>
        //      <button onClick={()=>{
        //         alert("start")
        //         socket.emit("start",{
        //             roomId
        //         })
        //      }}> End
        //      </button>

        // </div>
        <div className="">
            <button type="submit" onClick={() => {

            }} className="w-full my-4 text-white bg-[#764abc] hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"> Start Quiz </button>
            <button type="submit" onClick={() => {

            }} className="w-full my-4 text-white bg-[#764abc] hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Next Question</button>
            <button type="submit" onClick={() => {

            }} className="w-full my-4 text-white bg-[#764abc] hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">End Quiz</button>
        </div>
    )
}

export default QuizControls;