import { useEffect, useState } from 'react'
import './App.css'

function App() {
    const [post, setPost] = useState({});

    async function getPosts() {
        const response = await fetch("https://jsonplaceholder.typicode.com/posts/1");
        const json = await response.json();
        setPost(json);
    }

    useEffect(() => {
        getPosts();
    }, [])

    return <div>
        {post.title}
    </div>
}

export default App
