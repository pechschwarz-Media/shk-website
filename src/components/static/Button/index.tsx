import Link from 'next/link';
import { cva, VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';
import { AcfLink } from '@/lib/types';

const buttonVariants = cva(
    'group inline-flex justify-center items-center gap-x-3 disabled:opacity-50 focus-visible:outline-2 focus-visible:outline-offset-2',
    {
        variants: {
            variant: {
                blueFilled: 'bg-blue text-white h-12 rounded-full px-5',
                whiteFilled: 'bg-white text-blue h-12 rounded-full px-5',
                whiteOutline: 'bg-transparent border border-white text-white h-12 rounded-full px-5 backdrop-blur-md',
            },
        },
        defaultVariants: {
            variant: 'blueFilled',
        },
    }
);

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
