"use client";

import React, { useState } from "react";
import { Sidebar } from "@/components/dashboard/Sidebar";
import { Topbar } from "@/components/dashboard/Topbar";
import { MemberModal } from "@/components/dashboard/MemberModal";
import { QRScannerModal } from "@/components/dashboard/QRScannerModal";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);
  const [isScannerOpen, setIsScannerOpen] = useState(false);

  return (
    <div className="min-h-screen bg-dark-950 text-zinc-100 flex">
      {/* Sidebar navigation */}
      <Sidebar
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
      />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 lg:pl-64">
        <Topbar
          onToggleSidebar={() => setIsSidebarOpen((prev) => !prev)}
          onOpenRegisterModal={() => setIsRegisterOpen(true)}
          onOpenScannerModal={() => setIsScannerOpen(true)}
        />

        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto">
          {children}
        </main>
      </div>

      {/* Global Quick Action Modals */}
      <MemberModal
        isOpen={isRegisterOpen}
        onClose={() => setIsRegisterOpen(false)}
      />

      <QRScannerModal
        isOpen={isScannerOpen}
        onClose={() => setIsScannerOpen(false)}
      />
    </div>
  );
}
