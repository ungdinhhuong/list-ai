/**
 * subscriber controller
 */
import { factories } from '@strapi/strapi'
import axios from 'axios'

export default factories.createCoreController('api::subscriber.subscriber', ({ strapi }) => ({
  async create(ctx) {
    const { email, recaptchaToken } = ctx.request.body

    if (!email || !recaptchaToken) {
      return ctx.badRequest('Thiếu email hoặc mã xác thực')
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return ctx.badRequest('Email không hợp lệ')
    }

    try {
      const secretKey = process.env.RECAPTCHA_SECRET_KEY
      const response = await axios.post('https://www.google.com/recaptcha/api/siteverify', null, {
        params: {
          secret: secretKey,
          response: recaptchaToken,
        },
      })

      const { success } = response.data

      if (!success) {
        return ctx.badRequest('Xác thực reCAPTCHA thất bại')
      }

      const existing = await strapi.db.query('api::subscriber.subscriber').findOne({
        where: { email },
      })

      if (existing) {
        return ctx.send({ success: true, message: 'Email đã đăng ký trước đó' })
      }

      const subscriber = await strapi.db.query('api::subscriber.subscriber').create({
        data: { email },
      })

      return ctx.send({ success: true, data: subscriber })
    } catch (err) {
      console.error(err)
      return ctx.internalServerError('Có lỗi khi xử lý đăng ký')
    }
  },
}))
