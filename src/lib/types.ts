import { sectionVariants } from '@/components/static/Section';
import { VariantProps } from 'class-variance-authority';

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

export type Logo = {
    acf: { logo: Media };
};

export type Page = {
    title: {
        rendered: string;
    };
    link: string;
    template: string;
    acf: {
        channel: string;
        content?: any[];
        text?: string;
    };
};

export type LocationData = {
    title: {
        rendered: string;
    };
    template: string;
    locationcats: number[];
    acf: {
        channel: string;
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
        bad_open: {
            bad_open_mo_start: string;
            bad_open_mo_end: string;
            bad_open_di_start: string;
            bad_open_di_end: string;
            bad_open_mi_start: string;
            bad_open_mi_end: string;
            bad_open_do_start: string;
            bad_open_do_end: string;
            bad_open_fr_start: string;
            bad_open_fr_end: string;
            bad_open_sa_start: string;
            bad_open_sa_end: string;
            bad_open_so_start: string;
            bad_open_so_end: string;
        };
        abhol_open: {
            abhol_open_mo_start: string;
            abhol_open_mo_end: string;
            abhol_open_di_start: string;
            abhol_open_di_end: string;
            abhol_open_mi_start: string;
            abhol_open_mi_end: string;
            abhol_open_do_start: string;
            abhol_open_do_end: string;
            abhol_open_fr_start: string;
            abhol_open_fr_end: string;
            abhol_open_sa_start: string;
            abhol_open_sa_end: string;
            abhol_open_so_start: string;
            abhol_open_so_end: string;
        };
        energie_open: {
            energie_open_mo_start: string;
            energie_open_mo_end: string;
            energie_open_di_start: string;
            energie_open_di_end: string;
            energie_open_mi_start: string;
            energie_open_mi_end: string;
            energie_open_do_start: string;
            energie_open_do_end: string;
            energie_open_fr_start: string;
            energie_open_fr_end: string;
            energie_open_sa_start: string;
            energie_open_sa_end: string;
            energie_open_so_start: string;
            energie_open_so_end: string;
        };
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

export type PostMeta = PageMeta;

export type LocationMeta = PageMeta[];

export type PageUris = {
    modified: string;
    link: string;
    uri: string[];
};

export type PostsSlugs = {
    slug: string;
};

export type LocationsSlugs = {
    slug: string;
};

export type BlogUris = {
    modified: string;
    slug: string;
};

export type Post = {
    title: {
        rendered: string;
    };
    excerpt: {
        rendered: string;
    };
    link: string;
    date: string;
    categories: number[];
    acf: {
        readingTime: string;
        thumbnail: Media;
        content: {
            title: string;
            content: any[];
        }[];
    };
};

export type Category = {
    name: string;
    slug: string;
    id: number;
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

export type ImageSettings = {
    height: string;
    position: 'top' | 'center' | 'bottom';
};

export type Options = {
    customer: CustomerMenu;
    partner: PartnerMenu;
    footer: FooterMenu[];
    footerPartner: FooterMenu[];
    headerLocationsLink: AcfLink;
    headerAppointmentLink: AcfLink;
    headerShopLink: AcfLink;
    headerLocations2Link: AcfLink;
    generalEmail: string;
    generalPhone: string;
    generalAddress: string;
};

export type Background = 'transparent' | 'gray' | 'blue' | 'yellow' | 'sand' | 'pink' | null;

export type Settings = {
    background?: Background;
    hide?: boolean;
    preventAnimation?: boolean;
    padding: {
        top: VariantProps<typeof sectionVariants>['paddingTop'];
        bottom: VariantProps<typeof sectionVariants>['paddingBottom'];
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

export type FormField = {
    type: string;
    id: number;
    formId: number;
    label: string;
    isRequired: boolean;
    labelPlacement: string;
    layoutGridColumnSpan: string | number;
    choices: {
        text: string;
        value: string;
        isSelected: string;
    }[];
    placeholder: string;
    checkboxLabel: string;
};

export type Form = {
    id: number;
    fields: FormField[];
    confirmations: {
        [key: string]: {
            type: string;
            message: string;
            url: string;
        };
    };
    button: {
        text: string;
    };
};

export type Glossar = {
    title: {
        rendered: string;
    };
    acf: {
        description: string;
    };
};

export type Breadcrumb = {
    title: string;
    link: string;
}[];
