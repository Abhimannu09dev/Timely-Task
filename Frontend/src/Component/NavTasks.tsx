import { useState } from "react";


function NavTasks(){

    type Tab = "all" | "pending" | "completed";
    const [activeTask, setActiveTask] = useState("all");

    const handleTabChange = (tab: Tab) =>{
        setActiveTask(tab);
    }

    return(
        <>
            <div className="navigateTasks">
                <button 
                        className={activeTask === "all" ? "active" : ""}
                        onClick={() => {handleTabChange("all")}}>All</button>
                <button
                        className={activeTask === "pending" ? "active" : ""}
                        onClick={ () =>{handleTabChange("pending")}}>Pending</button>
                <button
                        className={activeTask === "completed" ? "active" : ""}
                        onClick={() => {handleTabChange("completed")}}>Completed</button>
            </div>

            <div className="taskList">
                <div id="allTasks" style={{display: activeTask === "all" ? "block" : "none"}}></div>
                <div id="pendingTasks" style={{display: activeTask === "pending"? "block": "none"}}></div>
                <div id="completedTasks" style={{display: activeTask ==="completed"? "block": "none"}}></div>
            </div>

        </>
    );
}
export default NavTasks;