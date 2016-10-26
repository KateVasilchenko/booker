export default function(server) {
  const categories = server.createList('category', 10);
  const currency = server.create('currency');
  const wallet = server.create('wallet', { currencyId: currency.id});
  const randomCategoryIndex = Math.floor(Math.random() * 10);
  server.createList('transaction', 10, {
    walletId: wallet.id,
    categoryId: categories[randomCategoryIndex].id
  });
}
