import { useState, useContext } from "react";
import { IoCloseOutline } from "react-icons/io5"; // Import your SVG icon here
import axios from "axios";
import { AuthContext } from "../AuthContext";
import toast, { Toaster } from 'react-hot-toast';

function Modal({ viewModal, setViewModal, pdf, selectedOption }) {
    const [email, setEmail] = useState("");
    const { token } = useContext(AuthContext)
    const BE_URL=import.meta.env.VITE_BE_URL

    const UpdateUI = (event) => {
        setEmail("")
        setViewModal(false)
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (selectedOption.value === "Access-Right") {
                const response = await axios.post(`${BE_URL}/pdf/giveAccess`, { email, pdf }, {
                    headers: {
                        Authorization: `${token}`
                    }
                });
                UpdateUI();
                toast.success("Rights were given to the user mentioned");
            } else if (selectedOption.value === "Delete") {
                await axios.post(`${BE_URL}/pdf/delete`, { pdf }, {
                    headers: {
                        Authorization: `${token}`
                    }
                });
                UpdateUI();
                location.reload();
                toast.success("PDF deleted successfully");
            }
        } catch (error) {
            if (selectedOption.value === "Access-Right") {
                if (error.response && error.response.status === 404) {
                    UpdateUI();
                    toast.error("User does not exist");
                } else if (error.response && error.response.status === 403) {
                    UpdateUI();
                    toast.error("Cannot give rights to the author");
                }
            } else if (selectedOption.value === "Delete") {
                if (error.response && error.response.status === 404) {
                    UpdateUI();
                    toast.error("PDF not found");
                } else if (error.response && error.response.status === 403) {
                    UpdateUI();
                    toast.error("Cannot delete, you are not the author");
                }
            }
        };
    }


    return (
        viewModal && (
            <div className="fixed z-10 inset-0 overflow-y-auto">
                <Toaster />
                <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
                    <div className="fixed inset-0 transition-opacity" aria-hidden="true">
                        <div className="absolute inset-0 bg-gray-900 opacity-50"></div>
                    </div>
                    <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                        <div className="absolute top-0 right-0 p-4">
                            <button
                                onClick={() => setViewModal(false)}
                                type="button"
                                className="flex justify-center items-center w-8 h-8 rounded-full bg-gray-200 hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500"
                            >
                                <IoCloseOutline className="w-4 h-4 text-gray-600" />
                            </button>
                        </div>
                        <div className="px-4 pt-5 pb-4 bg-white sm:p-6 sm:pb-4">
                            <div className="sm:flex sm:items-start">
                                <div className="mt-3 text-center sm:mt-0 sm:text-left">
                                    <h3 className="text-lg font-medium leading-6 text-gray-900" id="modal-title">
                                        {selectedOption.value == "Access-Right" ? "Give access" : "Delete"}
                                    </h3>
                                    <div className="mt-4">
                                        <form onSubmit={handleSubmit}>
                                            <p className="text-sm text-gray-500 mb-2">
                                                {selectedOption.value == "Access-Right" ?
                                                    "Enter email of user you want to give access" : "Delete PDF"}

                                            </p>
                                            {selectedOption.value == "Access-Right" ? <div className="mb-4">
                                                <label className="block mb-2 text-sm font-bold text-gray-700 dark:text-white" htmlFor="email">
                                                    Email
                                                </label>
                                                <input
                                                    className="w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                                                    id="email"
                                                    type="email"
                                                    name='email'
                                                    placeholder="Email"
                                                    onChange={(e) => setEmail(e.target.value)}
                                                    value={email}
                                                />
                                            </div> : ""}
                                            {selectedOption.value == "Access-Right" ?
                                                <button
                                                    type="submit"
                                                    className="w-full mr-10 inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-green-600 text-base font-medium text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 sm:ml-3 sm:w-auto sm:text-sm "
                                                >
                                                    Give Access
                                                </button> : <button
                                                    type="submit"
                                                    className="w-full mr-10 inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm "
                                                >
                                                    Delete PDF
                                                </button>}

                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    );
}

export default Modal;