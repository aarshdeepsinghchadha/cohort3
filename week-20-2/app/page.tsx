// "use client";
import { getServerSession } from "next-auth";
import { SessionProvider, signIn, useSession } from "next-auth/react";
import { signOut } from "next-auth/react";

// export default function Home() {
//   const session = useSession();

//   return (
//     <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
//       {session.status === "authenticated" ? "Logout" : "Sign in"}
//     </div>
//   );
// }


// export default function Home() {
//   return (
//     <SessionProvider>
//       <RealHome />
//     </SessionProvider>
//   );
// }

// function RealHome() {
//   const { status } = useSession();

//   return (
//     <div className="grid grid-rows-[auto_1fr_auto] items-center justify-items-center min-h-screen p-8 pb-20 gap-8 sm:p-20 font-sans">
//       {status === "authenticated" && (
//         <button
//           onClick={() => signOut()}
//           className="px-6 py-2 text-white bg-red-500 rounded hover:bg-red-600"
//         >
//           Logout
//         </button>
//       )}
//       {status === "unauthenticated" && (
//         <button
//           onClick={() => signIn()}
//           className="px-6 py-2 text-white bg-blue-500 rounded hover:bg-blue-600"
//         >
//           Sign in
//         </button>
//       )}
//     </div>
//   );
// }




export default async function Home() {
  const session = await getServerSession();


  return (<div>
    {JSON.stringify(session)}
  </div>
  )
}

function RealHome() {
  const { status } = useSession();

  return (
    <div className="grid grid-rows-[auto_1fr_auto] items-center justify-items-center min-h-screen p-8 pb-20 gap-8 sm:p-20 font-sans">
      {status === "authenticated" && (
        <button
          onClick={() => signOut()}
          className="px-6 py-2 text-white bg-red-500 rounded hover:bg-red-600"
        >
          Logout
        </button>
      )}
      {status === "unauthenticated" && (
        <button
          onClick={() => signIn()}
          className="px-6 py-2 text-white bg-blue-500 rounded hover:bg-blue-600"
        >
          Sign in
        </button>
      )}
    </div>
  );
}