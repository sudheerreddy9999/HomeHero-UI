import { ReactNode } from "react";

export default function AuthorizedLayout({children}: {children: ReactNode}) {
    return(
        <div>
            <main>
                {children}
            </main>
        </div>
    )
}