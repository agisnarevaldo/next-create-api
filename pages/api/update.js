import { createConnection } from "mysql2/promise";

async function connectToDatabase() {
    return createConnection({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
    });
}

// update user API route
export default async function handler(req, res) {
    if (req.method !== "PUT") {
        return res.status(405).json({ error: "Method not allowed" });
    }
    const { id, name, email } = req.body;
    console.log(req.body);

    if (!id || !name || !email) {
        return res.status(400).json({ error: "All fields are required" });
    }

    try {
        const connection = await connectToDatabase();

        // Execute a query to update the user in the "users" table
        const [result] = await connection.execute('UPDATE users SET name = ?, email = ? WHERE id = ?', [name, email, id]);

        await connection.end();

        if (result.affectedRows === 0) {
            return res.status(404).json({ error: "User not found" });
        }

        res.status(200).json({ message: "User updated successfully" });
    } catch (error) {
        console.error('Error connection to the database', error);
        res.status(500).json({ error: "Internal server error" });
    }
}


