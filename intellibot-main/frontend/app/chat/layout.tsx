import { ChatSidebar } from "@/features/chat/components/ChatSidebar";
import { auth } from "@/auth";
import { redirect } from "next/navigation";

export default async function ChatLayout({ children }: { children: React.ReactNode }) {
  const session = await auth();
  
  if (!session) {
    redirect("/auth/login");
  }

  return (
    <div className="flex h-screen bg-transparent text-[#ECECF1] overflow-hidden">
      <ChatSidebar />
      <main className="flex-1 relative flex flex-col min-w-0 min-h-0">
        {children}
      </main>
    </div>
  );
}
