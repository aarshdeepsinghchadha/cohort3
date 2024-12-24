import { Navbar } from "../components/navbar";

export default function AuthLayout({children} ) {
    return <div>
        <Navbar/>
        {children}
    </div>
}