import { Link } from "react-router-dom";
export const AppBar = ({ authorName }: { authorName: string }) => {
    return (
        <div className="border-b flex justify-between px-10 py-4">
            <Link to={'/blogs'}><div className="text-xl font-bold cursor-pointer">Medium</div></Link>
            <div className="flex ">
            <Link to={'/publish'}><button type="button" className="text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">Add new</button></Link>
            <div className="px-4"><Avtar authorName={authorName} /></div>
            </div>
            
        </div>
    );
}

export function Avtar({ authorName }: { authorName: string }) {
    const initials = authorName.split(" ").length > 1
        ? `${authorName.charAt(0).toUpperCase()}${authorName.split(" ")[1].charAt(0).toUpperCase()}`
        : `${authorName.charAt(0).toUpperCase()}`;

    return (
        <div className="relative inline-flex items-center justify-center w-10 h-10 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600">
            <span className="font-medium text-gray-600 dark:text-gray-300">{initials}</span>
        </div>
    );
}
