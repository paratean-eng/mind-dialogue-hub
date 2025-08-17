import { ChatInterface } from "@/components/chat/chat-interface";
import { SidebarTrigger } from "@/components/ui/sidebar";

const Index = () => {
  return (
    <div className="h-full flex flex-col">
      <header className="h-12 flex items-center border-b border-sidebar-border bg-background px-4">
        <SidebarTrigger />
      </header>
      <div className="flex-1">
        <ChatInterface />
      </div>
    </div>
  );
};

export default Index;
