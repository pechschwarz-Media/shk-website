import { sectionVariants } from "@/components/static/Section";
import { VariantProps } from "class-variance-authority";

export type AcfLink = {
  url: string;
  title: string;
  target: string;
};

export type Media = {
  url: string;
  alt: string;
  width: number;
  height: number;
  type: string;
};

export type Page = {
  title: {
    rendered: string;
  };
  template: string;
  acf: {
    channel: string;
    content: any[];
  };
};

export type LocationData = {
  title: {
    rendered: string;
  };
  template: string;
  acf: {
    channel: string;
    content: any[];
  };
};

export type Homepage = {
  title: {
    rendered: string;
  };
  template: string;
  acf: any;
};

export type PageMeta = {
  yoast_head_json: {
    title: string;
    description: string;
    robots: {
      index: string;
      follow: string;
    };
  };
};

export type BlogMeta = PageMeta;

export type LocationMeta = PageMeta[];

export type PageUris = {
  modified: string;
  link: string;
  uri: string[];
};

export type LocationsSlugs = {
  slug: string;
};

export type BlogUris = {
  modified: string;
  slug: string;
};

export type Blog = {
  title: {
    rendered: string;
  };
  acf: {
    content: any[];
  };
};

export type CustomerMenu = {
  link: AcfLink;
  submenu: {
    link: AcfLink;
    image: Media;
    description: string;
  }[];
}[];

export type PartnerMenu = CustomerMenu;

export type FooterMenu = {
  title: string;
  menu: {
    link: AcfLink;
  }[];
};

export type Options = {
  customer: CustomerMenu;
  partner: PartnerMenu;
  footer: FooterMenu[];
  headerLocationsLink: AcfLink;
  headerAppointmentLink: AcfLink;
};

export type Settings = {
  hide?: boolean;
  preventAnimation?: boolean;
  padding: {
    top: VariantProps<typeof sectionVariants>["paddingTop"];
    bottom: VariantProps<typeof sectionVariants>["paddingBottom"];
  };
};

export type Location = {
  title: {
    rendered: string;
  };
  link: string;
  acf: {
    id: string;
    email: string;
    fax: string;
    lat: string;
    lng: string;
    zip: string;
    city: string;
    street: string;
    number: string;
    phone: string;
    website: string;
    bad_open: any[];
    abhol_open: any[];
    energie_open: any[];
  };
  locationcats: number[];
  distance?: number;
};

export type Locationcat = {
  name: string;
  id: number;
};
