import Body from "../Component/Body";
import Heading from "../Component/Heading";

function HomePage(){
    return(
        <>
            <div style={{
                backgroundColor: '#eef4ff',
                height: '100vh',
            }}>
                <Heading />
                <Body />
            </div>
            
        </>
    );
}
export default HomePage;