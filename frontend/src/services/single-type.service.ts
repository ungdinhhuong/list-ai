import axiosClient from "@/services/axiosClient";
import {HomePageResponse} from "@/types/home-page.type";
import {SiteSettingResponse} from "@/types/site-setting.type";

class SingleTypeService {
  async getHomePage(): Promise<HomePageResponse> {
    return await axiosClient.get('/home-page', {
      params: {
        populate: {
          seo: {
            populate: {
              openGraph: {
                populate: ['ogImage'],
              },
              metaImage: true,
            },
          },
        }
      }
    });
  }

  async getSiteSetting(locale: string = 'en'): Promise<SiteSettingResponse> {
    return await axiosClient.get('/site-setting', {
      params: {
        locale,
        populate: {
          logo: true,
          defaultSeo: {
            populate: {
              openGraph: {
                populate: ['ogImage']
              },
              metaImage: true
            }
          },
          socialLinks: '*',
          footerLinks: '*',
          contactInfo: '*'
        }
      }
    });
  }
}

export const singleTypeService = new SingleTypeService();
