import {NavLink} from 'react-router-dom';
import HouseSolidSvg from "./svg/HouseSolidSvg";
import CloudSunSolidSvg from "./svg/CloudSunSolidSvg";
import SeedlingSolidSvg from "./svg/SeedlingSolidSvg";
import VideoSolidSvg from "./svg/VideoSolidSvg";
import WindowsSvg from "./svg/WindowsSvg";
import useCSS from "../hooks/useCSS";

 const Nav = () => {

     const HeaderCSS = useCSS();

    return (
        <nav>
            <ul className={HeaderCSS.navBar}>
                <li>
                    <NavLink className={HeaderCSS.navBarLink} to={"/"}>
                        Home
                        <HouseSolidSvg />
                    </NavLink>
                </li>
                <li>
                    <NavLink className={HeaderCSS.navBarLink} to={"dom"}>
                        Dom
                        <WindowsSvg />
                    </NavLink>
                </li>
                <li>
                    <NavLink className={HeaderCSS.navBarLink} to={"climate"}>
                        Climate
                        <CloudSunSolidSvg />
                    </NavLink>
                </li>
                <li>
                    <NavLink className={HeaderCSS.navBarLink} to={"garden"}>
                        Garden
                        <SeedlingSolidSvg />
                    </NavLink>
                </li>
                <li>
                    <NavLink className={HeaderCSS.navBarLink} to={"security"}>
                        Security
                        <VideoSolidSvg />
                    </NavLink>
                </li>
            </ul>
        </nav>
    )
}

export default Nav