import { BlogCard } from "../components/BlogCard"
import { AppBar } from "../components/AppBar"
import { useBlogs } from "../hooks";
import { Skeleton } from "../components/Skeleton";
import { Link } from "react-router-dom";
function Blogs() {
  const authorName = "sanyam Jain";
  const {loading , blogs} = useBlogs();
  if(loading){
    return <div><Skeleton></Skeleton></div>
  }
  return (
    <>
    <div><AppBar authorName={authorName}></AppBar></div>
    <div className="mx-40 my-5">
          <div className="flex flex-col justify-center max-w-xl py-4">
            
            {blogs.map(blog => 
            <Link to= {`/blog/${blog.id}`} key={blog.id}>
            <BlogCard
          authorName= {blog.author.name || "Ananomous"} 
        title={blog.title}
        content= {blog.content}
        publishedDate="29 Nov 2024"
        ></BlogCard>
        </Link>
        )}
         
        </div>
          
    </div>
    </>
  )
}

export default Blogs