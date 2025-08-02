import Flats from "./Flats";
import Mumbai from "./Mumbai";
export default function MainContainer(){
    return(
        <>
        <div className="main-container" style={{paddingTop:"5em",width:"115%"}}>
            <Flats/>
            <Mumbai/>
            <Flats/>
            <Mumbai/>
        </div>
        </>
    )
}