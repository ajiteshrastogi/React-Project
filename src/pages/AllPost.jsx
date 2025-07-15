import React, { useState, useEffect } from 'react';
import { Container, PostCard } from "../components";
import databaseService from "../appwrite/databases";
function AllPost() {
    const [post, setPost] =  useState([])
    useEffect(()=>{
        databaseService.getPosts([]).then((posts)=>{
            if(posts){
                setPost(posts.documents)
            }
        })
    }, []);
    return ( 
        <div className='w-full py-8'>
            <Container>
                <div className='flex flex-wrap'>
                    {post.map((post)=>{
                        return (
                            <div key={post.$id} className='p-2 w-1/4'>
                                <PostCard {...post} />
                            </div>
                        )
                    })}
                </div>
            </Container>
        </div>
     );
}

export default AllPost;