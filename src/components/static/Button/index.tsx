import { AcfLink } from '@/lib/types';
import { cn } from '@/lib/utils';
import { cva, VariantProps } from 'class-variance-authority';
import Link from 'next/link';

const buttonVariants = cva('group inline-flex justify-center items-center gap-x-3 disabled:opacity-50 focus-visible:outline-2 focus-visible:outline-offset-2', {
    variants: {
        variant: {
            blueFilled: 'bg-blue hover:bg-[#234256] text-white h-10 sm:h-12 rounded-full px-5',
            whiteFilled: 'bg-white hover:bg-[#e5e5e5] text-blue h-10 sm:h-12 rounded-full px-5',
            whiteOutline: 'bg-transparent hover:bg-white hover:text-black border border-white text-white h-10 sm:h-12 rounded-full px-5 backdrop-blur-md',
            blueOutline: 'bg-transparent hover:bg-customer hover:text-white border border-customer text-customer h-10 sm:h-12 rounded-full px-5 backdrop-blur-md',
        },
    },
    defaultVariants: {
        variant: 'blueFilled',
    },
});

type AsButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & { as: 'button' };
type AsLinkProps = Omit<React.AnchorHTMLAttributes<HTMLAnchorElement> & { as: 'link'; link: AcfLink }, 'href'>;

type ButtonOrLinkProps = AsButtonProps | AsLinkProps;

type ButtonBaseProps = VariantProps<typeof buttonVariants> & ButtonOrLinkProps;

export default function Button({ className, ...props }: ButtonBaseProps) {
    if (props.as === 'link') {
        const { as, link, variant, ...rest } = props;
        const target = link.target ? link.target : '_self';

        return (
            <Link href={link.url || '#'} target={target} className={cn(buttonVariants({ variant, className }))} {...rest}>
                {props.children}
            </Link>
        );
    }

    if (props.as === 'button') {
        const { variant, ...rest } = props;

        return (
            <button className={cn(buttonVariants({ variant, className }))} {...rest}>
                {props.children}
            </button>
        );
    }

    return null;
}
