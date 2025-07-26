export default () => {
  return async (ctx: any, next: () => Promise<any>) => {
    if (ctx.request.path === '/_health') {
      ctx.status = 200;
      ctx.body = { status: 'ok' };
    } else {
      await next();
    }
  };
};
