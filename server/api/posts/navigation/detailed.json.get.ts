export default eventHandler(async (event) => {
  const navigation = await queryCollectionNavigation(event, 'posts', [
    'id',
    'published',
    'modified',
    'description',
    'tags'
  ]).where('published', 'IS NOT NULL');
  return navigation;
});
