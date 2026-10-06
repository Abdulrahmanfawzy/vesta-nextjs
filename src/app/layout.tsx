import { Geist } from "next/font/google";
import "@/app/globals.css";
import { cn } from "@/lib/utils";

const geist = Geist({ subsets: ['latin'], variable: '--font-sans' });


// layout
export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
            <body className={cn(geist.className, 'antialiased')}>
                {children}
            </body>
        </html>
    );
}