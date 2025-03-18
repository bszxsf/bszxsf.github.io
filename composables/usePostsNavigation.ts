// Note: This returns a promise-like stuff. Remember to await before use.
export const usePostsNavigation = () => {
  return useAsyncData('content-posts-nav', () =>
    queryCollectionNavigation('posts', ['published', 'modified']).where(
      'published',
      'IS NOT NULL'
    )
  );
};
