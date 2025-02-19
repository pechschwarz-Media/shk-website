import { cn } from '@/lib/utils';

export default function Header({ channel }: { channel: string }) {
    return (
        <header
            className={cn(
                'fixed top-0 left-0 w-full z-50 bg-light/80 backdrop-blur h-20 border-t border-t-8',
                channel === 'customer' && 'border-customer',
                channel === 'partner' && 'border-partner'
            )}
        >
            <div className="container">header</div>
        </header>
    );
}
