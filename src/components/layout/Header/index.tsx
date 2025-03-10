import getOptions from '@/lib/queries/options/getOptions';
import HeaderInner from './inner';

export default async function Header({ channel }: { channel: string }) {
    const options = await getOptions();

    return (
        <HeaderInner
            channel={channel}
            links={{
                locations: options?.headerLocationsLink,
                appointment: options?.headerAppointmentLink,
                shop: options?.headerShopLink,
                locations2: options?.headerLocations2Link,
            }}
            menu={channel === 'customer' ? options?.customer : options?.partner}
        />
    );
}
