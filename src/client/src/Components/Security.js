import io from 'socket.io-client';
import {useEffect} from "react";
const Security = () => {

    useEffect(() => {
        const socket = io('http://192.168.1.49:4000');

        socket.emit('camera-on');

        return () => {
            socket.emit('camera-off');
            socket.close();
        };

    }, []);

    return (
        <main>
            <p>Security</p>
            <img src={"http://192.168.1.49:4000/camera-stream"}  alt={"Frame"}/>
        </main>
    )
}

export default Security