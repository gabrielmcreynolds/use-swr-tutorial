import {Post} from "../types/Post";

const PostCard = ({post}: { post: Post }) => {
    return (
        <div className="card">
            <h2>{post.title}</h2>
            <p>{post.description}</p>
        </div>
    );
};

export default PostCard;
