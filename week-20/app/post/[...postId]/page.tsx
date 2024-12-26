import axios from "axios";

interface PostParams {
    params: {
        postId: string[];
    };
}

export default async function PostPage({ params }: PostParams) {
    const { postId } = params;
    const joinedPostId = postId.join("/");
    let postData;

    try {
        const response = await axios.get(`https://jsonplaceholder.typicode.com/posts/${postId[0]}`);
        postData = response.data;
    } catch (error) {
        console.error("Failed to fetch post data:", error);
        return (
            <div className="w-screen h-screen flex justify-center items-center bg-gray-100 text-red-600">
                <h1>Failed to load post data. Please try again later.</h1>
            </div>
        );
    }

    return (
        <div className="w-screen h-screen flex flex-col justify-center items-center bg-zinc-900 text-white">
            <div className="p-6 bg-zinc-800  shadow-md rounded-md w-4/5 max-w-xl text-center">
                <h1 className="text-2xl font-bold text-blue-600 mb-4">Post ID: {joinedPostId}</h1>
                <h2 className="text-xl font-semibold mb-2">{postData.title}</h2>
                <p className="">{postData.body}</p>
            </div>
        </div>
    );
}
