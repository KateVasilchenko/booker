export default function(server) {
  let i;
  let wallets = [];
  let transactionIds = [];
  let currency = server.create('currency');
  for (i=0; i<2; i++) {
    transactionIds.push([]);
    wallets.push(server.create('wallet', { currency }));
  }
  for (i=0; i<10; i++) {
    let category = server.create('category');
    let walletIndex = i % 2 === 0 ? 0 : 1;
    let wallet = wallets[walletIndex];
    let transaction = server.create('transaction', { wallet: wallet, category: category });
    transaction.save();
    transactionIds[walletIndex].push(transaction.id);
    server.db.categories.update(category.id,  {transaction_ids: [transaction.id]});
  }
  for (i=0; i<2; i++) {
    server.db.wallets.update(wallets[i].id,  {transaction_ids: transactionIds[i]});
  }
}
