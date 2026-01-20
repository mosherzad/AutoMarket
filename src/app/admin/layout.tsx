import { ReactNode } from "react";
import AdminSidebar from "@/components/AdminSidebar";

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <div className="mx-auto max-w-7xl mt-5 px-4">
      <div className="flex flex-col md:flex-row gap-4">
        {/* Sidebar */}
        <AdminSidebar />

        {/* Content */}
        <main className="flex-1 p-4">{children}</main>
      </div>
    </div>
  );
}
