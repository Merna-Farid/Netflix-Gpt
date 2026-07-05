// "use client"
// import Image from "next/image";
// import { useSession } from "next-auth/react";
// import { useRouter } from "next/navigation"; 

// const Profiles = () => {
//   const { data: session, status } = useSession();
//   const router = useRouter();
//   const handleProfile = () => {
//     router.push("/");
//   }
//   return (
//     <div className="flex flex-col items-center justify-center w-full h-screen gap-8">
//       <h1 className="text-white text-[50.4px]">Who's watching?</h1>

//       <div className="flex flex-col items-center gap-3 group">
//         <div className="rounded-sm border-[3.24px] border-[#e5e5e5] overflow-hidden cursor-pointer">
//           <Image
//             width={144}
//             height={144}
//             src="/assets/profile.png"
//             alt="User"
//             className="object-cover"
//             onClick={handleProfile}
//           />
//         </div>
//         <h3 className="text-[#e5e5e5] text-[18.72px] text-center">
//           {status === "loading"
//             ? "Loading..."
//             : session?.user?.name || "Guest"}
//         </h3>
//       </div>
//     </div>
//   );
// };

// export default Profiles;

"use client";

import Image from "next/image";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const Profiles = () => {
  const { data: session, status } = useSession();
  const router = useRouter();

  return (
    <main className="min-h-screen bg-[#141414] flex flex-col items-center justify-center px-6">
      <h1 className="mb-16 text-center text-white font-light tracking-wide text-4xl md:text-6xl">
        Who's Watching?
      </h1>

      <div
        onClick={() => router.push("/")}
        className="group cursor-pointer flex flex-col items-center"
      >
        <div
          className="
            relative
            h-40
            w-40
            overflow-hidden
            rounded-md
            border-[3px]
            border-transparent
            transition-all
            duration-300
            group-hover:border-white
            group-hover:scale-105
          "
        >
          <Image
            src="/assets/profile.png"
            alt="Profile"
            fill
            className="object-cover"
          />
        </div>

        <span
          className="
            mt-4
            text-xl
            text-[#808080]
            transition-colors
            duration-300
            group-hover:text-white
          "
        >
          {status === "loading"
            ? "Loading..."
            : session?.user?.name || "Guest"}
        </span>
      </div>

      <button
        className="
          mt-20
          border
          border-[#666]
          px-8
          py-3
          text-lg
          uppercase
          tracking-[0.2em]
          text-[#808080]
          transition-all
          duration-300
          hover:border-white
          hover:text-white
        "
      >
        Manage Profiles
      </button>
    </main>
  );
};

export default Profiles;