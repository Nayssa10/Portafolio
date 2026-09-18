"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowRight, AlertCircle, Sparkles, Lock, User, ArrowLeft } from "lucide-react";

export default function AdminLoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Credenciales incorrectas");
        setIsLoading(false);
        return;
      }

      router.push("/admin");
      router.refresh();
    } catch {
      setError("Error de conexión con el servidor");
      setIsLoading(false);
    }
  };

  return (
    // Base: Deep Velvet Solid Noir (#0D0304)
    <div className="min-h-screen bg-[#0D0304] text-[#EEE4DA] flex items-center justify-center p-6 relative overflow-hidden font-sans selection:bg-[#4D0E13] selection:text-[#EEE4DA]">
      <div className="w-full max-w-md relative z-10">
        {/* Card: Deep Burgundy Surface (#2A0A10) with Sand (#D8C4AC) border */}
        <div className="rounded-3xl bg-[#2A0A10] border border-[#D8C4AC]/40 p-8 sm:p-10 shadow-2xl shadow-black/80 relative">
          {/* Header */}
          <div className="text-center mb-8">
            <span className="inline-block text-[11px] font-mono uppercase tracking-[0.25em] text-[#D8C4AC] font-semibold mb-3">
              Área Privada
            </span>
            <h1 className="font-serif italic text-3xl sm:text-4xl text-[#EEE4DA] font-normal tracking-tight">
              Gestión del Portafolio
            </h1>
            <p className="text-xs text-[#D8C4AC]/80 mt-2 font-normal">
              Ingresá tus credenciales para administrar tus contenidos
            </p>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-6 p-3.5 rounded-xl bg-[#4D0E13]/60 border border-[#C8A49F]/40 text-[#EEE4DA] text-xs flex items-center gap-2.5 shadow-sm font-medium">
              <AlertCircle className="w-4 h-4 shrink-0 text-[#C8A49F]" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-[11px] font-mono uppercase tracking-widest text-[#D8C4AC] font-semibold mb-2">
                Usuario
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#C8A49F]/70">
                  <User className="w-4 h-4" />
                </div>
                <input
                  type="text"
                  required
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Tu usuario"
                  className="w-full pl-10 pr-4 py-3 rounded-xl bg-[#140406]/90 border border-[#D8C4AC]/25 text-[#EEE4DA] placeholder-[#C8A49F]/40 focus:outline-none focus:border-[#D8C4AC] focus:ring-1 focus:ring-[#D8C4AC]/40 transition-all text-xs font-normal"
                />
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-mono uppercase tracking-widest text-[#D8C4AC] font-semibold mb-2">
                Contraseña
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#C8A49F]/70">
                  <Lock className="w-4 h-4" />
                </div>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-4 py-3 rounded-xl bg-[#140406]/90 border border-[#D8C4AC]/25 text-[#EEE4DA] placeholder-[#C8A49F]/40 focus:outline-none focus:border-[#D8C4AC] focus:ring-1 focus:ring-[#D8C4AC]/40 transition-all text-xs font-normal"
                />
              </div>
            </div>

            {/* Primary button: Sand (#D8C4AC) with Deep Burgundy text */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full mt-2 py-3.5 px-6 rounded-xl bg-[#D8C4AC] hover:bg-[#EEE4DA] text-[#140507] font-bold text-xs uppercase tracking-widest transition-all duration-200 flex items-center justify-center gap-2 shadow-lg shadow-black/40 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
            >
              {isLoading ? (
                <div className="w-4 h-4 border-2 border-[#140507]/30 border-t-[#140507] rounded-full animate-spin" />
              ) : (
                <>
                  <span>Ingresar al panel</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </>
              )}
            </button>
          </form>

          <div className="mt-8 text-center pt-6 border-t border-[#D8C4AC]/20">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-xs text-[#D8C4AC]/80 hover:text-[#EEE4DA] transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Volver al portafolio</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
