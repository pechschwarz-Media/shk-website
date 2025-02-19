import { cn } from '@/lib/utils';

export default function Text({ children, className }: { children: React.ReactNode; className?: string }) {
    return (
        <div
            className={cn(
                'prose prose-headings:mb-4 prose-headings:mt-0 prose-p:leading-normal prose-headings:font-light prose-headings:leading-tight prose-p:mb-4 prose-h1:text-h1 prose-h2:text-h2 prose-h3:text-h3 prose-h4:text-h4 prose-h5:text-h5 prose-strong:text-bold prose-b:text-bold text-inherit',
                className
            )}
        >
            {children}
        </div>
    );
}
