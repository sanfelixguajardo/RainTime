import {useContext} from "react";
import CSSContext from "../Context/CSSProvider";

const useCSS = () => {
    return useContext(CSSContext);
}

export default useCSS;