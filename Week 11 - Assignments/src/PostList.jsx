import useSWR from 'swr';

const fetcher = (url) => fetch(url).then((res) => {
    if (!res.ok) {
        throw new Error("Network response was not ok");
    }
    return res.json();
})


function PostList() {
    const { data, error } = useSWR('https://jsonplaceholder.typicode.com/posts', fetcher);

    if (error) return <div>Failed to load posts: {error.message}</div>;
    if (!data) return <div>Loading posts...</div>;

    return (
        <div>
            <h1>Posts</h1>
            <ul>
                {data.map((post) => (
                    <li key={post.id}>
                        <h2>{post.title}</h2>
                        <p>{post.body}</p>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default PostList;
