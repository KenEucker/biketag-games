export default {
  title: "Player",
  name: "player",
  type: "document",
  fields: [
    {
      title: "UserID",
      name: "slug",
      type: "slug",
      readOnly: true,
      hidden: true,
      options: {
        source: "name",
      },
    },
    {
      title: "Name",
      name: "name",
      type: "string",
    },
    {
      title: "Bicon",
      name: "bicon",
      type: "string",
    },
    {
      type: "array",
      name: "tags",
      weak: true,
      // We probably don't want localized versions of this reference array, so
      // we opt out of localizing this specific field
      localize: false,
      of: [
        {
          type: "reference",
          to: [{ type: "tag" }],
        },
      ],
    },
    {
      type: "array",
      name: "games",
      weak: true,
      of: [
        {
          type: "reference",
          to: [{ type: "game" }],
        },
      ],
    },
    {
      type: "array",
      name: "achievements",
      weak: true,
      of: [
        {
          type: "reference",
          to: [{ type: "achievement" }],
        },
      ],
    },
    {
      type: "array",
      name: "altNames",
      of: [
        {
          type: "string",
        },
      ],
    },
    {
      type: "array",
      name: "devices",
      of: [
        {
          type: "string",
        },
      ],
    },
  ],
};
