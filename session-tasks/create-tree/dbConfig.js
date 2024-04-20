const { create } = require('domain');
const mysql = require('mysql2/promise');

let connection = ""
// Create the connection pool. The pool-specific settings are the defaults
async function createTreeTable() {
    try {
        connection = mysql.createPool({
            host: 'localhost',
            user: 'yash',
            database: 'treeDB',
            password: "Yash@1234",
            port: 3306
        });
        const [rows] = await connection.query('SHOW TABLES LIKE "tree"');

        // If the table doesn't exist, create it
        if (rows.length === 0) {
            const createTableQuery = `
        CREATE TABLE tree (
            node_id INT AUTO_INCREMENT PRIMARY KEY,
          parent_id INT NULL REFERENCES tree (node_id),
          value VARCHAR(255)
        )
      `;

            // Execute the query to create the table
            await connection.query(createTableQuery);
            console.log('Tree table created successfully!');

            const [existingRows] = await connection.query('SELECT * FROM tree WHERE node_id = 1');
            if (existingRows.length === 0) {
                await connection.query('INSERT INTO tree (value) VALUES ("root")');
                console.log('Root record inserted successfully!');
            }
        } else {
            console.log('Tree table already exists.');
        }

        // Close the connection
        await connection.end();
    } catch (error) {
        console.error('Error creating tree table:', error);
    }
}

createTreeTable();

module.exports = { connection };