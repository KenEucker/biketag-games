export default {
  title: 'Stat',
  name: 'stat',
  type: 'document',
  fields: [
    {
      title: "Stat",
      name: "slug",
      type: "slug",
      hidden: true,
      options: {
        source: 'name',
      },
    },
    {
      type: "reference",
      name: "game",
      weak: true,
      to: [{ type: "game" }],
    },
    {
      title: 'Stat Name',
      name: 'name',
      type: 'string',
    },
    {
      title: 'Stat Description',
      name: 'description',
      type: 'string',
    },
    {
      title: 'Stat Key',
      name: 'key',
      type: 'string',
    },
    {
      title: 'Stat Value',
      name: 'value',
      type: 'string',
    },
    {
      title: 'Stat Updated',
      name: 'updatedTime',
      type: 'datetime',
    },
  ],
}
