"use client";

import React from "react";
import TeacherLayout from "./Layout";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Smile,
  Paperclip,
  Send,
  MoreVertical,
  Search,
  PhoneIcon,
  Video,
} from "lucide-react";

const Chat = () => {
  return (
    <TeacherLayout>
      <div className="flex h-[calc(100vh-75px)] bg-white border overflow-hidden ">
        <aside className="w-80 overflow-auto border-r hidden md:flex flex-col shrink-0">
          <div className="p-4 border-b">
            <h2 className="text-xl font-bold mb-3 text-black">Messages</h2>
            <div className="relative">
              <Search className="absolute left-3 top-2.5 size-4 text-muted-foreground" />
              <Input
                placeholder="Search chats..."
                className="pl-9 bg-white rounded-full h-9 text-black focus-visible:ring-0 shadow-none border-gray-200"
              />
            </div>
          </div>

          <ScrollArea className="flex-1">
            {[1, 2, 3, 4, 5, 6, 7].map((i) => (
              <div
                key={i}
                className="flex items-center gap-3 p-4 hover:bg-[#0AB99D]/10 cursor-pointer border-b transition-colors"
              >
                <Avatar>
                  <AvatarImage src={`https://i.pravatar.cc/150?u=${i}`} />
                  <AvatarFallback>U{i}</AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-center">
                    <p className="font-semibold text-sm text-black truncate">
                      User {i}
                    </p>
                    <span className="text-[10px] text-gray-400">12:45 PM</span>
                  </div>
                  <p className="text-xs text-muted-foreground truncate">
                    Bhai ab scroll check kar...
                  </p>
                </div>
              </div>
            ))}
          </ScrollArea>
        </aside>

        <section className="flex-1 flex flex-col bg-[#efeae2] overflow-hidden">
          <header className="h-16 bg-white border-b flex items-center justify-between px-4 shrink-0 z-20 shadow-sm">
            <div className="flex items-center gap-3">
              <Avatar className="size-10 border">
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <div>
                <p className="font-bold text-sm text-black">Shadcn UI</p>
                <p className="text-[10px] text-green-500 font-medium">Online</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <PhoneIcon size={20} className="cursor-pointer"/>
              <Video size={20} className="cursor-pointer"/>
              <MoreVertical size={20} className="cursor-pointer"/>
            </div>
          </header>

          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-[url('https://user-images.githubusercontent.com/15075759/28719144-86dc0f70-73b1-11e7-911d-60d70fcded21.png')] bg-repeat">
            <div className="max-w-4xl mx-auto flex flex-col gap-4">
              {[1, 2, 3, 4, 5, 6, 7].map((m) => (
                <React.Fragment key={m}>
                  <div className="flex justify-start">
                    <div className="bg-white text-black rounded-lg px-3 py-2 shadow-sm max-w-[75%] text-sm border">
                      Bhai ye wala message list scroll ho raha hai?
                      <p className="text-[9px] text-gray-400 text-right mt-1">
                        11:00 AM
                      </p>
                    </div>
                  </div>
                  <div className="flex justify-end">
                    <div className="bg-[#dcf8c6] text-black rounded-lg px-3 py-2 shadow-sm max-w-[75%] text-sm">
                      Haan bhai, ab header aur input fixed hain! 🔥
                      <p className="text-[9px] text-gray-400 text-right mt-1">
                        11:02 AM
                      </p>
                    </div>
                  </div>
                </React.Fragment>
              ))}
            </div>
          </div>

          <div className="p-3 bg-[#f0f2f5] border-t shrink-0 z-20">
            <div className="flex items-center gap-2 max-w-5xl mx-auto">
              <Button
                variant="ghost"
                size="icon"
                className="text-gray-500 hover:bg-gray-200 rounded-full"
              >
                <Smile className="size-6" />
              </Button>

              <Button
                variant="ghost"
                size="icon"
                className="text-gray-500 hover:bg-gray-200 rounded-full"
              >
                <Paperclip className="size-6 -rotate-45" />
              </Button>

              <div className="flex-1">
                <Input
                  placeholder="Type a message..."
                  className="w-full bg-white border-none rounded-full h-11 px-4 text-black focus-visible:ring-1 focus-visible:ring-teal-500 shadow-sm"
                />
              </div>

              <Button className="rounded-full size-11 p-0 bg-[#0AB99D] hover:bg-[#089b83] shrink-0 shadow-md border-none">
                <Send className="size-5 text-white" />
              </Button>
            </div>
          </div>
        </section>
      </div>
    </TeacherLayout>
  );
};

export default Chat;
