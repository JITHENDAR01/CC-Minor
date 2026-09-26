const { query } = require('../db');

function mapComment(row) {
    if (!row) return null;
    return {
        _id: row.id,
        comment: row.comment,
        author: row.author,
        postId: row.post_id,
        userId: row.user_id,
        createdAt: row.created_at,
        updatedAt: row.updated_at,
    };
}

async function create(comment) {
    const result = await query(
        `INSERT INTO comments (comment, author, post_id, user_id)
         VALUES ($1, $2, $3, $4) RETURNING *`,
        [comment.comment, comment.author, comment.postId, comment.userId],
    );
    return mapComment(result.rows[0]);
}

async function findById(id) {
    const result = await query('SELECT * FROM comments WHERE id = $1', [id]);
    return mapComment(result.rows[0]);
}

async function updateById(id, changes) {
    const result = await query(
        'UPDATE comments SET comment = $1, updated_at = NOW() WHERE id = $2 RETURNING *',
        [changes.comment, id],
    );
    return mapComment(result.rows[0]);
}

async function deleteById(id) {
    const result = await query('DELETE FROM comments WHERE id = $1 RETURNING *', [id]);
    return mapComment(result.rows[0]);
}

async function findByPostId(postId) {
    const result = await query('SELECT * FROM comments WHERE post_id = $1 ORDER BY created_at ASC', [postId]);
    return result.rows.map(mapComment);
}

module.exports = { create, findById, updateById, deleteById, findByPostId };
