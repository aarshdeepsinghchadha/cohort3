import axios from "axios";

interface BlogPageParams {
    params: {
        blogId: string;
    };
}

export default async function BlogPage({ params }: BlogPageParams) {
    const response = await axios.get(`https://jsonplaceholder.typicode.com/posts/${params.blogId}`);
    const blogData = response.data;

    return (
        <div className="w-screen h-screen flex flex-col justify-center items-center bg-zinc-900">
            <div className="p-6 bg-zinc-600 shadow-md rounded-md w-4/5 max-w-xl text-center">
                <h1 className="text-2xl font-bold text-blue-600 mb-4">Blog Post</h1>
                <h2 className="text-xl font-semibold mb-2">{blogData.title}</h2>
                <p className="">{blogData.body}</p>
            </div>
        </div>
    );
}
