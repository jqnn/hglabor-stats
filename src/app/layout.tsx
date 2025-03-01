import type {Metadata} from "next";
import "@/css/tailwind.css";
import {FooterComponent} from "@/components/FooterComponent";
import {SearchComponent} from "@/components/SearchComponent";
import Link from "next/link";

export const metadata: Metadata = {
    title: "HGLabor.de | FFA Stats",
};

export default function RootLayout({children}: Readonly<{ children: React.ReactNode; }>) {
    return (
        <html lang="de">
        <body className="min-h-screen">

        <div className="w-full max-w-5xl mx-auto p-4 sm:p-8">
            <header className="text-center mb-6">
                <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-500 to-blue-700 text-transparent bg-clip-text mb-1">
                    <Link href="/">FFA Stats</Link>
                </h1>
                <p className="text-zinc-400 text-sm sm:text-base">Check your stats and compare yourself with others</p>
            </header>

            <SearchComponent/>

            {children}
            <FooterComponent/>
        </div>

        </body>
        </html>
    );
}