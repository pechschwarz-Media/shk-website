import { cn } from '@/lib/utils';

export default function Text({ children, className }: { children: React.ReactNode; className?: string }) {
    return (
        <div
            className={cn(
                'max-w-none prose prose-headings:mb-4 prose-blockquote:text-large prose-blockquote:border-blue prose-li:m-0 prose-headings:text-blue prose-h1:font-light prose-headings:font-headline prose-headings:font-normal prose-headings:mt-0 prose-p:leading-normal porse-headings:text-blue prose-h1:font-light prose-headings:leading-tight prose-p:mb-4 prose-h1:text-h1 prose-h2:text-h2 prose-h3:text-h3 prose-h4:text-h4 prose-h5:text-h5 prose-strong:text-bold prose-b:text-bold text-inherit',
                className
            )}
        >
            {children}
        </div>
    );
}
