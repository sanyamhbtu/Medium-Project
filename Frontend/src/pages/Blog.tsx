import React from 'react'
import { useBlog } from '../hooks'
import { Skeleton } from '../components/Skeleton';
import { FullBlog } from '../components/FullBlog';
import { useParams } from "react-router-dom";
function Blog() {
  const {id} = useParams< {id : string} >();
  const {loading , blog} = useBlog({id : id || ""});
  if(loading) {
    return <div><Skeleton></Skeleton></div>
  }
  console.log("Blog is i want",blog)
  if(!blog){
    return <div>Error: Blog is not found</div>
  }
  return (
    
    <FullBlog blog={blog} ></FullBlog>
  )
}

export default Blog