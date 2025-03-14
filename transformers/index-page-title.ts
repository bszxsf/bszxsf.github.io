import { defineTransformer } from '@nuxt/content';
import { nuxtpath } from 'nuxtpath';

export default defineTransformer({
  name: 'index-page-title',
  extensions: ['.md'],
  transform(file) {
    // If there isn't a highest level title (i.e. # Article Title),
    // file.title would be unset at this moment.
    // 1. If file.title exists, use it.
    // 2. Otherwise, if the last component of path (id) is not index.md, use that basename.
    // 3. Otherwise, use the name of containing component.
    let generatedTitle: string =
      file.title != '' ? (file.title as string) : file.id;
    if (file.title == '') {
      // This splits twice but looks clear. Anyway, this runs at compile time (confirmed via console.log).
      const basename: string = nuxtpath.noindex(
        nuxtpath.basename(file.id, true)
      );
      if (basename != 'index') generatedTitle = basename;
      else generatedTitle = nuxtpath.noindex(nuxtpath.component(file.id, -2));
    }
    return {
      ...file,
      title: generatedTitle
    };
  }
});
