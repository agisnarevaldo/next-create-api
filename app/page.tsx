"use client";

import { useEffect, useState } from "react";

const UserList = () => {
  const [user, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      const response = await fetch("/api/read");
      const data = await response.json();
      setUsers(data);
    };

    fetchUsers();
  }, []);

  return (
    <div className="max-w-2xl w-full mx-auto p-8 rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-4">List of Users</h1>
      <div className="flex items-center justify-between mb-4">
        <p className="truncate text-yellow-300">name</p>
        <p className="truncate text-yellow-300">email</p>
      </div>
      <ul className="space-y-2">
        {user.map((user: any) => (
          <li
            key={user.id}
            className="flex items-center justify-between border-b pb-2"
          >
            <div className="truncate">{user.name}</div>
            <div className="truncate text-sm">{user.email}</div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <UserList />
    </main>
  );
}
