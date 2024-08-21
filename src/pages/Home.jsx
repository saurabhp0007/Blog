import React, {useEffect, useState} from 'react'
import appwriteService from "../appwrite/config";
import {Container, PostCard} from '../components'

function Home() {
    const [posts, setPosts] = useState([])

    useEffect(() => {
        appwriteService.getPosts().then((posts) => {
            if (posts) {
                setPosts(posts.documents)
            }
        })
    }, [])
  
    if (posts.length === 0) {
        return (
            <div className="w-full py-8 mt-4 text-center">
                <Container>
                    <div className="flex flex-wrap">
                        <div className="p-2 w-full">
                            <h1 className="text-2xl font-bold hover:text-gray-500">
                                Login to read posts
                            </h1>
                        </div>
                    </div>
                </Container>
            </div>
        )
    }
    return (
        <div className='w-full py-8 bg-gray-300 rounded-lg'>
          <h2 className='text-start pl-2 text-4xl font-bold '>All Posts</h2>
                <div className='flex items-center justify-center flex-col'>
                    {posts.map((post) => (
                        <div key={post.$id} className='p-2 w-full'>
                            <PostCard {...post} />
                        </div>
                    ))}
                </div>
           
        </div>
    )
}

export default Home