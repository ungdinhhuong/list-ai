export default {
  routes: [
    {
      method: 'GET',
      path: '/tools/by-category/:slug',
      handler: 'custom-tool.byCategorySlug',
      config: {
        policies: [],
        auth: false,
      },
    },
  ],
}
