import React from 'react';
import Link from 'next/link';

export default function page() {
    return (
        <div>
            <h1>
                Access denied as per your position. Go to{' '}
                <Link href={'/'}>Home</Link>
            </h1>
        </div>
    );
}
