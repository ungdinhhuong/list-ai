import axiosClient from "@/lib/axiosClient";

export class SubscriberService {
  async subscribe(email: string, recaptchaToken: string) {
    return await axiosClient.post('/subscribers', {
      email,
      recaptchaToken,
    })
  }
}

export const subscriberService = new SubscriberService()
