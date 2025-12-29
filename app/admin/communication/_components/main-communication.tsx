"use client";

import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import QnaTabCommunication from "./Qna-tab";
import DirectMessager from "./Direct-messages";
import AttentionTabs from "./Attention-Tabs";

const MainCommunication = () => {
  return (
    <Tabs defaultValue="qa" className="w-full">
      {/* Tabs Header */}
      <TabsList className="border-b border-slate-200">
        <TabsTrigger value="qa">Tanya Jawab (Q&A)</TabsTrigger>
        <TabsTrigger value="pesan">Pesan Langsung</TabsTrigger>
        <TabsTrigger value="pengumuman">Pengumuman</TabsTrigger>
      </TabsList>

      {/* Q&A Tab */}
      <TabsContent value="qa" className="p-0">
        <QnaTabCommunication />
      </TabsContent>

      {/* Pesan Langsung Tab */}
      <TabsContent value="pesan" className="p-0">
        <DirectMessager />
      </TabsContent>

      {/* Pengumuman Tab */}
      <TabsContent value="pengumuman" className="p-0">
        <AttentionTabs />
      </TabsContent>
    </Tabs>
  );
};

export default MainCommunication;
