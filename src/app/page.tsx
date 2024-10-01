import { options } from './api/auth/[...nextauth]/options';
import { getServerSession } from 'next-auth/next';
import Link from 'next/link';

export default async function Home() {
    const session = await getServerSession(options);

    return (
        <section className="flex items-center justify-center min-h-screen">
            {session ? (
                <h1 className="text-center text-2xl mx-auto">{`Hi...${session.user.role}`}</h1>
            ) : (
                <h1 className="text-center text-2xl mx-auto"> You aren't signed in <Link href="/api/auth/signin?callbackUrl=/" className='text-blue-800'>SignIn</Link> to continue</h1>
            )}
        </section>
    );
}
