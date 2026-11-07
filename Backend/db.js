const { Pool } = require('pg');

const databaseConfig = process.env.DATABASE_URL
    ? { connectionString: process.env.DATABASE_URL }
    : {
        host: process.env.PGHOST,
        port: Number(process.env.PGPORT || 5432),
        database: process.env.PGDATABASE,
        user: process.env.PGUSER,
        password: process.env.PGPASSWORD,
    };

const pool = new Pool({
    ...databaseConfig,
    ...(process.env.PGSSL === 'true' ? { ssl: true } : {}),
});

const schema = [
    `CREATE TABLE IF NOT EXISTS users (
        id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
        username TEXT NOT NULL UNIQUE,
        roll_no TEXT NOT NULL,
        email TEXT NOT NULL,
        password TEXT NOT NULL,
        created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
        updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    )`,
    'CREATE UNIQUE INDEX IF NOT EXISTS users_roll_no_lower_idx ON users (LOWER(roll_no))',
    'CREATE UNIQUE INDEX IF NOT EXISTS users_email_lower_idx ON users (LOWER(email))',
    `CREATE TABLE IF NOT EXISTS posts (
        id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
        title TEXT NOT NULL,
        description TEXT NOT NULL,
        photo TEXT,
        username TEXT NOT NULL,
        user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
        categories TEXT[] NOT NULL DEFAULT ARRAY[]::TEXT[],
        created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
        updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    )`,
    'CREATE INDEX IF NOT EXISTS posts_user_id_idx ON posts (user_id)',
    `CREATE TABLE IF NOT EXISTS comments (
        id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
        comment TEXT NOT NULL,
        author TEXT NOT NULL,
        post_id TEXT NOT NULL REFERENCES posts(id) ON DELETE CASCADE,
        user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
        created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
        updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    )`,
    'CREATE INDEX IF NOT EXISTS comments_post_id_idx ON comments (post_id)',
    `CREATE TABLE IF NOT EXISTS user_bookmarks (
        user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
        post_id TEXT NOT NULL REFERENCES posts(id) ON DELETE CASCADE,
        created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
        PRIMARY KEY (user_id, post_id)
    )`,
    `CREATE TABLE IF NOT EXISTS post_likes (
        user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
        post_id TEXT NOT NULL REFERENCES posts(id) ON DELETE CASCADE,
        created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
        PRIMARY KEY (user_id, post_id)
    )`,
];

async function initializeDatabase() {
    if (!process.env.DATABASE_URL && !(
        process.env.PGHOST
        && process.env.PGDATABASE
        && process.env.PGUSER
        && process.env.PGPASSWORD
    )) {
        throw new Error('Set DATABASE_URL or all of PGHOST, PGDATABASE, PGUSER, and PGPASSWORD');
    }

    await pool.query('SELECT 1');
    for (const statement of schema) {
        await pool.query(statement);
    }
    console.log('PostgreSQL connected and schema is ready');
}

module.exports = { pool, query: (text, values) => pool.query(text, values), initializeDatabase };