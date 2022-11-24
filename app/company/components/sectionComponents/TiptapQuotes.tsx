import { useHeaderStore } from "@app/store/builderStore";
import { Button, Input } from "@mantine/core";
import { useEditor, EditorContent, Editor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import styles from "@styles/tiptap.module.scss";
import { Color } from "@tiptap/extension-color";
import TextStyle from "@tiptap/extension-text-style";
import Image from "@tiptap/extension-image";
import Youtube from "@tiptap/extension-youtube";
import Gapcursor from "@tiptap/extension-gapcursor";
import Table from "@tiptap/extension-table";
import TableCell from "@tiptap/extension-table-cell";
import TableHeader from "@tiptap/extension-table-header";
import TableRow from "@tiptap/extension-table-row";
import Head from "next/head";
import { useEffect, useRef } from "react";

const MenuBar = ({
  editor,
  setTitleChange,
}: {
  editor: Editor | null;
  setTitleChange: (st: boolean) => void;
}) => {
  if (!editor) {
    return null;
  }

  const addImage = () => {
    const url = window.prompt("URL");

    if (url) {
      editor.chain().focus().setImage({ src: url }).run();
    }
  };

  const addYoutubeVideo = () => {
    const url = prompt("Enter YouTube URL");
    editor.commands.setYoutubeVideo({
      src: url || "https://www.youtube.com/watch?v=BD8m4H_0Nls",
    });
  };

  return (
    <>
      <Input
        style={{ display: "inline-block", width: 50 }}
        styles={{ input: { height: 10, padding: 4 } }}
        size="xs"
        type="color"
        onInput={(event: { target: any }) =>
          editor
            .chain()
            .focus()
            .setColor((event.target as HTMLInputElement).value)
            .run()
        }
        value=""
      />
      <Button
        compact
        variant="outline"
        color={editor.isActive("bold") ? "cyan" : "dark"}
        radius="md"
        size="xs"
        onClick={() => editor.chain().focus().toggleBold().run()}
        disabled={!editor.can().chain().focus().toggleBold().run()}
        className={editor.isActive("bold") ? "is-active" : ""}
        m={2}
      >
        bold
      </Button>
      <Button
        compact
        variant="outline"
        color={editor.isActive("italic") ? "cyan" : "dark"}
        radius="md"
        size="xs"
        onClick={() => editor.chain().focus().toggleItalic().run()}
        disabled={!editor.can().chain().focus().toggleItalic().run()}
        className={editor.isActive("italic") ? "is-active" : ""}
        m={2}
      >
        italic
      </Button>
      <Button
        compact
        variant="outline"
        color={editor.isActive("heading", { level: 1 }) ? "cyan" : "dark"}
        radius="md"
        size="xs"
        onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
        className={editor.isActive("heading", { level: 1 }) ? "is-active" : ""}
        m={2}
      >
        h1
      </Button>
      <Button
        compact
        variant="outline"
        color={editor.isActive("heading", { level: 2 }) ? "cyan" : "dark"}
        radius="md"
        size="xs"
        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
        className={editor.isActive("heading", { level: 2 }) ? "is-active" : ""}
        m={2}
      >
        h2
      </Button>
      <Button
        compact
        variant="outline"
        color={editor.isActive("heading", { level: 3 }) ? "cyan" : "dark"}
        radius="md"
        size="xs"
        onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
        className={editor.isActive("heading", { level: 3 }) ? "is-active" : ""}
        m={2}
      >
        h3
      </Button>
      <Button
        compact
        variant="outline"
        color={editor.isActive("heading", { level: 4 }) ? "cyan" : "dark"}
        radius="md"
        size="xs"
        onClick={() => editor.chain().focus().toggleHeading({ level: 4 }).run()}
        className={editor.isActive("heading", { level: 4 }) ? "is-active" : ""}
        m={2}
      >
        h4
      </Button>
      <Button
        compact
        variant="outline"
        color="dark"
        radius="md"
        size="xs"
        onClick={() => editor.chain().focus().undo().run()}
        disabled={!editor.can().chain().focus().undo().run()}
        m={2}
      >
        undo
      </Button>
      <Button
        compact
        variant="outline"
        color="dark"
        radius="md"
        size="xs"
        onClick={() => editor.chain().focus().redo().run()}
        disabled={!editor.can().chain().focus().redo().run()}
        m={2}
      >
        redo
      </Button>
      <Button
        compact
        variant="filled"
        color="teal"
        radius="md"
        size="xs"
        onClick={() => setTitleChange(false)}
        m={2}
      >
        SAVE
      </Button>
    </>
  );
};

type ITiptapQuoteProps = {
  descValue: string;
  setDesc: (st: string) => void;
  setDescChange: (st: boolean) => void;
};

const TiptapQuotes: React.FC<ITiptapQuoteProps> = ({
  descValue,
  setDesc,
  setDescChange,
}) => {
  const editor = useEditor({
    extensions: [
      StarterKit,
      TextStyle,
      Color,
      Image,
      Youtube,
      Gapcursor,
      Table.configure({
        resizable: true,
      }),
      TableRow,
      TableHeader,
      TableCell,
    ],
    content: `${descValue} <br>`,
    onUpdate: ({ editor }) => {
      const html = editor.getHTML();
      console.log(html);
      setDesc(html);
    },
  });

  const change = useHeaderStore((state) => state.value);

  return (
    <div
      style={{
        borderColor: "#d5dddb",
        borderStyle: "solid",
        borderRadius: 10,
        margin: 5,
        padding: 7,
        borderWidth: 1,
      }}
    >
      <MenuBar editor={editor} setTitleChange={setDescChange} />
      <div>
        <EditorContent editor={editor} className={styles.ProseMirror} />
      </div>
    </div>
  );
};

export default TiptapQuotes;
