export default eventHandler(async (event) => {
  const navigation = await queryCollectionNavigation(event, 'posts', [
    'published',
    'modified'
  ]).where('published', 'IS NOT NULL');
  return navigation;
});
