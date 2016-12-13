function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export default function(server) {
  let i;
  let wallets = [];
  let walletsTransactionIds = [];
  let currency = server.create('currency');
  for (i=0; i<2; i++) {
    walletsTransactionIds.push([]);
    wallets.push(server.create('wallet', { currency }));
  }
  let categories = [];
  let categoriesTransactionIds = [];
  for (i=0; i<10; i++) {
    categoriesTransactionIds.push([]);
    categories.push(server.create('category'));
  }

  for (i=0; i<100; i++) {
    let categoryIndex = getRandomInt(0, 9);
    let category = categories[categoryIndex];
    let walletIndex = i % 2 === 0 ? 0 : 1;
    let wallet = wallets[walletIndex];
    let transaction = server.create('transaction', { wallet: wallet, category: category });
    transaction.save();
    walletsTransactionIds[walletIndex].push(transaction.id);
    categoriesTransactionIds[categoryIndex].push(transaction.id);
  }
  for (i=0; i<2; i++) {
    server.db.wallets.update(wallets[i].id,  {transaction_ids: walletsTransactionIds[i]});
  }

  for (i=0; i<10; i++) {
    server.db.categories.update(categories[i].id,  {transaction_ids: categoriesTransactionIds[i]});
  }
}
