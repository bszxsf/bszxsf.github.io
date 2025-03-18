import type { ContentNavigationItem } from '@nuxt/content';

// Nodes with a 'children' field is a diectory, while others are leaves.
export const isDirectory = (node: ContentNavigationItem) => {
  return node.children != undefined;
};
export const isPost = (node: ContentNavigationItem) => {
  return !isDirectory(node);
};
