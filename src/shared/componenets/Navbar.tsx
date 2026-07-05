// "use client";
// import { Sparkle, Menu, X, Search, Bell } from "lucide-react";
// import Image from "next/image";
// import { useState, useEffect } from "react";
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuGroup,
//   DropdownMenuItem,
//   DropdownMenuSeparator,
//   DropdownMenuTrigger
// } from "../componenets/Dropdown-Menu";
// import { signOut, useSession } from "next-auth/react";
// import { useRouter } from "next/navigation";
// import NetflixGptModal from "./NetflixGptModal";
// const NAV_LINKS = ["Home", "Shows", "Movies", "Games"];

// const Navbar = () => {
//   const [isScrolled, setIsScrolled] = useState(false);
//   const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
//   const[isNeflixGptOpen,setNeflixGptOpen]=useState(false)

//   useEffect(() => {
//     const handleScroll = () => {
//       setIsScrolled(window.scrollY > 50);
//     };

//     window.addEventListener("scroll", handleScroll);
//     return () => window.removeEventListener("scroll", handleScroll);
//   }, []);

//   const router = useRouter();
//   const profileHandleClick = () => {
//     router?.push("/profiles");
//   };
//   const { data: session } = useSession();

//   return (
//     <>
//       <div
//       className={`fixed top-0 left-0 z-50 w-full
//         transition-all duration-500
//         ${isScrolled ? "bg-black/90 backdrop-blur-sm" : "bg-transparent"}`}
//     >
//       <div className="flex justify-between items-center px-4 sm:px-6 md:px-12 py-3 md:py-4">
//         <div className="flex items-center gap-3 md:gap-8">
//           {/* Mobile hamburger */}
//           <button
//             className="md:hidden text-white cursor-pointer"
//             onClick={() => setMobileMenuOpen((prev) => !prev)}
//             aria-label="Toggle menu"
//           >
//             {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
//           </button>

//           <h1
//             className="cursor-pointer
//                 text-[#E50914]
//                 text-xl sm:text-2xl md:text-[2rem]
//                 font-black
//                 tracking-[-0.08em]
//                 leading-none
//                 select-none
//                 drop-shadow-[0_2px_2px_rgba(0,0,0,0.5)]"
//           >
//             Netflix
//           </h1>

//           {/* Desktop nav links */}
//           <ul className="hidden md:flex gap-5 text-sm">
//             {NAV_LINKS.map((link) => (
//               <li
//                 key={link}
//                 className="text-[#e5e5e5] hover:text-[#b3b3b3] transition-colors cursor-pointer"
//               >
//                 {link}
//               </li>
//             ))}
//           </ul>
//         </div>

//         <div className="flex gap-3 sm:gap-4 md:gap-[15px] items-center">
//                 <button
//             className="flex cursor-pointer"
//             onClick={() => setNeflixGptOpen(true)}
//         >
//             <Sparkle className="text-white w-5 h-5 md:w-6 md:h-6" />
//         </button>

//           <button className="cursor-pointer"
//          >
//             <Search className="text-white w-5 h-5 md:w-6 md:h-6" />
//           </button>

//           {/* <button className="hidden sm:flex cursor-pointer">
//             <Bell className="text-white w-5 h-5 md:w-6 md:h-6" />
//           </button> */}

//           <DropdownMenu modal={false}>
//             <DropdownMenuTrigger asChild>
//               <button className="cursor-pointer text-white">
//                 <Image
//                   src="/assets/profile.png"
//                   width={32}
//                   height={32}
//                   alt="user"
//                   className="rounded-[4px] w-7 h-7 md:w-8 md:h-8"
//                 />
//               </button>
//             </DropdownMenuTrigger>

