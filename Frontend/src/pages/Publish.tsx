import React, { ChangeEvent, useState } from "react";
import { AppBar } from "../components/AppBar";
import axios from "axios";
import { BACKEND_URL } from "../components/config";
import { useNavigate } from "react-router-dom";

export const Publish = () => {
    const navigate = useNavigate();
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [error, setError] = useState<string | null>(null); // Track errors here

    const handlePublish = async () => {
        try {
            console.log("tooeken  ii aws",localStorage.getItem("token"))
            const response = await axios.post(
                `${BACKEND_URL}/api/v1/blog/create`,
                {
                    title,
                    content: description,
                },
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token") || ""}`,
                    },
                }
            );
            navigate(`/blogs`);
        } catch (error) {
            setError("Error in creating blog. Please try again!");
        }
    };

    return (
        <div>
            <AppBar authorName="Anonymous" />
            <div className="max-w-screen-md mx-auto my-10">
                <label htmlFor="title" className="block mb-2 text-xl font-medium text-gray-900 dark:text-white">Title</label>
                <input
                    type="text"
                    id="title"
                    className="bg-gray-50 border border-black text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                    placeholder="Write title of your blog here:"
                    required
                    onChange={(e) => setTitle(e.target.value)}
                />
            </div>
            <div className="max-w-screen-md mx-auto my-10">
                <TextEditor onChange={(e) => setDescription(e.target.value)} />
                <button
                    type="button"
                    className="focus:outline-none text-white bg-green-700 hover:bg-green-800 font-medium rounded-lg text-sm px-5 py-2.5 mt-4"
                    onClick={handlePublish}
                >
                    Publish
                </button>
                {error && <div className="text-red-500 mt-4">{error}</div>}
            </div>
        </div>
    );
};

export const TextEditor = ({ onChange }: { onChange: React.ChangeEventHandler<HTMLTextAreaElement> }) => {
    return (
        <div className="w-full border border-black rounded-lg bg-gray-50 dark:bg-gray-700 dark:border-gray-600">
            <div className="px-3 py-2 border-black dark:border-gray-600">
                <div className="flex flex-wrap items-center">
                    <button type="button" className="p-1.5 text-gray-500 rounded hover:text-gray-900 dark:text-gray-400 dark:hover:text-white">
                        <span className="sr-only">Align left</span>
                    </button>
                </div>
            </div>
            <div className="px-4 py-2 bg-white rounded-b-lg dark:bg-gray-800">
                <textarea
                    rows={10}
                    className="block w-full px-0 p-5 text-sm text-gray-800 bg-white border-0 dark:bg-gray-800 focus:ring-0 dark:text-white dark:placeholder-gray-400"
                    onChange={onChange}
                />
            </div>
        </div>
    );
};
