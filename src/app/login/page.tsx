"use client";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();

  const handleLogin = (role: string) => {
    localStorage.setItem("userRole", role);

    if (role === "member") {
      router.push("/dashboard");
    } else if (role === "admin") {
      router.push("/admin");
    } else if (role === "superadmin") {
      router.push("/superadmin");
    }
  };

  return (
    <div className="min-h-screen bg-purple-100 flex flex-col items-center justify-center px-4">
      <div className="text-center mb-8">
        <div className="w-16 h-16 mx-auto mb-4 bg-purple-700 text-white rounded-full flex items-center justify-center text-2xl font-bold">
          🏛️
        </div>
        <h1 className="text-3xl font-bold text-purple-900">SocietyFlow</h1>
        <p className="text-purple-700 mt-2 text-sm">
          Streamlining and making your housing society operations transparent.
        </p>
      </div>

      <div className="bg-white rounded-2xl shadow-md p-8 w-full max-w-md">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          Welcome Back!
        </h2>
        <p className="text-sm text-gray-500 mb-6">
          Select your role to sign in to your dashboard.
        </p>

        <div className="space-y-3">
          <button
            onClick={() => handleLogin("member")}
            className="w-full bg-purple-100 text-purple-900 py-2 rounded hover:bg-purple-200 transition"
          >
            Sign in as Member
          </button>
          <button
            onClick={() => handleLogin("admin")}
            className="w-full bg-purple-100 text-purple-900 py-2 rounded hover:bg-purple-200 transition"
          >
            Sign in as Admin
          </button>
          <button
            onClick={() => handleLogin("superadmin")}
            className="w-full bg-purple-800 text-white py-2 rounded hover:bg-purple-900 transition"
          >
            Sign in as Super Admin
          </button>
        </div>
      </div>
    </div>
  );
}
