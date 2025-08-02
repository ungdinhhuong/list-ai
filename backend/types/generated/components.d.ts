import type { Schema, Struct } from '@strapi/strapi';

export interface CommonAds extends Struct.ComponentSchema {
  collectionName: 'components_common_ads';
  info: {
    displayName: 'ads';
    icon: 'paperPlane';
  };
  attributes: {
    description: Schema.Attribute.Text;
    image: Schema.Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
    imageLink: Schema.Attribute.String;
    link: Schema.Attribute.String;
    title: Schema.Attribute.String;
  };
}

export interface CommonContact extends Struct.ComponentSchema {
  collectionName: 'components_common_contacts';
  info: {
    displayName: 'contact';
    icon: 'database';
  };
  attributes: {
    address: Schema.Attribute.String;
    email: Schema.Attribute.Email;
    phone: Schema.Attribute.String;
  };
}

export interface CommonLink extends Struct.ComponentSchema {
  collectionName: 'components_common_links';
  info: {
    displayName: 'link';
    icon: 'attachment';
  };
  attributes: {
    label: Schema.Attribute.String;
    url: Schema.Attribute.String;
  };
}

export interface CommonScripts extends Struct.ComponentSchema {
  collectionName: 'components_common_scripts';
  info: {
    displayName: 'scripts';
    icon: 'attachment';
  };
  attributes: {
    bodyScripts: Schema.Attribute.RichText;
    headScripts: Schema.Attribute.RichText;
  };
}

export interface CommonSocialLink extends Struct.ComponentSchema {
  collectionName: 'components_common_social_links';
  info: {
    displayName: 'socialLink';
    icon: 'globe';
  };
  attributes: {
    platform: Schema.Attribute.Enumeration<
      ['Facebook', 'Twitter', 'YouTube', 'LinkedIn']
    >;
    url: Schema.Attribute.String;
  };
}

export interface SharedOpenGraph extends Struct.ComponentSchema {
  collectionName: 'components_shared_open_graphs';
  info: {
    displayName: 'openGraph';
    icon: 'project-diagram';
  };
  attributes: {
    ogDescription: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMaxLength<{
        maxLength: 200;
      }>;
    ogImage: Schema.Attribute.Media<'images'>;
    ogTitle: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMaxLength<{
        maxLength: 70;
      }>;
    ogType: Schema.Attribute.String;
    ogUrl: Schema.Attribute.String;
  };
}

export interface SharedSeo extends Struct.ComponentSchema {
  collectionName: 'components_shared_seos';
  info: {
    displayName: 'seo';
    icon: 'search';
  };
  attributes: {
    canonicalURL: Schema.Attribute.String;
    keywords: Schema.Attribute.Text;
    metaDescription: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMaxLength<{
        maxLength: 160;
        minLength: 50;
      }>;
    metaImage: Schema.Attribute.Media<'images'>;
    metaRobots: Schema.Attribute.String;
    metaTitle: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMaxLength<{
        maxLength: 60;
      }>;
    metaViewport: Schema.Attribute.String;
    openGraph: Schema.Attribute.Component<'shared.open-graph', false>;
    structuredData: Schema.Attribute.JSON;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'common.ads': CommonAds;
      'common.contact': CommonContact;
      'common.link': CommonLink;
      'common.scripts': CommonScripts;
      'common.social-link': CommonSocialLink;
      'shared.open-graph': SharedOpenGraph;
      'shared.seo': SharedSeo;
    }
  }
}
