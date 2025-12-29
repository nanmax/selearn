/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { Menubar } from "./Menubar";
import TextAlign from "@tiptap/extension-text-align";

export function RichTextEditor({ field }: { field: any }) {
  const editor = useEditor({
    extensions: [
      StarterKit,
      TextAlign.configure({ types: ["heading", "paragraph"] }),
    ],
    editorProps: {
      attributes: {
        class:
          "min-h-[300px] p-4 focus:outline-none prose prose-sm sm:prose lg:prose xl:prose-xl dark:prose-invert !w-full !max-w-none",
      },
    },
    immediatelyRender: false,

    onUpdate: ({ editor }) => {
      field.onChange(JSON.stringify(editor.getJSON()));
    },

    content: (() => {
      if (!field.value) return "<p>Type your description on here!</p>";
      try {
        return JSON.parse(field.value);
      } catch {
        return field.value;
      }
    })(),
  });

  return (
    <div className="w-full border border-input rounded-lg overflow-hidden dark:bg-input/30">
      <Menubar editor={editor} />
      <EditorContent editor={editor} />
    </div>
  );
}
