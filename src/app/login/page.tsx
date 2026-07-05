"use client";
import { Input } from "@/shared/ui/Input";
import Link from "next/link";
import { BsGithub } from "react-icons/bs";
import { FcGoogle } from "react-icons/fc";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { useState } from "react";
import { toast } from "sonner";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

const LogIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });

  const router = useRouter();

  const validate = () => {
    const newErrors = { email: "", password: "" };
    let isValid = true;

    if (!email || !/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email)) {
      newErrors.email = "Please provide a valid email";
      isValid = false;
    }
    if (!password) {
      newErrors.password = "Password is required";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleLogin = async () => {
    if (!validate()) return;

    setLoading(true);
    try {
      const response = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (!response || response.error) {
        toast.error("Invalid email or password");
        return;
      }

      router.push("/profiles");
    } catch (err) {
      console.log(err);
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-cover bg-no-repeat flex items-center justify-center bg-black loginContainer">
      <div className="max-w-[480px] w-full bg-[#000000b3] rounded-sm py-12 px-16 font-bold text-[2rem] text-white flex flex-col gap-5 z-50">
        <h1>Log In</h1>

        <div className="flex flex-col gap-1">
          <Input
            type="email"
            placeholder="Email"
            className="py-6 px-2"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              setErrors((prev) => ({ ...prev, email: "" }));
            }}
          />
          {errors.email && <span className="text-red-500 text-sm font-normal">{errors.email}</span>}
        </div>

        <div className="flex flex-col gap-1">
          <div className="relative">
            <Input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              className="py-6 px-2 pr-10"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setErrors((prev) => ({ ...prev, password: "" }));
              }}
            />
            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-[#ffffffb3] hover:text-white cursor-pointer"
              tabIndex={-1}
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? <FiEyeOff size={20} /> : <FiEye size={20} />}
            </button>
          </div>
          {errors.password && <span className="text-red-500 text-sm font-normal">{errors.password}</span>}
        </div>

        <button
          className="cursor-pointer w-full bg-[#e50914] text-base font-medium rounded-lg py-2.5 disabled:opacity-50"
          onClick={handleLogin}
          disabled={loading}
        >
          {loading ? "Signing in..." : "Sign In"}
        </button>

        <p className="text-center text-[1rem] text-[#ffffffb3] text-base">OR</p>

        <div className="flex items-center justify-center gap-4">
          <FcGoogle className="cursor-pointer w-10 h-10" onClick={() => signIn("google", { callbackUrl: "/profiles" })} />
          <BsGithub className="cursor-pointer w-10 h-10"  onClick={() => signIn("github",{ callbackUrl: "/profiles" })} />
        </div>

        <div>
          <span className="text-[#ffffffb3] text-[1rem]">Don't have an account? </span>
          <Link href="/signup" className="text-white text-[1rem]">Sign Up</Link>
        </div>
      </div>
    </div>
  );
};

export default LogIn;