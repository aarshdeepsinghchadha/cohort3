export default function Header() {
    return (
        <header className="bg-gray-800 text-white p-4">
            <div className="container mx-auto flex justify-between items-center">
                <h1 className="text-xl font-semibold">My App</h1>
                <nav>
                    <ul className="flex space-x-4">
                        <li>
                            <a href="/auth/signin" className="hover:text-gray-300">
                                Sign In
                            </a>
                        </li>
                        <li>
                            <a href="/auth/signup" className="hover:text-gray-300">
                                Sign Up
                            </a>
                        </li>
                    </ul>
                </nav>
            </div>
        </header>
    );
}
