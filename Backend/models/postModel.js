const { query } = require('../db');

function mapPost(row) {
    if (!row) return null;
    return {
        _id: row.id,
        title: row.title,
        description: row.description,
        photo: row.photo,
        username: row.username,
        userId: row.user_id,
        categories: row.categories || [],
        createdAt: row.created_at,
        updatedAt: row.updated_at,
    };
}

async function create(post) {
    const result = await query(
        `INSERT INTO posts (title, description, photo, username, user_id, categories)
         VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
        [post.title, post.description, post.photo || null, post.username, post.userId, post.categories || []],
    );
    return mapPost(result.rows[0]);
}

async function findById(id) {
    const result = await query('SELECT * FROM posts WHERE id = $1', [id]);
    return mapPost(result.rows[0]);
}

async function updateById(id, changes) {
    const allowedColumns = {
        title: 'title',
        description: 'description',
        photo: 'photo',
        username: 'username',
        userId: 'user_id',
        categories: 'categories',
    };
    const updates = Object.entries(allowedColumns)
        .filter(([key]) => Object.prototype.hasOwnProperty.call(changes, key))
        .map(([key, column]) => [column, changes[key]]);
    if (updates.length === 0) return findById(id);

    const values = updates.map(([, value]) => value);
    const assignments = updates.map(([column], index) => `${column} = $${index + 1}`);
    values.push(id);
    const result = await query(
        `UPDATE posts SET ${assignments.join(', ')}, updated_at = NOW() WHERE id = $${values.length} RETURNING *`,
        values,
    );
    return mapPost(result.rows[0]);
}

async function deleteById(id) {
    const result = await query('DELETE FROM posts WHERE id = $1 RETURNING *', [id]);
    return mapPost(result.rows[0]);
}

async function findAll(search) {
    const result = await query(
        `SELECT * FROM posts
         WHERE $1::text IS NULL
            OR title ILIKE '%' || $1 || '%'
            OR EXISTS (SELECT 1 FROM unnest(categories) AS category WHERE category ILIKE '%' || $1 || '%')
         ORDER BY created_at DESC`,
        [search || null],
    );
    return result.rows.map(mapPost);
}

async function findByUserId(userId) {
    const result = await query('SELECT * FROM posts WHERE user_id = $1 ORDER BY created_at DESC', [userId]);
    return result.rows.map(mapPost);
}

module.exports = { mapPost, create, findById, updateById, deleteById, findAll, findByUserId };
