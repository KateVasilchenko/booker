export default function(server) {
  server.createList('currency', 10);
  server.createList('wallet', 10);
  server.createList('category', 10);
  server.createList('transaction', 10);
}
