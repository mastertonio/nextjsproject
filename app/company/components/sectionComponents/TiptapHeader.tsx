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
        style={{ display: "inline-block", width: 70 }}
        styles={{ input: { height: 20, padding: 4 } }}
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
        variant="outline"
        color={editor.isActive("strike") ? "cyan" : "dark"}
        radius="md"
        size="xs"
        onClick={() => editor.chain().focus().toggleStrike().run()}
        disabled={!editor.can().chain().focus().toggleStrike().run()}
        className={editor.isActive("strike") ? "is-active" : ""}
        m={2}
      >
        strike
      </Button>
      <Button
        variant="outline"
        color={editor.isActive("code") ? "cyan" : "dark"}
        radius="md"
        size="xs"
        onClick={() => editor.chain().focus().toggleCode().run()}
        disabled={!editor.can().chain().focus().toggleCode().run()}
        className={editor.isActive("code") ? "is-active" : ""}
        m={2}
      >
        code
      </Button>
      <Button
        variant="outline"
        color="dark"
        radius="md"
        size="xs"
        onClick={() => editor.chain().focus().unsetAllMarks().run()}
        m={2}
      >
        clear marks
      </Button>
      <Button
        variant="outline"
        color="dark"
        radius="md"
        size="xs"
        onClick={() => editor.chain().focus().clearNodes().run()}
        m={2}
      >
        clear nodes
      </Button>
      <Button
        variant="outline"
        color={editor.isActive("paragraph") ? "cyan" : "dark"}
        radius="md"
        size="xs"
        onClick={() => editor.chain().focus().setParagraph().run()}
        className={editor.isActive("paragraph") ? "is-active" : ""}
        m={2}
      >
        paragraph
      </Button>
      <Button
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
        variant="outline"
        color={editor.isActive("bulletList") ? "cyan" : "dark"}
        radius="md"
        size="xs"
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        className={editor.isActive("bulletList") ? "is-active" : ""}
        m={2}
      >
        bullet list
      </Button>
      <Button
        variant="outline"
        color={editor.isActive("orderedList") ? "cyan" : "dark"}
        radius="md"
        size="xs"
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        className={editor.isActive("orderedList") ? "is-active" : ""}
        m={2}
      >
        ordered list
      </Button>
      <Button
        variant="outline"
        color={editor.isActive("codeBlock") ? "cyan" : "dark"}
        radius="md"
        size="xs"
        onClick={() => editor.chain().focus().toggleCodeBlock().run()}
        className={editor.isActive("codeBlock") ? "is-active" : ""}
        m={2}
      >
        code block
      </Button>
      <Button
        variant="outline"
        color={editor.isActive("blockquote") ? "cyan" : "dark"}
        radius="md"
        size="xs"
        onClick={() => editor.chain().focus().toggleBlockquote().run()}
        className={editor.isActive("blockquote") ? "is-active" : ""}
        m={2}
      >
        blockquote
      </Button>
      <Button
        variant="outline"
        color="dark"
        radius="md"
        size="xs"
        onClick={() => editor.chain().focus().setHorizontalRule().run()}
        m={2}
      >
        divider
      </Button>
      <Button
        variant="outline"
        color="dark"
        radius="md"
        size="xs"
        onClick={() => editor.chain().focus().setHardBreak().run()}
        m={2}
      >
        hard break
      </Button>

      <Button
        variant="outline"
        color="dark"
        radius="md"
        size="xs"
        onClick={addImage}
      >
        add image from URL
      </Button>
      <Button
        variant="outline"
        color="dark"
        radius="md"
        size="xs"
        id="add"
        onClick={addYoutubeVideo}
        m={2}
      >
        Add youtube video
      </Button>
      <Button
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
        variant="outline"
        color="red"
        radius="md"
        size="xs"
        m={2}
        onClick={() =>
          editor
            .chain()
            .focus()
            .insertTable({ rows: 3, cols: 3, withHeaderRow: true })
            .run()
        }
      >
        insertTable
      </Button>
      <Button
        variant="outline"
        color="red"
        radius="md"
        size="xs"
        m={2}
        onClick={() => editor.chain().focus().addColumnBefore().run()}
      >
        addColumnBefore
      </Button>
      <Button
        variant="outline"
        color="red"
        radius="md"
        size="xs"
        m={2}
        onClick={() => editor.chain().focus().addColumnAfter().run()}
      >
        addColumnAfter
      </Button>
      <Button
        variant="outline"
        color="red"
        radius="md"
        size="xs"
        m={2}
        onClick={() => editor.chain().focus().deleteColumn().run()}
      >
        deleteColumn
      </Button>
      <Button
        variant="outline"
        color="red"
        radius="md"
        size="xs"
        m={2}
        onClick={() => editor.chain().focus().addRowBefore().run()}
      >
        addRowBefore
      </Button>
      <Button
        variant="outline"
        color="red"
        radius="md"
        size="xs"
        m={2}
        onClick={() => editor.chain().focus().addRowAfter().run()}
      >
        addRowAfter
      </Button>
      <Button
        variant="outline"
        color="red"
        radius="md"
        size="xs"
        m={2}
        onClick={() => editor.chain().focus().deleteRow().run()}
      >
        deleteRow
      </Button>
      <Button
        variant="outline"
        color="red"
        radius="md"
        size="xs"
        m={2}
        onClick={() => editor.chain().focus().deleteTable().run()}
      >
        deleteTable
      </Button>
      <Button
        variant="outline"
        color="red"
        radius="md"
        size="xs"
        m={2}
        onClick={() => editor.chain().focus().mergeCells().run()}
      >
        mergeCells
      </Button>
      <Button
        variant="outline"
        color="red"
        radius="md"
        size="xs"
        m={2}
        onClick={() => editor.chain().focus().splitCell().run()}
      >
        splitCell
      </Button>
      <Button
        variant="outline"
        color="red"
        radius="md"
        size="xs"
        m={2}
        onClick={() => editor.chain().focus().toggleHeaderColumn().run()}
      >
        toggleHeaderColumn
      </Button>
      <Button
        variant="outline"
        color="red"
        radius="md"
        size="xs"
        m={2}
        onClick={() => editor.chain().focus().toggleHeaderRow().run()}
      >
        toggleHeaderRow
      </Button>
      <Button
        variant="outline"
        color="red"
        radius="md"
        size="xs"
        m={2}
        onClick={() => editor.chain().focus().toggleHeaderCell().run()}
      >
        toggleHeaderCell
      </Button>
      <Button
        variant="outline"
        color="red"
        radius="md"
        size="xs"
        m={2}
        onClick={() => editor.chain().focus().mergeOrSplit().run()}
      >
        mergeOrSplit
      </Button>
      <Button
        variant="outline"
        color="red"
        radius="md"
        size="xs"
        m={2}
        onClick={() =>
          editor.chain().focus().setCellAttribute("colspan", 2).run()
        }
      >
        setCellAttribute
      </Button>
      <Button
        variant="outline"
        color="red"
        radius="md"
        size="xs"
        m={2}
        onClick={() => editor.chain().focus().fixTables().run()}
      >
        fixTables
      </Button>
      <Button
        variant="outline"
        color="red"
        radius="md"
        size="xs"
        m={2}
        onClick={() => editor.chain().focus().goToNextCell().run()}
      >
        goToNextCell
      </Button>
      <Button
        variant="outline"
        color="red"
        radius="md"
        size="xs"
        m={2}
        onClick={() => editor.chain().focus().goToPreviousCell().run()}
      >
        goToPreviousCell
      </Button>
      <Button
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

type ITiptapProps = {
  titleValue: string;
  setTitle: (st: string) => void;
  setTitleChange: (st: boolean) => void;
};

const Tiptap: React.FC<ITiptapProps> = ({
  setTitle,
  titleValue,
  setTitleChange,
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
    content: `${titleValue} <br>`,
    onUpdate: ({ editor }) => {
      const html = editor.getHTML();
      console.log(html);
      setTitle(html);
    },
  });

  const change = useHeaderStore((state) => state.value);

  return (
    <div
      style={{
        borderColor: "black",
        borderStyle: "solid",
        borderRadius: 10,
        margin: 5,
        padding: 7,
        borderWidth: 3,
      }}
    >
      <MenuBar editor={editor} setTitleChange={setTitleChange} />
      <div>
        <EditorContent editor={editor} className={styles.ProseMirror} />
      </div>
    </div>
  );
};

export default Tiptap;
