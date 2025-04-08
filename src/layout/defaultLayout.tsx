import { ReactNode } from "react"
export default function DefaultLayout({ children }: { children: ReactNode }) {
    return(
        <div className="p-5">
            <h1 className="text-4xl font-bold text-primary">Home Hero </h1>
            <main>{children}</main>
        </div>
    )
}