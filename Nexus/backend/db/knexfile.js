module.exports = {
    development: {
      client: 'mysql',
      connection: {
        host: '127.0.0.1',
        user: 'root',
        password: 'password',
        database: 'nexus_dev'
      },
      migrations: {
        directory: './migrations'
      },
      seeds: {
        directory: './seeds'
      }
    },
    test: {
      client: 'mysql',
      connection: {
        host: '127.0.0.1',
        user: 'root',
        password: 'password',
        database: 'nexus_test'
      },
      migrations: {
        directory: './migrations'
      },
      seeds: {
        directory: './seeds'
      }
    },
    production: {
      client: 'mysql',
      connection: {
        host: '127.0.0.1',
        user: 'root',
        password: 'password',
        database: 'nexus_prod'
      },
      migrations: {
        directory: './migrations'
      },
      seeds: {
        directory: './seeds'
      }
    }
  };
  