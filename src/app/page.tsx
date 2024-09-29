import { options } from './api/auth/[...nextauth]/options';
import { getServerSession } from 'next-auth/next';
import Link from 'next/link';

export default async function Home() {
    const session = await getServerSession(options);

    return (
        <section className="">
            {session ? (
                <h1>{`hi...${session.user.role}`}</h1>
            ) : (
                <h1 className="text-center text-large mx-auto"><Link href="/api/auth/signin?callbackUrl=/">SignIn</Link> to continue</h1>
            )}
        </section>
    );
}
