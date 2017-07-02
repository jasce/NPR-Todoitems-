const pg = require('pg');

var Pool = require('pg').Pool;

const config = {
 	host: 'localhost',
  	user: 'postgres',
  	password: 'jassi123',
  	database: 'todoitems',
};

const pool = new Pool(config);

  pool.query('CREATE TABLE users(user_id SERIAL PRIMARY KEY, name VARCHAR(100) not null, email VARCHAR(100) UNIQUE ,password VARCHAR(100) not null  )', function(err) {    
    if (err) return err;    
 });

  pool.query('CREATE TABLE todolists(todolist_id SERIAL PRIMARY KEY, user_id INTEGER REFERENCES users (user_id) , title VARCHAR(100) not null, description TEXT ,due_date DATE , status VARCHAR(15) not null)', function(err) {
      // handle an error from the query
      if(err) return err;     
    });
module.exports.config = config;
module.exports.pool = pool;











/*


pg.connect(process.env.DATABASE_URL || 'postgres://postgres:jassi123@localhost:5432/todoitems', function(err, client) {
  if (err) throw err;
  console.log('Connected to postgres! Getting schemas...');

  client.query(  
    'CREATE TABLE users(user_id SERIAL PRIMARY KEY, name VARCHAR(100) not null, email VARCHAR(100) UNIQUE ,password VARCHAR(100) not null  )',
    'CREATE TABLE todoitems(todo_item_id SERIAL PRIMARY KEY, user_id REFERENCES users (user_id) , title VARCHAR(100) not null, description TEXT ,due_date DATE , status VARCHAR(15) not null)' 

  );
    
});

/*
const connectionString = process.env.DATABASE_URL || 'postgres://postgres:jassi123@localhost:5432/todoitems';

const client = new pg.Client(connectionString);
client.connect();
const query = client.query(  
    'CREATE TABLE users(user_id SERIAL PRIMARY KEY, name VARCHAR(100) not null, email VARCHAR(100) UNIQUE ,password VARCHAR(100) not null  )',
    'CREATE TABLE todoitems(todo_item_id SERIAL PRIMARY KEY, user_id REFERENCES users (user_id) , title VARCHAR(100) not null, description TEXT ,due_date DATE , status VARCHAR(15) not null)' 

  );
query.on('end', () => { client.end(); });*/