exports.up = function(knex) {
    return knex.schema
      .createTable('users', table => {
        table.increments('id').primary();
        table.string('name').notNullable();
        table.string('surname').notNullable();
        table.string('email').notNullable().unique();
        table.string('password').notNullable();
        table.string('phone').notNullable();
        table.string('address');
        table.string('role').defaultTo('user');
        table.timestamps(true, true);
      })
      .createTable('products', table => {
        table.increments('id').primary();
        table.string('name').notNullable();
        table.string('description').notNullable();
        table.float('price').notNullable();
        table.integer('stock').notNullable();
        table.timestamps(true, true);
      })
      .createTable('orders', table => {
        table.increments('id').primary();
        table.integer('user_id').unsigned().notNullable().references('id').inTable('users');
        table.integer('product_id').unsigned().notNullable().references('id').inTable('products');
        table.integer('quantity').notNullable();
        table.float('price').notNullable();
        table.string('status').notNullable();
        table.timestamps(true, true);
      })
      .createTable('payments', table => {
        table.increments('id').primary();
        table.integer('order_id').unsigned().notNullable().references('id').inTable('orders');
        table.float('amount').notNullable();
        table.string('paymentMethod').notNullable();
        table.string('status').notNullable();
        table.timestamps(true, true);
      })
      .createTable('bank_accounts', table => {
        table.increments('id').primary();
        table.integer('user_id').unsigned().notNullable().references('id').inTable('users');
        table.string('accountNumber').notNullable();
        table.string('bankName').notNullable();
        table.float('balance').notNullable();
        table.timestamps(true, true);
      });
  };
  
  exports.down = function(knex) {
    return knex.schema
      .dropTableIfExists('bank_accounts')
      .dropTableIfExists('payments')
      .dropTableIfExists('orders')
      .dropTableIfExists('products')
      .dropTableIfExists('users');
  };
  