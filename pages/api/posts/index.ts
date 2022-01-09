// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type {NextApiRequest, NextApiResponse} from 'next'
import {isPost, Post} from "../../../types/Post";
import {MyError} from "../../../types/error";

// don't do this in production, but I'm using an in-memory db to store index.

export const posts: Post[] = [
    {
        id: 1,
        title: "Cool Post",
        description: "this is the description for a cool post",
    },
    {
        id: 2,
        title: "Another Post",
        description: "Another description for another post...."
    }
];


export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Post[] | Post | MyError>
) {

    switch (req.method) {
        case "GET":
            // wait 3 seconds to mock a http request
            await new Promise((resolve) => {
                setTimeout(resolve, 3000);
            });
            return res.status(200).json(posts);
        case "POST":
            if (isPost(req.body)) {
                const id = posts[posts.length-1].id + 1;
                const p = {...req.body, id}
                posts.push(p);
                return res.status(201).json(p);
            } else {
                return res.status(400).json({
                    error: "Invalid post body",
                    resolution: "make sure you include a post in the body"
                })
            }
        default:
            return res.status(405).json({
                error: "Method Not Supported"
            });
    }
}
