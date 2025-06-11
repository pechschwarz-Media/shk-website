import Logo from '@/components/static/Logo';
import getOptions from '@/lib/queries/options/getOptions';
import Link from 'next/link';
import Copyright from './copyright';
import { cn } from '@/lib/utils';

export default async function Footer({ channel }: { channel: string }) {
    const menus = await getOptions();

    let menu = menus?.footer;

    switch (channel) {
        case 'customer':
            menu = menus?.footer;
            break;
        case 'baederwelten':
            menu = menus?.footer;
            break;
        case 'fliesenwelten':
            menu = menus?.footer;
            break;
        case 'energiesparwelten':
            menu = menus?.footer;
            break;
        case 'partner':
            menu = menus?.footerPartner;
            break;
    }

    console.log(menu);

    return (
        <footer
            className={cn(
                'text-white py-12 md:py-20',
                channel === 'customer' && 'bg-customer',
                channel === 'partner' && 'bg-partner',
                channel === 'energiesparwelten' && 'bg-energiesparwelt',
                channel === 'fliesenwelten' && 'bg-fliesenwelt',
                channel === 'baederwelten' && 'bg-baederwelt'
            )}
        >
            <div className="container">
                <div>
                    <div className="grid grid-cols-2 md:auto-cols-fr md:grid-flow-col gap-x-6 gap-y-12">
                        {menu?.map((menu, index) => {
                            return (
                                <nav key={index}>
                                    <div className="font-bold mb-6">{menu?.title}</div>
                                    <ul className="space-y-3">
                                        {menu?.menu?.map((menuItem, index) => {
                                            return (
                                                <li key={index}>
                                                    <Link href={menuItem?.link?.url}>{menuItem?.link?.title}</Link>
                                                </li>
                                            );
                                        })}
                                    </ul>
                                </nav>
                            );
                        })}
                    </div>
                </div>
                <div className="border-t border-t-white/10 mt-12 md:mt-20 pt-12 md:pt-20">
                    <div className="flex flex-col sm:flex-row items-center justify-between gap-6 gap-y-8">
                        <div>
                            <Logo className="w-28 md:w-40" />
                        </div>
                        <Copyright />
                    </div>
                </div>
            </div>
        </footer>
    );
}
