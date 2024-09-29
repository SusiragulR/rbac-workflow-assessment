import React from "react";
import Link from "next/link";

export default function NavBar() {
	return (
		<nav className="w-full flex justify-around font-semibold py-3 bg-gray-400 text-black">
			<Link href={"/"}><div className="rounded hover:bg-gray-200 px-2 py-2">Home</div></Link>
			<Link href={"/add-transaction"}><div className="rounded hover:bg-gray-200 px-2 py-2">Add Transaction</div></Link>
			<Link href={"/"}><div className="rounded hover:bg-gray-200 px-2 py-2">View Transactions</div></Link>
			<Link href={"/"}><div className="rounded hover:bg-gray-200 px-2 py-2">View Audit</div></Link>
			<Link href={"/api/auth/signout"}><div className="rounded hover:bg-gray-200 px-2 py-2">Sign Out</div></Link>
		</nav>
	);
}
