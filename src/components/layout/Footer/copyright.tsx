'use client';

import Image from 'next/image';
import { useState } from 'react';

export default function Copyright() {
    const [counter, setCounter] = useState(0);

    return (
        <div
            className="text-small"
            onClick={() => {
                setCounter(counter + 1);
            }}
        >
            {new Date().getFullYear()} SHK. All rights reserved.
            {counter > 11 && <Image src="/flo.png" width="400" height="400" alt="" />}
        </div>
    );
}
