import { useState, useEffect, useContext } from "react";
import { useNavigate } from 'react-router-dom'
import axios from 'axios';
import FileUpload from './FileUpload'
import { AuthContext } from "../AuthContext";
import '../App.css'

function Display() {
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
        await axios.get("http://localhost:3001/pdf/show", {
            headers: {
                Authorization: `${token}`
            }
        })
            .then((response) => setPdfData(response.data.data))
            .catch((err) => console.log(err))
    }

    return (
        <FileUpload pdfData={pdfData} />
    );
}

export default Display;