//             <DropdownMenuContent
//               className="bg-[#000000e6] border-none btext w-[200px]"
//               style={{ "--accent-foreground": "#4b4b4b" } as React.CSSProperties}
//             >
//               <DropdownMenuGroup>
//                 <DropdownMenuItem onClick={() => profileHandleClick()}>
//                   <Image
//                     src="/assets/profile.png"
//                     width={32}
//                     height={32}
//                     alt="user"
//                     className="rounded-[4px]"
//                   />
//                   <span className="text-white text-[14px] ml-2 line-clamp-1">
//                     {session?.user?.name}
//                   </span>
//                 </DropdownMenuItem>
//               </DropdownMenuGroup>

//               <DropdownMenuSeparator className="bg-[#ffffff40]" />

//               <DropdownMenuGroup>
//                 <DropdownMenuItem
//                   className="text-white text-[13px] px-2 py-2 flex justify-between hover:bg-[#ffffff1a] cursor-pointer"
//                   onClick={() => signOut()}
//                 >
//                   Sign Out
//                 </DropdownMenuItem>
//               </DropdownMenuGroup>
//             </DropdownMenuContent>
//           </DropdownMenu>
//         </div>
//       </div>

//       {/* Mobile dropdown nav links */}
//       <div
//         className={`md:hidden overflow-hidden transition-all duration-300 ${
//           mobileMenuOpen ? "max-h-64 opacity-100" : "max-h-0 opacity-0"
//         } ${isScrolled ? "bg-black/90" : "bg-black/60 backdrop-blur-sm"}`}
//       >
//         <ul className="flex flex-col px-4 py-2">
//           {NAV_LINKS.map((link) => (
//             <li
//               key={link}
//               onClick={() => setMobileMenuOpen(false)}
//               className="text-[#e5e5e5] hover:text-[#b3b3b3] transition-colors cursor-pointer py-3 border-b border-white/10 text-sm"
//             >
//               {link}
//             </li>
//           ))}
//         </ul>
//       </div>
//     </div>
//     {isNeflixGptOpen?
//     (<NetflixGptModal isNetflixGptOpen={isNeflixGptOpen}
//       setNetflixGptOpen={setNeflixGptOpen}
//     />)
//     :null}
//     </>
//   );
// };

// export default Navbar;

"use client";
import { Sparkle, Menu, X, Search } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { usePathname, useRouter } from "next/navigation";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "../componenets/Dropdown-Menu";
import { signOut, useSession } from "next-auth/react";
import NetflixGptModal from "./NetflixGptModal";

