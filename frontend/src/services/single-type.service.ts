import {HomePageResponse} from "@/types/home-page.type";
import {apiGet} from "@/lib/apiRequest";
import {SiteSettingResponse} from "@/types/site-setting.type";
import {StaticPageType} from "@/types/static-page.type";

class SingleTypeService {
  async getHomePage(): Promise<HomePageResponse> {
    return await apiGet('/home-page', {
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

  async getCategoryPage(): Promise<HomePageResponse> {
    return await apiGet('/category-page', {
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

  async getPolicyPage(): Promise<StaticPageType> {
    return await apiGet('/policy-page', {
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
    }).then(res => res.data);
  }

  async getAboutPage(): Promise<StaticPageType> {
    return await apiGet('/about-page', {
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
    }).then(res => res.data);
  }

  async getSiteSetting(): Promise<SiteSettingResponse> {
    return await apiGet('/site-setting', {
      params: {
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
