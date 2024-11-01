import { AppBar } from "./AppBar";
import { Avtar } from "./AppBar";
interface Blog {
    content: string;
    title: string;
    id: string;
    author: {
        name: string;
    };
}
export const FullBlog = ({blog} : {blog : Blog
}) => {
    return (
        <div>
            <AppBar authorName= {blog.author.name !== null ? blog.author.name : "Ananomour"}/>
            <div className="grid grid-cols-12 p-20 w-screen ">
                <div className="col-span-8 ">
                    <div className="text-3xl font-extrabold">
                        {blog.title}
                    </div>
                    <div className="text-m text-slate-400 font-thin py-3">
                        Posted on : 1 Nov 2024
                    </div>
                    <div className="text-xl text-slate-600">
                        {blog.content}
                    </div>
                </div>
                <div className="col-span-4 ">
                    <div className="flex items-center">
                            <Avtar authorName={blog.author.name !== null ? blog.author.name : "Ananomour"} />
                            <div className="px-5">
                    {blog.author.name !== null ? blog.author.name : "Ananomous"}
                    </div>
                    </div>
                    <div className="text-xs text-slate-500 pl-14">
                    Courtney Milan writes books about carriages, corsets, and smartwatches. Her books have received starred reviews in Publishers Weekly, Library Journal, and Booklist. She is a New York Times and a USA Today Bestseller.
                    </div>
                </div>
            </div>
        </div>
    )
}