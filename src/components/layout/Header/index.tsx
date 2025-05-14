import getOptions from '@/lib/queries/options/getOptions';
import HeaderInner from './inner';

export default async function Header({ channel, link }: { channel: string; link?: string }) {
    const options = await getOptions();

    let menu = options?.customer;

    switch (channel) {
        case 'customer':
            menu = options?.customer;
            break;
        case 'baederwelten':
            menu = options?.customer;
            break;
        case 'fliesenwelten':
            menu = options?.customer;
            break;
        case 'energiesparwelten':
            menu = options?.customer;
            break;
        case 'partner':
            menu = options?.partner;
            break;
    }

    return (
        <HeaderInner
            channel={channel}
            links={{
                locations: options?.headerLocationsLink,
                appointment: options?.headerAppointmentLink,
                shop: options?.headerShopLink,
                locations2: options?.headerLocations2Link,
            }}
            link={link}
            menu={menu}
        />
    );
}
