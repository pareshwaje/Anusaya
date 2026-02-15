"use client";
import { useRouter } from "next/navigation";
import { ArrowRight, Building2, ShieldCheck, User, Users, Lock } from "lucide-react";
import { cn } from "@/lib/utils";
import { useState, useEffect } from "react";

interface LoginInterfaceProps {
    initialStep?: 'society-code' | 'role-select';
    initialCode?: string;
}

export default function LoginInterface({ initialStep = 'society-code', initialCode = '' }: LoginInterfaceProps) {
    const router = useRouter();
    const [step, setStep] = useState<'society-code' | 'role-select'>(initialStep);
    const [societyCode, setSocietyCode] = useState(initialCode);
    const [error, setError] = useState("");

    const handleVerifyCode = (e: React.FormEvent) => {
        e.preventDefault();
        const validCodes = ["4325ANU", "ANUSAYA"]; // Add valid codes here
        if (validCodes.includes(societyCode.trim().toUpperCase())) {
            setStep("role-select");
            setError("");
        } else {
            setError("Invalid Society Code. Please try again.");
        }
    };

    const handleLogin = (role: string) => {
        localStorage.setItem("userRole", role);
        localStorage.setItem("societyId", societyCode.toUpperCase());

        if (role === "member") {
            router.push("/dashboard");
        } else if (role === "admin") {
            router.push("/admin");
        } else if (role === "superadmin") {
            router.push("/superadmin");
        } else if (role === "watchman") {
            router.push("/watchman");
        }
    };

    return (
        <div className="min-h-screen w-full flex items-center justify-center bg-gray-50 p-4">
            <div className="max-w-md w-full bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100">

                {/* Header */}
                <div className="bg-indigo-600 p-8 text-center">
                    <div className="inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-white/20 text-white mb-4 backdrop-blur-sm">
                        <Building2 className="h-8 w-8" />
                    </div>
                    <h1 className="text-2xl font-bold text-white tracking-tight">SocietyFlow Login</h1>
                    <p className="text-indigo-100 mt-2 text-sm">Secure Access Portal</p>
                </div>

                <div className="p-8">
                    {step === 'society-code' ? (
                        <div className="animate-in fade-in slide-in-from-right-8 duration-300">
                            <h2 className="text-xl font-bold text-gray-800 mb-2 text-center">Enter Society Code</h2>
                            <p className="text-gray-500 text-sm text-center mb-6">Please enter the unique alphanumeric code provided by your society admin.</p>

                            <form onSubmit={handleVerifyCode}>
                                <div className="relative mb-6">
                                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                    <input
                                        autoFocus
                                        type="text"
                                        placeholder="e.g. 4325ANU"
                                        value={societyCode}
                                        onChange={(e) => setSocietyCode(e.target.value.toUpperCase())}
                                        className="w-full pl-10 pr-4 py-3.5 rounded-xl border border-gray-200 focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none font-mono text-lg tracking-widest text-center uppercase"
                                    />
                                </div>

                                {error && (
                                    <p className="text-red-500 text-xs font-bold text-center mb-4 bg-red-50 py-2 rounded-lg">{error}</p>
                                )}

                                <button
                                    type="submit"
                                    className="w-full py-3.5 bg-indigo-600 text-white rounded-xl font-bold shadow-lg shadow-indigo-500/20 hover:bg-indigo-700 active:scale-95 transition-all flex items-center justify-center gap-2"
                                >
                                    Verify & Proceed <ArrowRight className="w-4 h-4" />
                                </button>
                            </form>

                            <p className="text-center mt-6 text-xs text-gray-400">
                                Don't have a code? Contact your society secretary.
                            </p>
                        </div>
                    ) : (
                        <div className="animate-in fade-in slide-in-from-right-8 duration-300">
                            <div className="flex items-center justify-between mb-6">
                                <button
                                    onClick={() => setStep('society-code')}
                                    className="text-xs font-bold text-gray-400 hover:text-gray-600"
                                >
                                    ← Change Society
                                </button>
                                <span className="bg-green-100 text-green-700 text-[10px] font-bold px-2 py-0.5 rounded-full border border-green-200">
                                    VERIFIED: {societyCode}
                                </span>
                            </div>

                            <h2 className="text-xl font-bold text-gray-800 mb-6 text-center">Select Your Role</h2>

                            <div className="space-y-3">
                                {[
                                    { id: 'member', label: 'Member Login', desc: 'Residents & Owners', icon: User, color: 'bg-blue-100 text-blue-600' },
                                    { id: 'admin', label: 'Admin Login', desc: 'Secretaries & Committee', icon: ShieldCheck, color: 'bg-purple-100 text-purple-600' },
                                    { id: 'superadmin', label: 'Super Admin', desc: 'System Controllers', icon: Users, color: 'bg-orange-100 text-orange-600' },
                                    { id: 'watchman', label: 'Security Guard', desc: 'Gate & Parking', icon: Lock, color: 'bg-slate-100 text-slate-600' },
                                ].map((role) => (
                                    <button
                                        key={role.id}
                                        onClick={() => handleLogin(role.id)}
                                        className="w-full flex items-center p-3 rounded-xl border border-gray-100 hover:border-indigo-100 hover:bg-indigo-50/50 transition-all group text-left"
                                    >
                                        <div className={cn("h-12 w-12 rounded-xl flex items-center justify-center mr-4 shadow-sm", role.color)}>
                                            <role.icon className="w-6 h-6" />
                                        </div>
                                        <div className="flex-1">
                                            <h3 className="font-bold text-gray-800">{role.label}</h3>
                                            <p className="text-xs text-gray-500">{role.desc}</p>
                                        </div>
                                        <ArrowRight className="w-4 h-4 text-gray-300 group-hover:text-indigo-600 transition-colors" />
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
