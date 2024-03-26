import { useState, useEffect } from "react";
import axios from 'axios';
import Display from './Display';

function Display2() {
    const [pdfData, setPdfData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get("http://localhost:3001/pdf/show");
                console.log(response.data.data)
                setPdfData([response.data.data]);
            } catch (error) {
                console.log(error)
            }
        };
        fetchData();
    }, []);
    return (
        <div>
            <Display pdfData={pdfData} />
        </div>
    );
}

export default Display2;
