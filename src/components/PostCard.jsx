import React from 'react';
import databaseService from "../appwrite/databases";
import {Link} from 'react-router-dom'

function PostCard({$id, title, featuredImage}) {
      let imageUrl = "";
      if (featuredImage) {
          imageUrl = databaseService.getFileView(featuredImage);
      }
      return (
        <Link to={`/post/${$id}`}>
            <div className='w-full bg-gray-100 rounded-xl p-4'>
                <div className='w-full justify-center mb-4'>
                    {featuredImage ? (
                        <img src={imageUrl} alt={title}
                        className='rounded-xl' />
                    ) : (
                        <div className='rounded-xl bg-gray-200 flex items-center justify-center' style={{height: 200}}>
                            <span className='text-gray-400'>No Image</span>
                        </div>
                    )}
                </div>
                <h2
                className='text-xl font-bold'
                >{title}</h2>
            </div>
        </Link>
  )
}

export default PostCard;