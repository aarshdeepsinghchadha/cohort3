# Week 11 Assignments: SWR and React Query

## Overview

In this week's assignments, we explored two powerful libraries for data fetching and state management in React applications: **SWR** (stale-while-revalidate) and **React Query**. These libraries simplify data handling and improve the performance of applications by managing server state effectively.

## SWR

### What is SWR?

SWR is a React Hooks library developed by Vercel that allows you to fetch data efficiently. It implements the stale-while-revalidate strategy, which provides a fast and responsive UI by returning cached data while simultaneously revalidating it in the background.

### Key Features of SWR:

- Minimalistic API: Easy to set up and use.
- Automatic revalidation: Keeps data up to date without manual intervention.
- Built-in caching: Reduces unnecessary network requests.
- Ideal for real-time data scenarios.

### Implementation

In our example, we created a simple React component using SWR to fetch user data from an API. The component handles loading and error states, providing a smooth user experience.

```jsx
import useSWR from "swr";

const fetcher = (url) => fetch(url).then((res) => res.json());

function UserList() {
  const { data, error } = useSWR(
    "https://jsonplaceholder.typicode.com/users",
    fetcher
  );

  if (error) return <div>Error loading users</div>;
  if (!data) return <div>Loading...</div>;

  return (
    <ul>
      {data.map((user) => (
        <li key={user.id}>{user.name}</li>
      ))}
    </ul>
  );
}
```

## React Query

### What is React Query?

React Query is another powerful library for managing server state in React applications. It provides an extensive set of features for data fetching, caching, synchronization, and more, making it ideal for complex applications.

### Key Features of React Query:

- Rich API: Offers powerful tools for data management.
- Automatic cache invalidation: Keeps data fresh and consistent.
- Support for mutations: Facilitates optimistic updates and data modification.
- Built-in dev tools: Makes debugging and state inspection easier.

### Implementation

In our React Query example, we created a component that fetches user data using the `useQuery` hook. This component also manages loading and error states effectively.

```jsx
import { useQuery } from "@tanstack/react-query";

const fetchUsers = async () => {
  const response = await fetch("https://jsonplaceholder.typicode.com/users");
  if (!response.ok) throw new Error("Network response was not ok");
  return response.json();
};

function UserList() {
  const { data, error, isLoading } = useQuery(["users"], fetchUsers);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading users: {error.message}</div>;

  return (
    <ul>
      {data.map((user) => (
        <li key={user.id}>{user.name}</li>
      ))}
    </ul>
  );
}
```

## Conclusion

Both SWR and React Query are excellent choices for managing server state in React applications. SWR is ideal for simpler use cases, while React Query is better suited for complex applications requiring advanced state management features. Depending on your project requirements, you can choose the one that best fits your needs.

## Resources

- [SWR Documentation](https://swr.vercel.app/)
- [React Query Documentation](https://react-query.tanstack.com/)
