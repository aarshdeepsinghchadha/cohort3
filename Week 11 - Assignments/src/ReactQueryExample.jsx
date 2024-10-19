import { useQuery } from '@tanstack/react-query';

const fetchUsers = async () => {
    const response = await fetch('https://jsonplaceholder.typicode.com/users');
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    return response.json();
};

function ReactQueryExample() {
    const { data, error, isLoading } = useQuery({
        queryKey: ['users'],
        queryFn: fetchUsers,
    });

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error loading users: {error.message}</div>;

    return (
        <div style={{ textAlign: 'center', marginTop: '50px' }}>
            <h1>User List</h1>
            <ul style={{ listStyleType: 'none', padding: 0 }}>
                {data.map(user => (
                    <li key={user.id} style={{ margin: '10px 0' }}>
                        <h2>{user.name}</h2>
                        <p>{user.email}</p>
                        <p>{user.phone}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default ReactQueryExample;
