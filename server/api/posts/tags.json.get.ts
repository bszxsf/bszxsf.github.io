import { ContentNavigationItem } from '@nuxt/content';

export default eventHandler(async (event) => {
  const navigation = await queryCollectionNavigation(event, 'posts', [
    'tags'
  ]).where('published', 'IS NOT NULL');
  const tags = new Set<string>();

  const collectTags = () => {
    const traversalStack = [...navigation];
    traversalStack.reverse();
    let cntNode: ContentNavigationItem | null;

    while ((cntNode = traversalStack.pop())) {
      (<string[] | undefined>cntNode.tags)?.forEach((tag) => tags.add(tag));
      if (cntNode.children) {
        traversalStack.push(...[...cntNode.children].reverse());
      }
    }
  };
  collectTags();

  return Array.from(tags).sort();
});
