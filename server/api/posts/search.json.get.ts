export default eventHandler(async (event) => {
  const rawSections = await queryCollectionSearchSections(event, 'posts');

  return rawSections;
});
