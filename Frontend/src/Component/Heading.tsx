import { LuFileCheck, LuLogOut } from "react-icons/lu";
import { FaRegUser } from "react-icons/fa";
import '../CSS/Heading.css'
import { Link } from "react-router-dom";

function Heading(){


    return(
        <>
            <div className="heading">
                <div className="options">
                    <LuFileCheck className="icon" /><h1>Timely Task</h1>
                </div>
                <div className="options">
                    <div className="user"><FaRegUser className="userIcon"/> UserName</div>
                    <Link to="/">
                        <button className="logout"><LuLogOut style={{marginRight: '10px'}} />Logout</button>
                    </Link>
                </div>
            </div>
            <main>
                <div className="content">
                    <h1>Welcome back, UserName</h1>
                    <p>Ready to tackle your tasks and make today productive?</p>
                </div>
            </main>
            
        </>
    );
}
export default Heading;