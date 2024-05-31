import { createConnection } from "mysql2/promise";
import bcrypt from "bcrypt";
require('dotenv').config();

async function connectToDatabase() {
    return createConnection({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
    });
}

export default async function handler(req, res) {
    if (req.method !== "POST") {
        return res.status(405).json({ error: "Method not allowed" });
    }

    const userdata = req.body;
    console.log(userdata);

    const { name, email, phone, password } = userdata;

    if (!name || !email || !phone || !password) {
        return res.status(400).json({ error: "All fields are required" });
    }

    try {
        const hashedPassword = await bcrypt.hash(password, 10);

        // connect to the database
        const connection = await connectToDatabase();

        // execute query to insert data into the "users" table
        const [result] = await connection.execute('INSERT INTO users (name, email, phone, password) VALUES (?, ?, ?, ?)', [name, email, phone, hashedPassword]);

        // check if the user is exist
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: "User not found" });
        }

        // Close the connection
        await connection.end();

        // response with the user data
        res.status(200).json({ message: "User created successfully" });
    } catch (error) {
        console.error('Error connection to the database', error);
        res.status(500).json({ error: "Internal server error" });
    }
}