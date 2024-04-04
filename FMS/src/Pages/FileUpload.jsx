import { useState, useContext } from "react";
import { Fragment } from "react";
import pdfImage from "../../public/pdf.png";
import axios from 'axios'
import toast, { Toaster } from 'react-hot-toast';
import { AuthContext } from "../AuthContext";
import { useNavigate } from 'react-router-dom'
import Modal from "./Modal";
import '../App.css'
import Loading from './Loading'


function FileUpload({ pdfData }) {

  const [formData, setFormData] = useState(null);
  const [load, setLoading] = useState(false);
  const [viewModal, setViewModal] = useState(false);
  const [selectedPdf, setSelectedPdf] = useState(null);
  const { token } = useContext(AuthContext)
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData(e.target.files[0]);
  };

  const handleLogout = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:3001/Logout", null, {
        headers: {
          Authorization: `${token}`
        }
      });
      if (!response.data) {
        throw new Error("Error");
      } else {
        localStorage.removeItem("token");
        navigate('/Login');
      }
    } catch (error) {
      console.error("Error logging out:", error);
      toast.error("Error logging out");
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = new FormData();
      data.append("file", formData);
      setLoading(true); // Set loading to true when file upload begins
      const response = await axios.post("http://localhost:3001/upload/file", data, {
        headers: {
          Authorization: `${token}`
        }
      });
      if (!response.data) {
        throw new Error("Cannot fetch data");
      } else {
        toast.success("File Uploaded Successfully");
        location.reload(); // Reloading the page after successful upload
      }
    } catch (err) {
      console.error("Error uploading file:", err);
      toast.error("File upload failed");
    } finally {
      setLoading(false); // Set loading to false when file upload completes or encounters an error
    }
  }

  return (
    <Fragment>
      <div className="container mx-auto px-4 sm:px-8">
        <div className="py-8">
          <button onClick={handleLogout} className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded-md mb-4">Logout</button>
          <form onSubmit={handleSubmit} className="mb-4">
            <input type="file" onChange={handleChange} name="file" id="file" className="border border-gray-300 p-2 rounded-md mr-2" />
            <button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-md">Submit</button>
          </form>
          <Toaster />

          <div className="overflow-x-auto">
            <table className="w-full table-auto">
              <thead>
                <tr>
                  <th className="px-4 py-2 bg-gray-800 text-gray-100 font-semibold uppercase">Owner</th>
                  <th className="px-4 py-2 bg-gray-800 text-gray-100 font-semibold uppercase">File</th>
                  <th className="px-4 py-2 bg-gray-800 text-gray-100 font-semibold uppercase">Uploaded at</th>
                  <th className="px-4 py-2 bg-gray-800 text-gray-100 font-semibold uppercase">File Size</th>
                  <th className="px-4 py-2 bg-gray-800 text-gray-100 font-semibold uppercase">Actions</th>
                </tr>
              </thead>
              <tbody>
                {pdfData && pdfData.map((pdf) => (
                  <tr key={pdf._id} className="border-b border-gray-200">
                    <td className="px-4 py-2 text-white">{pdf.authorName ? pdf.authorName : ""}</td>
                    <td className="px-4 py-2">
                      <div className="flex items-center">
                        <img src={pdfImage} alt="" className="w-8 h-8 mr-2" />
                        <a href={pdf.url} className="text-white">{pdf.name ? pdf.name : ""}</a>
                      </div>
                    </td>
                    <td className="px-4 py-2 text-white">{pdf.createdAt ? new Date(pdf.createdAt).toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric' }) : ""}</td>
                    <td className="px-4 py-2 text-white">{pdf.size ? Math.floor((pdf.size / 1000)) : 0} KB</td>
                    <td className="px-4 py-2">
                      <button onClick={() => { setViewModal(true); setSelectedPdf(pdf); }} className="bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold py-1 px-2 rounded-md">
                        View
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {load && <Loading />}
        </div>
      </div>

      <Modal viewModal={viewModal} setViewModal={setViewModal} pdf={selectedPdf} />
    </Fragment>
  );
}

export default FileUpload;