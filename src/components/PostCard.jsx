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
            <div className='w-full glass-card p-4 border border-[var(--accent-blue)] hover:border-[var(--accent-pink)] transition-all duration-300'>
                <div className='w-full flex justify-center mb-4'>
                    {featuredImage ? (
                        <img src={imageUrl} alt={title}
                        className='rounded-xl max-h-48 object-cover border border-[var(--accent-blue)]' />
                    ) : (
                        <div className='rounded-xl bg-[#181824] flex items-center justify-center border border-[var(--accent-purple)]' style={{height: 200}}>
                            <span className='text-[var(--accent-purple)]'>No Image</span>
                        </div>
                    )}
                </div>
                <h2
                className='text-xl font-semibold text-[var(--accent-blue)] font-sans'
                >{title}</h2>
            </div>
        </Link>
  )
}

export default PostCard;