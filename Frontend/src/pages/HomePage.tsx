import Body from "../Component/Body";
import Heading from "../Component/Heading";
import NavTasks from "../Component/NavTasks";

function HomePage(){
    return(
        <>
            <div style={{
                backgroundColor: '#eef4ff',
                height: '100vh',
            }}>
                <Heading />
                <Body />
                <NavTasks />
            </div>
            
        </>
    );
}
export default HomePage;