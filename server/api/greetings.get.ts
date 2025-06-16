export default defineEventHandler(async (event) => {
  const sections = await queryCollectionSearchSections(event, 'posts');
  event.node.res.setHeader('Content-Type', 'text/html; charset=utf-8');
  return 'hello, we have: ' + JSON.stringify(sections);
});
