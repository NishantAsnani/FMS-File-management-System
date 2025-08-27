import { useState, useEffect, useContext } from "react";
import { useNavigate } from 'react-router-dom'
import axios from 'axios';
import FileUpload from './FileUpload'
import { AuthContext } from "../AuthContext";
import '../App.css'
const BE_URL=import.meta.env.VITE_BE_URL

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
    const [Name,setName]=useState("")
    const fetchData = async () => {
        await axios.get(`${BE_URL}/pdf/show`, {
            headers: {
                Authorization: `${token}`
            }
        })
            .then((response) => {
                setPdfData(response.data.data)
                setName(response.data.Firstname)
                console.log(response.data.Firstname)
            })
            .catch((err) => console.log(err))
    }

    return (
        <FileUpload pdfData={pdfData} Name={Name} />
    );
}

export default Display;
