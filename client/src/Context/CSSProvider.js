import {createContext} from "react";


const CSSContext = createContext({});

export const CSSProvider = ({children, cssModule}) => {

    return (
        <CSSContext.Provider value={cssModule}>
            {children}
        </CSSContext.Provider>
    )
}

export default CSSContext;