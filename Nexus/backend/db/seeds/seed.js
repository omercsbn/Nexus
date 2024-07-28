exports.seed = function(knex) {
    // Deletes ALL existing entries
    return knex('users').del()
      .then(function () {
        // Inserts seed entries
        return knex('users').insert([
          {name: 'John', surname: 'Doe', email: 'john.doe@example.com', password: 'hashedpassword1', phone: '1234567890', address: '123 Main St', role: 'user'},
          {name: 'Jane', surname: 'Doe', email: 'jane.doe@example.com', password: 'hashedpassword2', phone: '0987654321', address: '456 Elm St', role: 'user'},
          {name: 'Admin', surname: 'User', email: 'admin@example.com', password: 'hashedpassword3', phone: '1112223333', address: '789 Oak St', role: 'admin'}
        ]);
      })
      .then(function () {
        return knex('products').del();
      })
      .then(function () {
        return knex('products').insert([
          {name: 'Product1', description: 'Description1', price: 10.0, stock: 100},
          {name: 'Product2', description: 'Description2', price: 20.0, stock: 200},
          {name: 'Product3', description: 'Description3', price: 30.0, stock: 300}
        ]);
      })
      .then(function () {
        return knex('orders').del();
      })
      .then(function () {
        return knex('orders').insert([
          {user_id: 1, product_id: 1, quantity: 2, price: 20.0, status: 'pending'},
          {user_id: 2, product_id: 2, quantity: 1, price: 20.0, status: 'shipped'},
          {user_id: 3, product_id: 3, quantity: 3, price: 90.0, status: 'delivered'}
        ]);
      })
      .then(function () {
        return knex('payments').del();
      })
      .then(function () {
        return knex('payments').insert([
          {order_id: 1, amount: 20.0, paymentMethod: 'credit card', status: 'completed'},
          {order_id: 2, amount: 20.0, paymentMethod: 'paypal', status: 'completed'},
          {order_id: 3, amount: 90.0, paymentMethod: 'credit card', status: 'completed'}
        ]);
      })
      .then(function () {
        return knex('bank_accounts').del();
      })
      .then(function () {
        return knex('bank_accounts').insert([
          {user_id: 1, accountNumber: '1234567890', bankName: 'Bank1', balance: 1000.0},
          {user_id: 2, accountNumber: '0987654321', bankName: 'Bank2', balance: 2000.0},
          {user_id: 3, accountNumber: '1122334455', bankName: 'Bank3', balance: 3000.0}
        ]);
      });
  };
  