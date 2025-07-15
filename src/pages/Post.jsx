import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import databaseService from "../appwrite/databases";
import { Button, Container } from "../components";
import parse from "html-react-parser";
import { useSelector } from "react-redux";

export default function Post() {
    const [post, setPost] = useState(null);
    const { slug } = useParams();
    const navigate = useNavigate();

    const userData = useSelector((state) => state.auth.userData);

    const isAuthor = post && userData ? post.userId === userData.$id : false;

    useEffect(() => {
        if (slug) {
            databaseService.getPost(slug).then((post) => {
                if (post) setPost(post);
                else navigate("/");
            });
        } else navigate("/");
    }, [slug, navigate]);

    const deletePost = () => {
        databaseService.deletePost(post.$id).then((status) => {
            if (status) {
                databaseService.deleteFile(post.featuredImage);
                navigate("/");
            }
        });
    };

    return post ? (
        <div className="py-12 min-h-screen bg-gradient-to-br from-[#181824] via-[#23243a] to-[#181824] flex items-center justify-center">
            <Container>
                <div className="glass-card max-w-3xl mx-auto p-8 border border-[var(--accent-blue)] shadow-lg relative">
                    <div className="w-full flex flex-col items-center mb-6">
                        <img
                            src={databaseService.getFileView(post.featuredImage)}
                            alt={post.title}
                            className="rounded-2xl max-h-96 object-cover w-full shadow-lg border border-[var(--accent-blue)] mb-4"
                        />
                        {isAuthor && (
                            <div className="absolute right-8 top-8 flex gap-2 z-10">
                                <Link to={`/edit-post/${post.$id}`}>
                                    <Button className="mr-2">Edit</Button>
                                </Link>
                                <Button onClick={deletePost} className="bg-red-600 text-white border-red-600 hover:bg-red-700 hover:border-red-700">Delete</Button>
                            </div>
                        )}
                    </div>
                    <h1 className="text-3xl font-bold text-center mb-4 text-[var(--accent-blue)]" style={{fontFamily: 'Orbitron, Poppins, Arial, sans-serif'}}>{post.title}</h1>
                    <div className="prose prose-invert prose-lg max-w-none text-gray-100" style={{fontFamily: 'Poppins, Arial, sans-serif'}}>
                        {parse(post.content)}
                    </div>
                </div>
            </Container>
        </div>
    ) : null;
}