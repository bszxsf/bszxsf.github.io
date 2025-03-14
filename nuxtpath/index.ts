// Nuxt content v3 transformer does not resolve things like '~/nuxtpath' at compile time (which seems a bit ridiculous), my workaround is to add this as a local package in package.json.

export namespace nuxtpath {
  export const basename = (path: string, removeExt: boolean = false) => {
    const basenameWithExt: string = path.split('/').pop() as string;
    if (!removeExt) return basenameWithExt;
    const basenameComponents: string[] = basenameWithExt.split('.');
    if (basenameComponents.length > 1) basenameComponents.pop();
    return basenameComponents.join('.');
  };

  export const component = (path: string, index: number) => {
    // A non-integral index should cause an error. Let ts handle it, omitting a useless if...
    // As well as out of bound error.
    if (index >= 0) return path.split('/')[index];
    return path.split('/').reverse()[-index - 1];
  };

  export const noindex = (path: string) => {
    return path.replace(/^\d+\./, '');
  };
}
