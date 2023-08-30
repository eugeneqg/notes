import GridLoader from "react-spinners/GridLoader";
import "./loader.sass";

const Loader = ({size}) => {

    return (
        <div className="loader">
            <GridLoader size={size} color={"#3884AE"}/>
        </div>
    )
}

export default Loader;