import { DataSource } from 'typeorm'
import { User } from './entities/user.entity'
const user = require('./user')

 export const AppDataSource = new DataSource({
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "postgres",
  password: "postgres",
  database: "card_seller",
  synchronize: true,
  logging: true,
  entities: [User],
  subscribers: [],
  migrations: [],
})

// to initialize initial connection with the database, register all entities
// and "synchronize" database schema, call "initialize()" method of a newly created database
// once in your application bootstrap
AppDataSource.initialize()

module.exports = { AppDataSource, user };