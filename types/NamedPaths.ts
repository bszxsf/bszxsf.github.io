export { };

declare global {
  interface NamedPath {
    name: string // displayed
    to: string   // used by router
  }
  // Naming tips: RFC specs seem to favor 'path segment' as a term describing what we want
  // See https://stackoverflow.com/questions/17913224/which-term-best-describes-elements-of-url-path
  // DO NOT USE DIRECTLY

  // Adding functions for this could make it complicated.
  // Plus, it's more flexible when we don't need to have all paths as subpaths of the same path.
  type NamedPaths = Array<NamedPath>
}
