export default function(server) {
  for (var i=0; i<10; i++) {
    let transaction = server.create('transaction');
    let currency = server.create('currency');
    let wallet = server.create('wallet', { currency });
    let category = server.create('category');
    transaction.category = category;
    transaction.wallet = wallet;
    category.transactions = [transaction];
    wallet.transactions = [transaction];
    transaction.save();
    category.save();
    wallet.save();
  }
}
