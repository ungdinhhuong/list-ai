export default () => ({
  seo: {
    enabled: true,
  },
  'strapi-cache': {
    enabled: true,
    config: {
      debug: false,                        // Tắt debug log trong production
      provider: 'memory',                 // Dùng cache trong bộ nhớ RAM
      max: 1000,                          // Tối đa 1000 item cache
      size: 1024 * 1024 * 100,            // Giới hạn RAM dùng cho cache ~100MB (tuỳ server)
      ttl: 1000 * 60 * 60,                // Thời gian sống 1 giờ (60p)
      allowStale: false,                 // Không dùng dữ liệu hết hạn
      cacheableRoutes: [
        '/api/categories',
      ],                                  // Chỉ cache các route cần thiết
      cacheHeaders: true,                // Cache cả headers response
      cacheHeadersDenyList: [
        'access-control-allow-origin',
        'content-encoding',
      ],
      cacheHeadersAllowList: [
        'content-type',
      ],
      cacheAuthorizedRequests: false,   // Không cache các request có Authorization
      cacheGetTimeoutInMs: 1000,        // Nếu không lấy được cache trong 1s thì bỏ qua
      autoPurgeCache: true,             // Tự động xoá cache khi có CRUD thay đổi
    },
  },
});
