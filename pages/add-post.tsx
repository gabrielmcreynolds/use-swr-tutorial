import {NextPage} from "next";
import {useState} from "react";
import {Post} from "../types/Post";
import {useSWRConfig} from "swr";
import {useRouter} from "next/router";

const AddPost: NextPage = () => {
    const {mutate, cache} = useSWRConfig()
    const router = useRouter();
    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")

    const onSubmit = async () => {
        const result = await fetch('/api/posts', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                title,
                description
            })
        })
        const post: Post = await result.json();
        const oldPosts: Post[] = cache.get('/api/posts');
        if (oldPosts) {
            mutate('/api/posts', [...oldPosts, post], {revalidate: false})
        }
        router.push('/');
    }

    return (
        <div className="main">
            <label>Title
                <br/>
                <input value={title} onChange={(e) => setTitle(e.target.value)} type="text"/>
            </label>


            <label>Description
                <br/>
                <textarea value={description} onChange={(e) => setDescription(e.target.value)}/>
            </label>

            <button onClick={() => onSubmit()}>Add</button>
        </div>
    );
};

export default AddPost;
