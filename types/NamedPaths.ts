export { };

declare global {
  interface NamedPath {
    name: string // displayed
    to: string   // used by router
  }

  // Adding functions for this could make it complicated.
  // Plus, it's more flexible when we don't need to have all paths as subpaths of the same path.
  type NamedPaths = Array<NamedPath>
}
