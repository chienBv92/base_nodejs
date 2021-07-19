import { ConnectionOptions } from 'typeorm';

const rootDir = __dirname + '/../';
const configs: { [key: string]: ConnectionOptions } = {
  mysql: {
    type: 'mysql',
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    entities: [rootDir + '/entities/**/*.{js,ts}'],
    migrations: [rootDir + '/migrations/**/*.{js,ts}'],
    cli: {
      entitiesDir: `${rootDir}/entities`,
      migrationsDir: `${rootDir}/migrations`,
    },
    synchronize: false,
    logging: true,
  },
  sqlite: {
    type: 'better-sqlite3',
    name: 'sqlite',
    database: ':memory:',
    entities: [rootDir + '/entities/**/*.{js,ts}'],
    migrations: [rootDir + '/migrations/**/*.{js,ts}'],
    cli: {
      entitiesDir: `${rootDir}/entities`,
      migrationsDir: `${rootDir}/migrations`,
    },
    synchronize: false,
    logging: true,
  },
};

export default configs[process.env.DB_DRIVER];
