import { BsExclamationCircle } from "react-icons/bs";
import { IoMdTime } from "react-icons/io";
import { IoCheckmarkDoneCircleOutline } from "react-icons/io5";


import "../CSS/Body.css"

function Body(){
    return(
        <>
            <div className="tasks">
                <div className="taskList">
                    <div className="totalTasks">
                        <p>Total Tasks</p>
                        <strong>1</strong>
                    </div>
                    <BsExclamationCircle className="totalIcon"/>
                </div>
                <div className="taskList">
                    <div className="pendingTasks">
                        <p>Pending</p>
                        <strong>1</strong>
                    </div>
                    <IoMdTime className="pendingIcon" />
                </div>
                <div className="taskList">
                    <div className="completedTasks">
                        <p>Completed</p>
                        <strong>1</strong>
                    </div>
                    <IoCheckmarkDoneCircleOutline className="completedIcon" />
                </div>
            </div>
        </>
    );
}
export default Body;