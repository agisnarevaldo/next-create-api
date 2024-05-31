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

const AddUser = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    // Kirim data pengguna ke API untuk ditambahkan
    const response = await fetch("/api/create", {
      method: "POST",
      body: JSON.stringify({ name, email, phone, password }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      // Jika data pengguna ditambahkan, tampilkan data pengguna yang baru
      const data = await response.json();
      console.log(data);

      setName("");
      setEmail("");
      setPhone("");
      setPassword("");
    } else {
      // Tangani kesalahan jika terjadi kesalahan saat menambahkan data pengguna
      console.error("Gagal menambahkan data pengguna");
    }
  };

  return (
    <div className="max-w-2xl w-full mx-auto px-8 rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-4">Add User</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          className=" bg-gray-700 outline-none px-2 py-1 rounded-md"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Name"
        />
        <input
          className=" bg-gray-700 outline-none px-2 py-1 rounded-md"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
        />
        <input
          className=" bg-gray-700 outline-none px-2 py-1 rounded-md"
          type="number"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          placeholder="Phone"
        />
        <input
          className=" bg-gray-700 outline-none px-2 py-1 rounded-md"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
        />
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 w-max mx-auto rounded"
        >
          Add User
        </button>
      </form>
    </div>
  );
};

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <AddUser />
      <UserList />
    </main>
  );
}
