import React from 'react'
import appwriteService from "../appwrite/config"
import { Link } from 'react-router-dom'
import parse from "html-react-parser";

function PostCard({ $id, title, featuredImage, content }) {

  return (
    <Link to={`/post/${$id}`} className='w-full'>
      <div className='w-full bg-gray-400 rounded-xl p-4 flex'>

        <img src={appwriteService.getFilePreview(featuredImage)} alt={title}
          className='rounded-xl w-1/4' />
        <div className='w-full'>
          <h2
            className='text-xl font-bold'
          >{title}</h2>
          <div className="browser-css">
            {parse(content || "")}
          </div>
        </div>

      </div>


    </Link>
  )
}


export default PostCard