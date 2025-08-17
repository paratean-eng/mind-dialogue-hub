import { useState } from "react";
import { Brain, MessageSquarePlus, Search, Library, History, ChevronLeft, ChevronRight } from "lucide-react";
import { NavLink } from "react-router-dom";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  useSidebar,
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

// Mock chat history data
const chatHistory = [
  { id: 1, title: "How to build a React app", timestamp: "2 hours ago" },
  { id: 2, title: "Explain machine learning concepts", timestamp: "1 day ago" },
  { id: 3, title: "JavaScript best practices", timestamp: "3 days ago" },
  { id: 4, title: "Design system implementation", timestamp: "1 week ago" },
  { id: 5, title: "API integration patterns", timestamp: "2 weeks ago" },
];

const navigationItems = [
  { title: "New Chat", url: "/", icon: MessageSquarePlus, variant: "new-chat" as const },
  { title: "Search Chat", url: "/search", icon: Search, variant: "default" as const },
  { title: "Library", url: "/library", icon: Library, variant: "default" as const },
];

export function AppSidebar() {
  const { open, setOpen } = useSidebar();
  const collapsed = !open;

  return (
    <Sidebar
      className={cn(
        "sidebar-transition border-r border-sidebar-border",
        collapsed ? "w-16" : "w-80"
      )}
      collapsible="icon"
    >
      <SidebarHeader className="border-b border-sidebar-border p-4">
        <div className="flex items-center justify-between">
          <div className={cn("flex items-center gap-3", collapsed && "justify-center")}>
            <div className="relative">
              <Brain className="h-8 w-8 text-sidebar-primary mind-dial-glow" />
              <div className="absolute inset-0 h-8 w-8 bg-sidebar-primary/20 rounded-full blur-sm" />
            </div>
            {!collapsed && (
              <span className="text-xl font-bold gradient-text">
                Mind Dial
              </span>
            )}
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setOpen(!open)}
            className="h-8 w-8 text-sidebar-foreground hover:bg-sidebar-accent"
          >
            {collapsed ? (
              <ChevronRight className="h-4 w-4" />
            ) : (
              <ChevronLeft className="h-4 w-4" />
            )}
          </Button>
        </div>
      </SidebarHeader>

      <SidebarContent className="p-4 space-y-6">
        {/* Main Navigation */}
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-2">
              {navigationItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink
                      to={item.url}
                      end
                      className={({ isActive }) =>
                        cn(
                          "flex items-center gap-3 p-3 rounded-lg sidebar-transition",
                          "hover:bg-sidebar-accent text-sidebar-foreground",
                          isActive && "bg-sidebar-primary text-sidebar-primary-foreground shadow-md",
                          item.variant === "new-chat" && !isActive && "hover:bg-sidebar-primary/10 hover:text-sidebar-primary",
                          collapsed && "justify-center p-2"
                        )
                      }
                    >
                      <item.icon className={cn("h-5 w-5", collapsed ? "h-6 w-6" : "")} />
                      {!collapsed && <span className="font-medium">{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Chat History */}
        {!collapsed && (
          <SidebarGroup>
            <SidebarGroupLabel className="text-sidebar-foreground/70 flex items-center gap-2 mb-3">
              <History className="h-4 w-4" />
              Chat History
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <div className="space-y-1 max-h-64 overflow-y-auto chat-scroll">
                {chatHistory.map((chat) => (
                  <div
                    key={chat.id}
                    className="group p-3 rounded-lg hover:bg-sidebar-accent sidebar-transition cursor-pointer"
                  >
                    <h4 className="text-sm font-medium text-sidebar-foreground line-clamp-2 mb-1">
                      {chat.title}
                    </h4>
                    <p className="text-xs text-sidebar-foreground/60">
                      {chat.timestamp}
                    </p>
                  </div>
                ))}
              </div>
            </SidebarGroupContent>
          </SidebarGroup>
        )}
      </SidebarContent>
    </Sidebar>
  );
}