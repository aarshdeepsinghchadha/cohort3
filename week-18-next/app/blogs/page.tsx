import axios from "axios";

async function getBlogs () {
    const response = await axios.get('https://jsonplaceholder.typicode.com/posts');
    return response.data;
}


export default async function blogs () {
    const blogs = await getBlogs();

    return <div>
        {blogs.map((blog: ITodo, index: number) =>  <Todo key={index} title={blog.title} completed={blog.completed} />)}
    </div>
}

interface ITodo {
    title: string;
    completed: boolean;
}


function Todo({title, completed}: ITodo) {
    return (
        <div>
            {title} {completed ? "done" : "not done"}
        </div>
    )
}