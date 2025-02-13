// @ts-nocheck

import dynamic from 'next/dynamic';

const Components = {
    // example: dynamic(() => import('@/components/custom/Example')),
};

export default function ComponentRenderer({ content }: { content?: any }) {
    if (content) {
        return content?.map((component, index) => {
            const Component = Components[component?.acf_fc_layout];
            return <Component content={component} key={index} />;
        });
    }
}
