import IconChevronRight from '@/components/icons/IconChevronRight';
import { Breadcrumb as BreadcrumbType } from '@/lib/types';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import React from 'react';

export function Breadcrumb({ breadcrumb }: { breadcrumb: BreadcrumbType }) {
    return (
        <div className="block fixed bottom-0 left-0 z-[100] bg-gray-medium px-4 py-3 sm:px-8 sm:py-4 text-small shadow rounded-tr-lg">
            <ul className="flex items-center gap-x-2 sm:gap-x-4">
                {breadcrumb?.map((item, index) => {
                    return (
                        <React.Fragment key={index}>
                            <li className={cn(index === breadcrumb.length - 1 && 'font-bold')}>
                                <Link href={item.link}>{item.title}</Link>
                            </li>
                            {index !== breadcrumb.length - 1 && (
                                <li key={index}>
                                    <IconChevronRight className="size-3" />
                                </li>
                            )}
                        </React.Fragment>
                    );
                })}
            </ul>
        </div>
    );
}
