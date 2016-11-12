export default function(server) {
  let i;
  let wallets = [];
  let currency = server.create('currency');
  for (i=0; i<2; i++) {
    wallets.push(server.create('wallet', { currency }));
  }
  for (i=0; i<10; i++) {
    let transaction = server.create('transaction');
    let category = server.create('category');
    let wallet = i % 2 === 0 ? wallets[0] : wallets[1];
    transaction.category = category;
    transaction.wallet = wallet;
    transaction.save();
    category.save();
    wallet.save();
  }
}
