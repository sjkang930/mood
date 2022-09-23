import mysql from 'mysql2'

import dotenv from 'dotenv'
dotenv.config()

const pool = mysql.createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
    port: process.env.MYSQL_PORT
}).promise()

export async function createMood(note, rate, date) {
    const [result] = await pool.query(`
    INSERT INTO moods(note, rate, date)
    VALUES(?,?,?)
    `, [note, rate, date])
    const id = result.insertId
    return getMood(id)
}

export async function getMoods() {
    const [rows] = await pool.query(`SELECT * FROM moods ORDER BY id DESC;`)
    return rows
}

export async function getMood(id) {
    const [rows] = await pool.query(`
    SELECT *
    FROM moods
    WHERE id =?
        `, [id]
    )
    return rows
}

export async function updateMood(note, rate, date, id) {
    const query = `UPDATE moods SET note = ?, rate = ?, date = ? WHERE id = ? `;
    const [result] = await pool.query(query, [note, rate, date, id]);
    const post = getMood(id)
    return post;
}

export async function deleteMood(id) {
    const query = `DELETE FROM moods WHERE id = ? `;
    const [result] = await pool.query(query, [id]);
    return result;
}