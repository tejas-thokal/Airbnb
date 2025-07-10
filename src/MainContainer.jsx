import Flats from "./Flats";
import Mumbai from "./Mumbai";
export default function MainContainer(){
    return(
        <>
        <div className="main-container" style={{paddingTop:"5em"}}>
            <Flats/>
            <Mumbai/>
            <Flats/>
            <Mumbai/>
        </div>
        </>
    )
}