
import Nav from "./Nav";
import useCSS from "../hooks/useCSS";
import {CSSProvider} from "../Context/CSSProvider";
import HeaderCSS from "../styles/Header.module.css";

const Header = () => {

    const CSS = useCSS();

    return (
        <CSSProvider cssModule={HeaderCSS}>
            <header className={HeaderCSS.header}>
                <p>RainTime</p>
                <Nav />
                <p>About Us</p>
            </header>
        </CSSProvider>
    )
}

export default Header