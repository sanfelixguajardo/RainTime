import axios from "../api/axios";
import useAuth from "./useAuth";
import {useNavigate} from "react-router-dom";

const useRefreshToken = () => {
    const { setAuth } = useAuth();
    const navigate = useNavigate();

    const refresh = async () => {

        try {
            const response = await axios.get('/refresh', {
                withCredentials: true
            });

            setAuth(prev => {
                return { ...prev, accessToken: response.data.accessToken }
            });

            return response.data.accessToken;

        } catch (err) {

            // if response is unauthorized we route to login page because refresh token has expired
            if (err.response?.status === 403 || 401) {
                navigate("/login");
            }

        }

    }

    return refresh;
}

export default useRefreshToken;