import { Form } from '@/components/static/Form';
import Section from '@/components/static/Section';
import getForm from '@/lib/queries/forms/getForm';
import getOptions from '@/lib/queries/options/getOptions';
import { Settings } from '@/lib/types';
import parse from 'html-react-parser';
import Link from 'next/link';

type Content = {
    topline: string;
    headline: string;
    email: string;
    phone: string;
    address: string;
    form: string;
    settings: Settings;
};

export default async function Contact_6({ content }: { content: Content }) {
    const options = await getOptions();
    const form = await getForm({ id: parseInt(content?.form) });

    console.log(content);

    return (
        <Section dataComponent="Contact_6" settings={content.settings}>
            <div className="container pt-20">
                <div className="grid md:grid-cols-12 gap-x-6 gap-y-12">
                    <div className="md:col-span-6 xl:col-span-5">
                        <div className="mb-4">{content?.topline}</div>
                        <h2 className="text-h2 leading-tight font-headline mb-8 text-blue">{content?.headline}</h2>
                        <div>
                            <ul className="space-y-3">
                                {content?.email && (
                                    <li>
                                        <Link href={`mailto:${content?.email}`} className="inline-flex gap-4">
                                            <svg
                                                className="relative top-[2px]"
                                                width="20"
                                                height="16"
                                                viewBox="0 0 20 16"
                                                fill="none"
                                                xmlns="http://www.w3.org/2000/svg"
                                            >
                                                <path
                                                    d="M18 0H2C0.897 0 0 0.897 0 2V14C0 15.103 0.897 16 2 16H18C19.103 16 20 15.103 20 14V2C20 0.897 19.103 0 18 0ZM18 2V2.511L10 8.734L2 2.512V2H18ZM2 14V5.044L9.386 10.789C9.56111 10.9265 9.77733 11.0013 10 11.0013C10.2227 11.0013 10.4389 10.9265 10.614 10.789L18 5.044L18.002 14H2Z"
                                                    fill="#0B2D44"
                                                />
                                            </svg>
                                            {content?.email}
                                        </Link>
                                    </li>
                                )}
                                {content?.phone && (
                                    <li>
                                        <Link href={`tel:${content?.phone}`} className="inline-flex gap-4">
                                            <svg
                                                className="relative top-[2px]"
                                                width="19"
                                                height="19"
                                                viewBox="0 0 19 19"
                                                fill="none"
                                                xmlns="http://www.w3.org/2000/svg"
                                            >
                                                <path
                                                    d="M14.7073 10.2932C14.6145 10.2003 14.5043 10.1265 14.383 10.0762C14.2617 10.0259 14.1317 10 14.0003 10C13.869 10 13.739 10.0259 13.6176 10.0762C13.4963 10.1265 13.3861 10.2003 13.2933 10.2932L11.6993 11.8872C10.9603 11.6672 9.58133 11.1672 8.70733 10.2932C7.83333 9.4192 7.33333 8.0402 7.11333 7.3012L8.70733 5.7072C8.80028 5.61441 8.87402 5.50421 8.92433 5.38289C8.97464 5.26158 9.00054 5.13153 9.00054 5.0002C9.00054 4.86887 8.97464 4.73882 8.92433 4.61751C8.87402 4.49619 8.80028 4.38599 8.70733 4.2932L4.70733 0.293201C4.61455 0.200255 4.50434 0.126518 4.38303 0.0762068C4.26171 0.0258961 4.13167 0 4.00033 0C3.869 0 3.73896 0.0258961 3.61764 0.0762068C3.49633 0.126518 3.38612 0.200255 3.29333 0.293201L0.581334 3.0052C0.201334 3.3852 -0.0126663 3.9072 -0.00466627 4.4402C0.0183337 5.8642 0.395334 10.8102 4.29333 14.7082C8.19133 18.6062 13.1373 18.9822 14.5623 19.0062H14.5903C15.1183 19.0062 15.6173 18.7982 15.9953 18.4202L18.7073 15.7082C18.8003 15.6154 18.874 15.5052 18.9243 15.3839C18.9746 15.2626 19.0005 15.1325 19.0005 15.0012C19.0005 14.8699 18.9746 14.7398 18.9243 14.6185C18.874 14.4972 18.8003 14.387 18.7073 14.2942L14.7073 10.2932ZM14.5803 17.0052C13.3323 16.9842 9.06233 16.6492 5.70733 13.2932C2.34133 9.9272 2.01533 5.6422 1.99533 4.4192L4.00033 2.4142L6.58633 5.0002L5.29333 6.2932C5.1758 6.41065 5.08938 6.55554 5.04189 6.71477C4.9944 6.874 4.98733 7.04256 5.02133 7.2052C5.04533 7.3202 5.63233 10.0472 7.29233 11.7072C8.95233 13.3672 11.6793 13.9542 11.7943 13.9782C11.9569 14.0132 12.1256 14.0067 12.285 13.9593C12.4444 13.9119 12.5893 13.8252 12.7063 13.7072L14.0003 12.4142L16.5863 15.0002L14.5803 17.0052Z"
                                                    fill="#0B2D44"
                                                />
                                            </svg>
                                            {content?.phone}
                                        </Link>
                                    </li>
                                )}
                                {content?.address && (
                                    <li>
                                        <div className="inline-flex gap-4">
                                            <svg
                                                className="relative top-[2px]"
                                                width="16"
                                                height="20"
                                                viewBox="0 0 16 20"
                                                fill="none"
                                                xmlns="http://www.w3.org/2000/svg"
                                            >
                                                <path
                                                    d="M8.00006 12C10.2061 12 12.0001 10.206 12.0001 8C12.0001 5.794 10.2061 4 8.00006 4C5.79406 4 4.00006 5.794 4.00006 8C4.00006 10.206 5.79406 12 8.00006 12ZM8.00006 6C9.10306 6 10.0001 6.897 10.0001 8C10.0001 9.103 9.10306 10 8.00006 10C6.89706 10 6.00006 9.103 6.00006 8C6.00006 6.897 6.89706 6 8.00006 6Z"
                                                    fill="#0B2D44"
                                                />
                                                <path
                                                    d="M7.42009 19.814C7.58934 19.9349 7.79211 19.9998 8.00009 19.9998C8.20806 19.9998 8.41084 19.9349 8.58009 19.814C8.88409 19.599 16.0291 14.44 16.0001 8C16.0001 3.589 12.4111 0 8.00009 0C3.58909 0 8.80377e-05 3.589 8.80377e-05 7.995C-0.028912 14.44 7.11609 19.599 7.42009 19.814ZM8.00009 2C11.3091 2 14.0001 4.691 14.0001 8.005C14.0211 12.443 9.61209 16.428 8.00009 17.735C6.38909 16.427 1.97909 12.441 2.00009 8C2.00009 4.691 4.69109 2 8.00009 2Z"
                                                    fill="#0B2D44"
                                                />
                                            </svg>
                                            {parse(content?.address)}
                                        </div>
                                    </li>
                                )}
                            </ul>
                        </div>
                    </div>
                    <div className="md:col-span-6 md:col-start-7">
                        <Form form={form} />
                    </div>
                </div>
            </div>
        </Section>
    );
}
