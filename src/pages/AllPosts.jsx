import React, {useState, useEffect} from 'react'
import { PostCard } from '../components'
import appwriteService from "../appwrite/config";

function AllPosts() {
    const [posts, setPosts] = useState([])
    useEffect(() => {}, [])
    appwriteService.getPosts([]).then((posts) => {
        if (posts) {
            setPosts(posts.documents)
        }
    })
  return (
    <div className='py-8 w-full bg-gray-200 rounded-lg'>
      <h2 className='text-start pl-2 text-4xl font-bold'>My Posts</h2>
            <div className='flex items-center justify-center flex-col'>
                {posts.map((post) => (
                    <div key={post.$id} className='p-2 w-full h-1/4'>
                        <PostCard {...post} />
                    </div>
                ))}
            </div>
          
    </div>
  )
}

export default AllPosts