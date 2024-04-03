import { useState, useEffect, useContext } from "react";
import { useNavigate } from 'react-router-dom'
import axios from 'axios';
import Display from './Display'
import { AuthContext } from "./AuthContext";



function Display2() {
    const navigate = useNavigate();
    const { token } = useContext(AuthContext)
    const [tokenFetched, setTokenFetched] = useState(false);

    useEffect(() => {
        if (!tokenFetched) {

            setTokenFetched(true);
        } else {
            if (!token) {
                navigate('/Login');
            } else {
                fetchData();
            }
        }
    }, [token, tokenFetched, navigate]);

    const [pdfData, setPdfData] = useState([]);
        const fetchData = async () => {
            await axios.get("http://localhost:3001/pdf/show")
                .then((response) => setPdfData(response.data.data))
                .catch((err) => console.log(err))
        }
        
    return (
        <Display pdfData={pdfData} />
    );
}

export default Display2;
