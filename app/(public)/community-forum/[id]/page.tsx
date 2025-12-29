import { notFound } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { formatDistanceToNow } from "date-fns";
import { id as localeId } from "date-fns/locale";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MessageSquareReply } from "lucide-react";

import { getDiscussionById } from "../actions/actions";
import ReplyDiscussionDialog from "./_components/ReplyDiscussionDialog";
import ReplyToReplyDialog from "./_components/ReplyToReplyDialog";
import { DiscussionWithReplies } from "@/app/data/discussion/get-discussions";

interface DiscussionPageProps {
  params: Promise<{ id: string }>;
}

export default async function DiscussionPage({ params }: DiscussionPageProps) {
  const { id } = await params;
  const discussion = (await getDiscussionById(id)) as DiscussionWithReplies | null;

  if (!discussion) return notFound();

  const createdAgo = formatDistanceToNow(new Date(discussion.createdAt), {
    addSuffix: true,
    locale: localeId,
  });

  return (
    <section className="container mx-auto px-6 py-12 max-w-4xl">
      {/* === HEADER DISKUSI === */}
      <Card className="shadow-lg rounded-2xl border border-gray-200">
        <CardHeader>
          <div className="flex items-center gap-4">
            <Avatar>
              <AvatarImage
                src={discussion.user.image || ""}
                alt={discussion.user.name}
              />
              <AvatarFallback>
                {discussion.user.name[0].toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div>
              <CardTitle className="text-2xl font-bold text-gray-900">
                {discussion.title}
              </CardTitle>
              <p className="text-sm text-gray-500">
                Oleh{" "}
                <span className="font-semibold">{discussion.user.name}</span> •{" "}
                {createdAgo}
              </p>
            </div>
          </div>
          <div className="mt-4">
            <Badge className="bg-blue-100 text-blue-800 font-semibold">
              {discussion.category}
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-gray-700 leading-relaxed whitespace-pre-line">
            {discussion.content}
          </p>
        </CardContent>
      </Card>

      <Separator className="my-8" />

      {/* === FORM BALASAN DISKUSI === */}
      <div>
        <h3 className="text-lg font-semibold mb-2">💬 Balas Diskusi</h3>
        <ReplyDiscussionDialog discussionId={discussion.id} />
      </div>

      <Separator className="my-8" />

      {/* === DAFTAR BALASAN === */}
      <div>
        <h3 className="text-xl font-bold mb-4">💭 Semua Balasan</h3>

        {discussion.replies.length === 0 ? (
          <p className="text-gray-500">Belum ada balasan untuk diskusi ini.</p>
        ) : (
          <div className="space-y-4">
            {discussion.replies.map((reply: DiscussionWithReplies["replies"][number]) => (
              <div key={reply.id} className="ml-0">
                {/* === BALASAN UTAMA === */}
                <Card className="shadow-sm rounded-xl border border-gray-100">
                  <CardContent className="p-4 flex gap-4">
                    <Avatar>
                      <AvatarImage
                        src={reply.user.image || ""}
                        alt={reply.user.name}
                      />
                      <AvatarFallback>
                        {reply.user.name[0].toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <p className="font-semibold text-gray-800">
                        {reply.user.name}
                      </p>
                      <p className="text-gray-600 mt-1">{reply.content}</p>

                      <div className="flex items-center justify-between mt-2">
                        <p className="text-xs text-gray-400">
                          {formatDistanceToNow(new Date(reply.createdAt), {
                            addSuffix: true,
                            locale: localeId,
                          })}
                        </p>

                        <ReplyToReplyDialog
                          discussionId={discussion.id}
                          parentId={reply.id}
                          quotedUser={reply.user.name}
                          quotedContent={reply.content}>
                          <Button
                            size="sm"
                            variant="ghost"
                            className="text-gray-500 hover:text-blue-600 flex items-center gap-1">
                            <MessageSquareReply className="w-4 h-4" />
                            Reply
                          </Button>
                        </ReplyToReplyDialog>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* === SUB-REPLIES === */}
                {reply.children && reply.children.length > 0 && (
                  <div className="ml-10 mt-3 space-y-3 border-l-2 border-gray-200 pl-4">
                    {reply.children.map((child) => (
                      <Card
                        key={child.id}
                        className="bg-gray-50 border border-gray-100 rounded-xl">
                        <CardContent className="p-3 flex gap-3">
                          <Avatar className="w-8 h-8">
                            <AvatarImage
                              src={child.user.image || ""}
                              alt={child.user.name}
                            />
                            <AvatarFallback>
                              {child.user.name[0].toUpperCase()}
                            </AvatarFallback>
                          </Avatar>
                          <div className="flex-1">
                            <div className="bg-white border border-gray-200 rounded-md p-2 mb-2 text-sm text-gray-500 italic">
                              Replying to <b>{reply.user.name}</b>: “
                              {reply.content.length > 80
                                ? reply.content.slice(0, 80) + "..."
                                : reply.content}
                              ”
                            </div>
                            <p className="font-semibold text-gray-800 text-sm">
                              {child.user.name}
                            </p>
                            <p className="text-gray-600 text-sm mt-1">
                              {child.content}
                            </p>
                            <p className="text-xs text-gray-400 mt-1">
                              {formatDistanceToNow(new Date(child.createdAt), {
                                addSuffix: true,
                                locale: localeId,
                              })}
                            </p>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
