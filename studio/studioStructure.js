// in sanity-structure.js

import S from "@sanity/desk-tool/structure-builder";

export default () =>
  S.list()
    .title("Content")
    .items([
      S.listItem()
        .title("Options")
        .child(
          S.editor()
            .schemaType("options")
            .documentId("singletonOptions")
        ),
      // Add a visual divider(optional)
      S.divider(),
      // List out the rest of the document types, but filter out the config type
      ...S.documentTypeListItems()
        .filter(listItem => !['options'].includes(listItem.getId()))
    ]);