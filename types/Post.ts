export type Post = {
    id: number;
    title: string;
    description: string;
}


export const isPost = (
    toBeDetermined: any | Post
): toBeDetermined is Post => {
    return !!(toBeDetermined as Post)?.title && !!(toBeDetermined as Post)?.description;
};
