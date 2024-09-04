import {CSSProvider} from "../Context/CSSProvider";
import DomCSS from '../styles/Dom.module.css';

const Dom = () => {

    return (
        <CSSProvider cssModule={DomCSS}>
            <main>
                <div className={DomCSS.wrapper}>
                    <div className={DomCSS.container}>
                        <input className={DomCSS.input} type={"radio"} name={"slide"} id={"c1"}/>
                        <label htmlFor={"c1"} className={DomCSS.card}>
                            <div className={DomCSS.row}>
                                <div className={DomCSS.icon}>1</div>
                                <div className={DomCSS.description}>
                                    <h4 className={DomCSS.h4}>Shutters</h4>
                                    <p className={DomCSS.p}>open or close the shutters</p>
                                </div>

                            </div>
                        </label>

                        <input className={DomCSS.input} type={"radio"} name={"slide"} id={"c2"}/>
                        <label htmlFor={"c2"} className={DomCSS.card}>
                            <div className={DomCSS.row}>
                                <div className={DomCSS.icon}>2</div>
                                <div className={DomCSS.description}>
                                    <h4 className={DomCSS.h4}>Terrace</h4>
                                    <p className={DomCSS.p}>Close the terrace or turn on the lights</p>
                                </div>

                            </div>
                        </label>

                        <input className={DomCSS.input} type={"radio"} name={"slide"} id={"c3"}/>
                        <label htmlFor={"c3"} className={DomCSS.card}>
                            <div className={DomCSS.row}>
                                <div className={DomCSS.icon}>3</div>
                                <div className={DomCSS.description}>
                                    <h4 className={DomCSS.h4}>Temperature</h4>
                                    <p className={DomCSS.p}>Turn on de AC or caleftatioon</p>
                                </div>

                            </div>
                        </label>

                        <input className={DomCSS.input} type={"radio"} name={"slide"} id={"c4"}/>
                        <label htmlFor={"c4"} className={DomCSS.card}>
                            <div className={DomCSS.row}>
                                <div className={DomCSS.icon}>4</div>
                                <div className={DomCSS.description}>
                                    <h4 className={DomCSS.h4}>Call</h4>
                                    <p className={DomCSS.p}>Call the doorman or open guests</p>
                                </div>

                            </div>
                        </label>

                    </div>

                </div>
            </main>
        </CSSProvider>
    )
}

export default Dom