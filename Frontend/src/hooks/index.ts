import { useState, useEffect } from "react";
import { BACKEND_URL } from "../components/config";
import axios from 'axios';

interface Blog {
    content: string;
    title: string;
    id: string;
    author: {
        name: string;
    };
}

export const useBlog = ({id} : {id : string })  => {
    const [loading, setLoading] = useState(true);
    const [blog, setBlog] = useState<Blog>();

    useEffect(() => {
        const fetchBlog = async () => {
            try {
                const response = await axios.get(`${BACKEND_URL}/api/v1/blog/getBlog/${id}`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token") || ""}`
                    }
                });
                setBlog(response.data.blog);
            } catch (error : any) {
                console.error("Error fetching blog:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchBlog();
    }, [id])

    return { loading, blog };
}

export const useBlogs = () => {
    const [loading, setLoading] = useState(true);
    const [blogs, setBlogs] = useState<Blog[]>([]);

    useEffect(() => {
        const fetchBlogs = async () => {
            try {
                
                
                const response = await axios.get(`${BACKEND_URL}/api/v1/blog/getBlogs`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token") || ""}`
                    }
                });
                setBlogs(response.data.blogs);
            } catch (error : any) {
                console.error("Error fetching blogs:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchBlogs();
    }, []);

    return { loading, blogs };
};
