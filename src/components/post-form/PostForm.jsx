import React, { useCallback, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import {Button, Input, RTE, Select} from '../index'
import databaseService from "../../appwrite/databases";

export default function PostForm ({post}) {
    const {register, handleSubmit, watch, setValue, control, getValues} = useForm({
        defaultValues : {
        //  field : in case editPost || newPost,
            title: post?.title || "",
            slug: post?.slug || "",
            content: post?.content || "",
            status: post?.status || 'active',
        }
    })
    // watch -> kisi bhi field ko agar apko countinousily watch karna hai toh watch capabilities
    // control ->  for controlling any form (this will be pass in the RTE)

    const navigate = useNavigate();
    const userData =  useSelector(state => state.auth?.userData) // we want this userData for its id for saving in the post field userId(later)

    // now thing to do after submit --> 

    const submit = async (data) => {
        // if we have to update the post (means i have already a post which have to be updated)
        if(post){
            // first do the file handling 
            // as data is in object form so the key image is data.image[num]

            const file = data.image[0] ? await databaseService.uploadFile(data.image[0]) : null

            // as we are updating the post so if we uploading new image after changes then it means we have to delete the old one 

            if(file) databaseService.deleteFile(post.featuredImage);

            // now we will update rest of things

            const dbPost = await databaseService.updatePost(post.$id, {
                ...data,  // rest data will spread as it is but image is new uploaded so
                featuredImage : file ? file.$id : undefined,
                userId: userData.$id
            })
            if (dbPost && dbPost.$id) {
                navigate(`/post/${dbPost.$id}`);
            } else {
                alert("Failed to update post. Please check your data and try again.");
            }
        }
        // now if we want to create new Post
        else {
            const file = await databaseService.uploadFile(data.image[0]);  // improve it later

            // now for saving the image file id in the featured image
            
            if(file) {
                const fileId = file.$id;
                data.featuredImage = fileId;
                const dbPost = await databaseService.createPost({
                    ...data,
                    userId: userData.$id,
                })
                if (dbPost && dbPost.$id) {
                    navigate(`/post/${dbPost.$id}`)
                } else {
                    alert("Failed to create post. Please check your data and try again.");
                }
            }

        }
    }

    // now for two fields (title, slug)
    // we have to watch (monitor) the tiles and genrate the slug so 

    const slugTransform = useCallback((value) => {
        if (value && typeof value === "string")
            return value
                .trim()
                .toLowerCase()
                .replace(/[^a-zA-Z\d\s]+/g, "-")
                .replace(/\s/g, "-");

        return "";
    }, []);
    
    // imp
    // if you take the useEffect and call a method then how would you optimise it 
    // ans is store it in a variable and the return ke andar ek callback kr sakte ho and use the unsubscribe()
    // beacuse woh baar baar call krne ke liye baar baar ghoomne na lage 

    useEffect(() => {
        const subscription = watch((value, { name }) => {
            if (name === "title") {
                setValue("slug", slugTransform(value.title), { shouldValidate: true });
            }
        });

        return () => subscription.unsubscribe();
    }, [watch, slugTransform, setValue]);
    // jis pr bhi watch laga hai (title) agar usme koi changes aaye toh useEffect will call 

    return (
        <form onSubmit={handleSubmit(submit)} className="flex flex-wrap">
            <div className="w-2/3 px-2">
                <Input
                    label="Title :"
                    placeholder="Title"
                    className="mb-4"
                    {...register("title", { required: true })}
                />
                <Input
                    label="Slug :"
                    placeholder="Slug"
                    className="mb-4"
                    {...register("slug", { required: true })}
                    onInput={(e) => {
                        setValue("slug", slugTransform(e.currentTarget.value), { shouldValidate: true });
                    }}
                />
                <RTE label="Content :" name="content" control={control} defaultValue={getValues("content")} />
            </div>
            <div className="w-1/3 px-2">
                <Input
                    label="Featured Image :"
                    type="file"
                    className="mb-4"
                    accept="image/png, image/jpg, image/jpeg, image/gif"
                    {...register("image", { required: !post })}
                />
                {post && (
                    <div className="w-full mb-4">
                        <img
                            src={databaseService.getFilePreview(post.featuredImage)}
                            alt={post.title}
                            className="rounded-lg"
                        />
                    </div>
                )}
                <Select
                    options={["active", "inactive"]}
                    label="Status"
                    className="mb-4"
                    {...register("status", { required: true })}
                />
                <Button type="submit" bgColor={post ? "bg-green-500" : undefined} className="w-full">
                    {post ? "Update" : "Submit"}
                </Button>
            </div>
        </form>
    );
} 