const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "Shows", href: "/shows" },
  { label: "Movies", href: "/movies" }
];

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isNeflixGptOpen, setNeflixGptOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const searchInputRef = useRef<HTMLInputElement>(null);

  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (searchOpen) {
      searchInputRef.current?.focus();
    }
  }, [searchOpen]);

  const profileHandleClick = () => {
    router?.push("/profiles");
  };

  const { data: session } = useSession();

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const query = searchQuery.trim();
    if (query) {
      router.push(`/search?q=${encodeURIComponent(query)}`);
      setSearchOpen(false);
      setSearchQuery("");
    }
  };

  const handleSearchToggle = () => {
    setSearchOpen((prev) => !prev);
    if (searchOpen) setSearchQuery("");
  };

  return (
    <>
      <div
        className={`fixed top-0 left-0 z-50 w-full
          transition-all duration-500
          ${isScrolled ? "bg-black/90 backdrop-blur-sm" : "bg-transparent"}`}
      >
        <div className="flex justify-between items-center px-4 sm:px-6 md:px-12 py-3 md:py-4">
          <div className="flex items-center gap-3 md:gap-8">
            {/* Mobile hamburger */}
            <button
              className="md:hidden text-white cursor-pointer"
              onClick={() => setMobileMenuOpen((prev) => !prev)}
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>

            <Link href="/">
              <h1
                className="cursor-pointer
                    text-[#E50914]
                    text-xl sm:text-2xl md:text-[2rem]
                    font-black
                    tracking-[-0.08em]
                    leading-none
                    select-none
                    drop-shadow-[0_2px_2px_rgba(0,0,0,0.5)]"
              >
                Netflix
              </h1>
            </Link>

            {/* Desktop nav links */}
            <ul className="hidden md:flex gap-5 text-sm">
              {NAV_LINKS.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className={`transition-colors cursor-pointer ${
                        isActive
                          ? "text-white font-semibold"
                          : "text-[#e5e5e5] hover:text-[#b3b3b3]"
                      }`}
                    >
                      {link.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>

          <div className="flex gap-3 sm:gap-4 md:gap-[15px] items-center">
            <button
              className="flex cursor-pointer"
              onClick={() => setNeflixGptOpen(true)}
              aria-label="Netflix GPT recommendations"
            >
              <Sparkle className="text-white w-5 h-5 md:w-6 md:h-6" />
            </button>

            {/* Search */}
            <form
              onSubmit={handleSearchSubmit}
              className="flex items-center"
            >
              <div
                className={`flex items-center overflow-hidden transition-all duration-300 ease-out ${
                  searchOpen
                    ? "w-32 sm:w-48 md:w-56 border border-white/40 bg-black/70 rounded-sm px-2"
                    : "w-0"
                }`}
              >
                <input
                  ref={searchInputRef}
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Titles, people, genres"
                  className={`bg-transparent text-white text-sm placeholder:text-[#999] outline-none py-1.5 w-full ${
                    searchOpen ? "opacity-100" : "opacity-0"
                  }`}
                />
              </div>
              <button
                type="button"
                className="cursor-pointer shrink-0"
                onClick={handleSearchToggle}
                aria-label="Toggle search"
              >
                {searchOpen ? (
                  <X className="text-white w-5 h-5 md:w-6 md:h-6" />
                ) : (
                  <Search className="text-white w-5 h-5 md:w-6 md:h-6" />
                )}
              </button>
            </form>

            <DropdownMenu modal={false}>
              <DropdownMenuTrigger asChild>
                <button className="cursor-pointer text-white">
                  <Image
                    src="/assets/profile.png"
                    width={32}
                    height={32}
                    alt="user"
                    className="rounded-[4px] w-7 h-7 md:w-8 md:h-8"
                  />
                </button>
              </DropdownMenuTrigger>

              <DropdownMenuContent
                className="bg-[#000000e6] border-none btext w-[200px]"
                style={{ "--accent-foreground": "#4b4b4b" } as React.CSSProperties}
              >
                <DropdownMenuGroup>
                  <DropdownMenuItem onClick={() => profileHandleClick()}>
                    <Image
                      src="/assets/profile.png"
                      width={32}
                      height={32}
                      alt="user"
                      className="rounded-[4px]"
                    />
                    <span className="text-white text-[14px] ml-2 line-clamp-1">
                      {session?.user?.name}
                    </span>
                  </DropdownMenuItem>
                </DropdownMenuGroup>

                <DropdownMenuSeparator className="bg-[#ffffff40]" />

                <DropdownMenuGroup>
                  <DropdownMenuItem
                    className="text-white text-[13px] px-2 py-2 flex justify-between hover:bg-[#ffffff1a] cursor-pointer"
                    onClick={() => signOut()}
                  >
                    Sign Out
                  </DropdownMenuItem>
                </DropdownMenuGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        {/* Mobile dropdown nav links */}
        <div
          className={`md:hidden overflow-hidden transition-all duration-300 ${
            mobileMenuOpen ? "max-h-64 opacity-100" : "max-h-0 opacity-0"
          } ${isScrolled ? "bg-black/90" : "bg-black/60 backdrop-blur-sm"}`}
        >
          <ul className="flex flex-col px-4 py-2">
            {NAV_LINKS.map((link) => {
              const isActive = pathname === link.href;
              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`block transition-colors cursor-pointer py-3 border-b border-white/10 text-sm ${
                      isActive
                        ? "text-white font-semibold"
                        : "text-[#e5e5e5] hover:text-[#b3b3b3]"
                    }`}
                  >
                    {link.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
      {isNeflixGptOpen ? (
        <NetflixGptModal
          isNetflixGptOpen={isNeflixGptOpen}
          setNetflixGptOpen={setNeflixGptOpen}
        />
      ) : null}
    </>
  );
};

export default Navbar;