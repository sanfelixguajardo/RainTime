import useCSS from "../../hooks/useCSS";

const WindowsSvg = () => {

    const CSS = useCSS();

    return (
        <svg className={CSS.windowsSvg}
             xmlns="http://www.w3.org/2000/svg"
             viewBox="0 0 448 512">
            <path d="M0 93.7l183.6-25.3v177.4H0V93.7zm0 324.6l183.6 25.3V268.4H0v149.9zm203.8 28L448 480V268.4H203.8v177.9zm0-380.6v180.1H448V32L203.8 65.7z"/>
        </svg>
    );
}

export default WindowsSvg;