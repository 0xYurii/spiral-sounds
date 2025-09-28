import { getDBConnection } from './db.js';

async function setupDatabase() {
  let db;
  try {
    db = await getDBConnection();
    console.log('Setting up database...');

    // Drop the table if it exists to start fresh
    await db.exec('DROP TABLE IF EXISTS users');
    await db.exec('DROP TABLE IF EXISTS products');

    console.log('Dropped "users" table (if it existed).');

    // Create the users table
    await db.exec(`
      CREATE TABLE users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        username TEXT NOT NULL UNIQUE,
        email TEXT NOT NULL UNIQUE,
        password TEXT NOT NULL
      );
    `);
    console.log('Created "users" table.');

    await db.exec(`
      CREATE TABLE products (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT NOT NULL,
        artist TEXT NOT NULL,
        genre TEXT NOT NULL,
        price REAL NOT NULL,
        image TEXT NOT NULL
      );
    `);
    console.log('Created "products" table.');

    // Insert sample products
    const stmt = await db.prepare(
      'INSERT INTO products (title, artist, genre, price, image) VALUES (?, ?, ?, ?, ?)'
    );
    const products = [
      ['The Dark Side of the Moon', 'Pink Floyd', 'Rock', 25.00, 'vinyl1.png'],
      ['Abbey Road', 'The Beatles', 'Rock', 22.50, 'vinyl2.png'],
      ['Thriller', 'Michael Jackson', 'Pop', 20.00, 'vinyl3.png'],
      ['Kind of Blue', 'Miles Davis', 'Jazz', 27.50, 'vinyl4.png'],
      ['Rumours', 'Fleetwood Mac', 'Rock', 24.00, 'vinyl5.png'],
      ['Nevermind', 'Nirvana', 'Grunge', 21.00, 'vinyl6.png'],
      ['Led Zeppelin IV', 'Led Zeppelin', 'Rock', 26.00, 'vinyl7.png'],
      ['What\'s Going On', 'Marvin Gaye', 'Soul', 23.50, 'vinyl8.png'],
      ['Blue', 'Joni Mitchell', 'Folk', 19.50, 'vinyl9.png'],
      ['To Pimp a Butterfly', 'Kendrick Lamar', 'Hip-Hop', 28.00, 'vinyl10.png']
    ];

    for (const product of products) {
      await stmt.run(product);
    }
    await stmt.finalize();
    console.log('Inserted sample products.');

    console.log('Database setup complete!');
  } catch (err) {
    console.error('Error setting up database:', err.message);
  } finally {
    if (db) {
      await db.close();
    }
  }
}

setupDatabase();
