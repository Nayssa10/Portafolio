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
    // Base: Black Cherry / Deep Cosmic Plum (#150529)
    <div className="min-h-screen bg-gradient-to-b from-[#17052E] via-[#1A0735] to-[#120326] text-[#F7F3EC] flex items-center justify-center p-6 relative overflow-hidden font-sans selection:bg-[#8D3A3C] selection:text-white">
      {/* Ambient plum & linen glow */}
      <div className="absolute top-1/4 -left-20 w-[450px] h-[450px] bg-[#3B1254]/40 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-1/4 -right-20 w-[450px] h-[450px] bg-[#D9C7B2]/12 rounded-full blur-[140px] pointer-events-none" />

      {/* Floating Sparkle accent */}
      <div className="absolute top-14 right-1/4 text-[#D9C7B2]/50 pointer-events-none">
        <Sparkles className="w-5 h-5" />
      </div>

      <div className="w-full max-w-md relative z-10">
        {/* Card: Reserve Bordeaux (#250C3A) with Linen Beige (#D9C7B2) border */}
        <div className="rounded-3xl bg-[#230B37]/90 border border-[#D9C7B2]/30 p-8 sm:p-10 backdrop-blur-2xl shadow-2xl shadow-black/80 relative">
          {/* Header */}
          <div className="text-center mb-8">
            <span className="inline-block text-[11px] font-mono uppercase tracking-[0.25em] text-[#D9C7B2] font-semibold mb-3">
              Área Privada
            </span>
            <h1 className="font-serif italic text-3xl sm:text-4xl text-[#F7F3EC] font-normal tracking-tight">
              Gestión del Portafolio
            </h1>
            <p className="text-xs text-[#DECDBB]/80 mt-2 font-normal">
              Ingresá tus credenciales para administrar tus contenidos
            </p>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-6 p-3.5 rounded-xl bg-[#8D3A3C]/40 border border-[#8D3A3C]/70 text-[#FFD6D8] text-xs flex items-center gap-2.5 shadow-sm font-medium">
              <AlertCircle className="w-4 h-4 shrink-0 text-[#FF9E9F]" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-[11px] font-mono uppercase tracking-widest text-[#D9C7B2] font-semibold mb-2">
                Usuario
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#DECDBB]/60">
                  <User className="w-4 h-4" />
                </div>
                <input
                  type="text"
                  required
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Tu usuario"
                  className="w-full pl-10 pr-4 py-3 rounded-xl bg-[#140424]/80 border border-[#D9C7B2]/30 text-white placeholder-[#DECDBB]/40 focus:outline-none focus:border-[#D9C7B2] focus:ring-1 focus:ring-[#D9C7B2]/40 transition-all text-xs font-normal"
                />
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-mono uppercase tracking-widest text-[#D9C7B2] font-semibold mb-2">
                Contraseña
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#DECDBB]/60">
                  <Lock className="w-4 h-4" />
                </div>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-4 py-3 rounded-xl bg-[#140424]/80 border border-[#D9C7B2]/30 text-white placeholder-[#DECDBB]/40 focus:outline-none focus:border-[#D9C7B2] focus:ring-1 focus:ring-[#D9C7B2]/40 transition-all text-xs font-normal"
                />
              </div>
            </div>

            {/* Primary button: Linen Beige (#D9C7B2) with Deep Plum text */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full mt-2 py-3.5 px-6 rounded-xl bg-[#D9C7B2] hover:bg-[#EADBCC] text-[#1A0735] font-bold text-xs uppercase tracking-widest transition-all duration-200 flex items-center justify-center gap-2 shadow-lg shadow-black/40 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
            >
              {isLoading ? (
                <div className="w-4 h-4 border-2 border-[#1A0735]/30 border-t-[#1A0735] rounded-full animate-spin" />
              ) : (
                <>
                  <span>Ingresar al panel</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </>
              )}
            </button>
          </form>

          <div className="mt-8 text-center pt-6 border-t border-[#D9C7B2]/20">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-xs text-[#DECDBB]/75 hover:text-white transition-colors"
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
