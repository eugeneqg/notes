import GridLoader from "react-spinners/GridLoader";
import "./loader.sass";

const Loader = () => {

    return (
        <div className="loader">
            <GridLoader color={"#3884AE"}/>
        </div>
    )
}

export default Loader;