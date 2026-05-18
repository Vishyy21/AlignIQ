import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import { Sidebar } from "@/components/layout/Sidebar";
import { Topbar } from "@/components/layout/Topbar";
import { AIPanel } from "@/components/ai/AIPanel";
import { Toast } from "@/components/ui/Toast";

export const metadata: Metadata = {
  title: "ALIGNIQ — Executive Governance Platform",
  description: "AI-Powered Enterprise Governance Intelligence System",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="antialiased overflow-hidden" suppressHydrationWarning>
        <ThemeProvider>
          <div className="ambient-bg" />
          <div className="flex h-screen w-screen overflow-hidden">
            <Sidebar />
            <div className="flex-1 flex flex-col min-w-0">
              <Topbar />
              <main className="flex-1 overflow-y-auto p-7 pt-5 pb-10 relative">{children}</main>
            </div>
          </div>
          <AIPanel />
          <Toast />
        </ThemeProvider>
      </body>
    </html>
  );
}
