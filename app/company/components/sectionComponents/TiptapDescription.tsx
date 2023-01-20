import { useHeaderStore } from "@app/store/builderStore";
import { Button, FileButton, Input } from "@mantine/core";
import { useEditor, EditorContent, Editor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import styles from "@styles/tiptap.module.scss";
import Head from "next/head";
import { useEffect, useRef, useState } from "react";
import { IconBold, IconItalic, IconStrikethrough, IconCode} from '@tabler/icons'

const MenuBar = ({
  editor,
  setTitleChange,
}: {
  editor: Editor | null;
  setTitleChange: (st: boolean) => void;
}) => {
  const [image, setImage] = useState<File>();
  const [preview, setPreview] = useState<string>();

  // useEffect(() => {
  //   if (image) {
  //     const reader = new FileReader();
  //     reader.onload = () => {
  //       setPreview(reader.result as string);
  //     };
  //     reader.readAsDataURL(image);
  //   } else {
  //     setPreview("");
  //   }
  // }, [image]);

  if (!editor) {
    return null;
  }

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
            .run()
        }
        value={editor.getAttributes('textStyle').color ? editor.getAttributes('textStyle').color : ''}
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
        compact
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
        compact
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
        compact
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
        compact
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
        compact
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
        compact
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
        compact
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
        compact
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
        compact
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
        compact
        variant="outline"
        color="dark"
        radius="md"
        size="xs"
      >
        add image from URL
      </Button>
      <Button
        compact
        variant="outline"
        color="dark"
        radius="md"
        size="xs"
      >
        add image from URL
      </Button>
      <Button
        compact
        variant="outline"
        color="dark"
        radius="md"
        size="xs"
        id="add"
        m={2}
      >
        Add youtube video
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

type ITiptapDescriptionProps = {
  descValue: string;
  setDesc: (st: string) => void;
  setDescChange: (st: boolean) => void;
};

const TiptapDescription: React.FC<ITiptapDescriptionProps> = ({
  descValue,
  setDesc,
  setDescChange,
}) => {
  const editor = useEditor({
    extensions: [
      StarterKit,
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

export default TiptapDescription;
