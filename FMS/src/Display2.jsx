import { useState, useEffect } from "react";
import axios from 'axios';



function Display2() {
    const [pdfData, setPdfData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get("http://localhost:3001/pdf/show");
                setPdfData(response.data.data);
                console.log(...response.data.data)

            } catch (error) {
                console.log(error)
            }
        };
        fetchData();
    }, []);
    return (
        <div>
            {pdfData.map((pdf) => {
                <div>
                    {pdf.name}
                </div>
            })}
        </div>
    );
}

export default Display2;
