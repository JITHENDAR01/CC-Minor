const { query } = require('../db');
const Post = require('./postModel');

const userSelect = `
  SELECT users.*,
    COALESCE((SELECT array_agg(post_id ORDER BY created_at DESC) FROM user_bookmarks WHERE user_id = users.id), ARRAY[]::text[]) AS bookmarks,
    COALESCE((SELECT array_agg(post_id ORDER BY created_at DESC) FROM post_likes WHERE user_id = users.id), ARRAY[]::text[]) AS likes
  FROM users`;

function mapUser(row, includePassword = false) {
  if (!row) return null;
  const user = {
    _id: row.id,
    username: row.username,
    rollNo: row.roll_no,
    email: row.email,
    bookmarks: row.bookmarks || [],
    likes: row.likes || [],
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
  if (includePassword) user.password = row.password;
  return user;
}

async function findById(id) {
  const result = await query(`${userSelect} WHERE users.id = $1`, [id]);
  return mapUser(result.rows[0]);
}

async function findByEmail(email) {
  const result = await query('SELECT * FROM users WHERE LOWER(email) = LOWER($1)', [email]);
  return mapUser(result.rows[0], true);
}

async function findRegistrationConflict({ rollNo, email, username }) {
  const result = await query(
    'SELECT id FROM users WHERE LOWER(roll_no) = LOWER($1) OR LOWER(email) = LOWER($2) OR username = $3 LIMIT 1',
    [rollNo, email, username],
  );
  return result.rowCount > 0;
}

async function createUser({ username, rollNo, email, password }) {
  const result = await query(
    'INSERT INTO users (username, roll_no, email, password) VALUES ($1, $2, $3, $4) RETURNING id',
    [username, rollNo, email, password],
  );
  return findById(result.rows[0].id);
}

async function updateById(id, changes) {
  const allowedColumns = { username: 'username', rollNo: 'roll_no', email: 'email', password: 'password' };
  const updates = Object.entries(allowedColumns)
    .filter(([key]) => Object.prototype.hasOwnProperty.call(changes, key))
    .map(([key, column]) => [column, changes[key]]);
  if (updates.length === 0) return findById(id);

  const values = updates.map(([, value]) => value);
  const assignments = updates.map(([column], index) => `${column} = $${index + 1}`);
  values.push(id);
  await query(
    `UPDATE users SET ${assignments.join(', ')}, updated_at = NOW() WHERE id = $${values.length}`,
    values,
  );
  return findById(id);
}

async function deleteById(id) {
  const result = await query('DELETE FROM users WHERE id = $1 RETURNING *', [id]);
  return mapUser(result.rows[0]);
}

async function addBookmark(userId, postId) {
  const result = await query(
    'INSERT INTO user_bookmarks (user_id, post_id) VALUES ($1, $2) ON CONFLICT DO NOTHING RETURNING post_id',
    [userId, postId],
  );
  return result.rowCount > 0;
}

async function removeBookmark(userId, postId) {
  const result = await query(
    'DELETE FROM user_bookmarks WHERE user_id = $1 AND post_id = $2 RETURNING post_id',
    [userId, postId],
  );
  return result.rowCount > 0;
}

async function addLike(userId, postId) {
  const result = await query(
    'INSERT INTO post_likes (user_id, post_id) VALUES ($1, $2) ON CONFLICT DO NOTHING RETURNING post_id',
    [userId, postId],
  );
  return result.rowCount > 0;
}

async function removeLike(userId, postId) {
  const result = await query(
    'DELETE FROM post_likes WHERE user_id = $1 AND post_id = $2 RETURNING post_id',
    [userId, postId],
  );
  return result.rowCount > 0;
}

async function getBookmarks(userId) {
  const result = await query(
    `SELECT posts.* FROM posts
     JOIN user_bookmarks ON user_bookmarks.post_id = posts.id
     WHERE user_bookmarks.user_id = $1
     ORDER BY user_bookmarks.created_at DESC`,
    [userId],
  );
  return result.rows.map(Post.mapPost);
}

module.exports = {
  findById,
  findByEmail,
  findRegistrationConflict,
  createUser,
  updateById,
  deleteById,
  addBookmark,
  removeBookmark,
  addLike,
  removeLike,
  getBookmarks,
};
