"use client";

import { signOut } from "@/lib/auth-client";
import { useRouter } from "next/navigation";

const Logout = () => {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await signOut();              // clear session
    } catch (err) {
      console.error("Logout error:", err);
    } finally {
      router.replace("/login");     // redirect to login page
    }
  };

  return (
    <button onClick={handleLogout} className="w-full text-left">
      Logout
    </button>
  );
};

export default Logout;