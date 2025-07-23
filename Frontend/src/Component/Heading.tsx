import { LuFileCheck, LuLogOut } from "react-icons/lu";
import { FaRegUser } from "react-icons/fa";
import '../CSS/Heading.css'
import { useNavigate } from "react-router-dom";

function Heading(){
    const userName = localStorage.getItem("userName") || "Guest";// To get the userName
    const navigate=useNavigate();

    const handleLogout = () =>{
        localStorage.removeItem("userName");
        navigate("/", {replace: true});
    }
 
    return(
        <>
            <div className="heading">
                <div className="options">
                    <LuFileCheck className="icon" /><h1>Timely Task</h1>
                </div>
                <div className="options">
                    <div className="user"><FaRegUser className="userIcon"/> {userName}</div>
                    <button className="logout" onClick={handleLogout}><LuLogOut style={{marginRight: '10px'}} />Logout</button>
                </div>
            </div>
            <main>
                <div style={{textAlign: 'center'}}>
                    <div className="welcome">
                        <h1>Welcome back, {userName}</h1>
                        <p>Ready to tackle your tasks and make today productive?</p>
                    </div>
                </div>

            </main>
            
        </>
    );
}
export default Heading;