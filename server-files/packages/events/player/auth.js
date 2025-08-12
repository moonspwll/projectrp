// Authentication events for RAGE MP server
const mysql = require('mysql2/promise');
const bcrypt = require('bcrypt');

const pool = mysql.createPool({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'ragemp_user',
    password: process.env.DB_PASSWORD || 'strong_password',
    database: process.env.DB_NAME || 'ragemp',
});

// Handle player registration
mp.events.add('server:register', async (player, username, password, userAgent) => {
    if (!username || !password) {
        return player.call('authError', ['Username and password are required']);
    }

    try {
        const passwordHash = await bcrypt.hash(password, 10);
        await pool.execute(
            'INSERT INTO players (username, password_hash, register_ip, register_user_agent, social_club, serial, hwid_hash, hwid_ex_hash) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
            [
                username,
                passwordHash,
                player.ip,
                userAgent || '',
                player.socialClub || null,
                player.serial || null,
                player.hwidHash || null,
                player.hwidExHash || null,
            ]
        );

        player.call('hideLogin');
    } catch (err) {
        if (err.code === 'ER_DUP_ENTRY') {
            player.call('authError', ['Username already exists']);
        } else {
            console.error(err);
            player.call('authError', ['Registration failed']);
        }
    }
});

// Handle player login
mp.events.add('server:login', async (player, username, password, userAgent) => {
    if (!username || !password) {
        return player.call('authError', ['Username and password are required']);
    }

    try {
        const [rows] = await pool.execute('SELECT * FROM players WHERE username = ?', [username]);
        if (rows.length === 0) {
            return player.call('authError', ['Invalid username or password']);
        }

        const playerRow = rows[0];
        const match = await bcrypt.compare(password, playerRow.password_hash);
        if (!match) {
            return player.call('authError', ['Invalid username or password']);
        }

        await pool.execute(
            'UPDATE players SET last_login_ip = ?, last_login_user_agent = ?, last_login_at = NOW() WHERE id = ?',
            [player.ip, userAgent || '', playerRow.id]
        );

        player.call('hideLogin');
    } catch (err) {
        console.error(err);
        player.call('authError', ['Login failed']);
    }
});

