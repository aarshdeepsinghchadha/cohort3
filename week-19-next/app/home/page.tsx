"use client";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Home() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const router = useRouter();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const storedUser = localStorage.getItem("user");
        if (!storedUser) {
          router.push("/signin");
          return;
        }

        const username = JSON.parse(storedUser).username;

        const response = await axios.get(`/api/v1/user?username=${username}`);
        if (response.status !== 200) {
          throw new Error(response.data.error);
        }

        const data = await response.data;

        setUser(data.data.user.username);
      } catch (err: any) {
        console.error("User fetch error:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    router.push("/");
  };

  if (loading) {
    return (
      <div className="w-screen h-screen flex items-center justify-center">
        <div className="text-2xl">loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-screen h-screen flex items-center justify-center">
        <div className="text-2xl">{error}</div>
      </div>
    );
  }

  return (
    <div className="w-screen h-screen flex items-center justify-center">
      <div className="p-8 hadow-lg rounded-lg text-center space-y-6">
        <h1 className="text-3xl font-bold ">
          Hi <span className="text-blue-600">{user}</span>, you have signed in
          successfully!
        </h1>
        <button
          className="px-6 py-3 font-semibold text-white bg-red-600 rounded-md hover:bg-red-700 transition"
          onClick={() => {
            handleLogout();
          }}
        >
          Log out
        </button>
      </div>
    </div>
  );
}
