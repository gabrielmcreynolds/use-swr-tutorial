import type {NextPage} from 'next'
import {Post} from "../types/Post";
import useSWR from 'swr'
import Link from "next/link";
import fetcher from "../libs/fetcher";
import PostCard from "../components/PostCard";

const Home: NextPage = () => {
    const {data: posts, error} = useSWR<Post[]>('/api/posts', fetcher)

    console.log(`Data: ${JSON.stringify(posts)}`)
    return (
        <div className="main">
            <Link href="/add-post"><a>Add Post</a></Link>

            {!posts && !error ? <h1>Loading...</h1> :
                posts?.map((p) => <PostCard key={p.id} post={p}/>)}
        </div>
    )
}

export default Home
