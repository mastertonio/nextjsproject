import React, { useState, useEffect } from 'react'
import { RichTextEditor, Link } from '@mantine/tiptap';
import { useEditor, Editor } from '@tiptap/react';
import Highlight from '@tiptap/extension-highlight';
import StarterKit from '@tiptap/starter-kit';
import Underline from '@tiptap/extension-underline';
import TextAlign from '@tiptap/extension-text-align';
import TextStyle from '@tiptap/extension-text-style'
import Superscript from '@tiptap/extension-superscript';
import SubScript from '@tiptap/extension-subscript';
import Placeholder from '@tiptap/extension-placeholder';
import YouTube from '@tiptap/extension-youtube';
import Table from '@tiptap/extension-table';
import TableCell from '@tiptap/extension-table-cell';
import TableHeader from '@tiptap/extension-table-header';
import TableRow from '@tiptap/extension-table-row';
import { Color } from '@tiptap/extension-color';
import { IconTable, IconTableOff, IconTableExport, IconTableImport, IconVideo } from '@tabler/icons';


interface CustomRichTextEditorProps {
    content: string;
    onChange: (newContent: string) => void;
    type?: string;
}

const RichTextSection: React.FC<CustomRichTextEditorProps> = ({ content, onChange, type }) => {
    const editor: Editor | null = useEditor({
        extensions: [
            StarterKit,
            Underline,
            Link.configure({
                openOnClick: true,
                autolink: true,
                HTMLAttributes: {
                    class: '!decoration-solid !text-blue-700 write-up-link'
                }
            }),
            Superscript,
            SubScript,
            Highlight,
            TextStyle,
            Color,
            YouTube.configure({
                controls: false,
            }),
            TextAlign.configure({ types: ['heading', 'paragraph'] }),
            Placeholder.configure({ placeholder: 'Type here' }),
            Table.configure({
                resizable: true,
            }),
            TableRow,
            TableHeader,
            TableCell,
        ],
        content,
        onUpdate({ editor }) {
            const newContent = editor.getHTML();
            onChange(newContent);
        },

    });

    const addTable = () => {
        editor?.chain().focus().insertTable({ rows: 3, cols: 3, withHeaderRow: true }).run()
    }

    const addVideo = () => {
        const url = prompt('Enter YouTube URL')

        if (url) {
            editor?.commands.setYoutubeVideo({
                src: url,
                width: 600,
                height: 350,
            })
        }
    }

    useEffect(() => {
        const html = editor?.getHTML()
        console.log('Editor', content)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])


    return (
        <RichTextEditor editor={editor}>
            <RichTextEditor.Toolbar
            // sticky stickyOffset={60}
            >
                <RichTextEditor.ControlsGroup>
                    <RichTextEditor.Bold />
                    <RichTextEditor.Italic />
                    <RichTextEditor.Underline />
                    <RichTextEditor.Strikethrough />
                    <RichTextEditor.ColorPicker
                        colors={[
                            '#25262b',
                            '#868e96',
                            '#fa5252',
                            '#e64980',
                            '#be4bdb',
                            '#7950f2',
                            '#4c6ef5',
                            '#228be6',
                            '#15aabf',
                            '#12b886',
                            '#40c057',
                            '#82c91e',
                            '#fab005',
                            '#fd7e14',
                        ]}
                    />
                    <RichTextEditor.ClearFormatting />
                    <RichTextEditor.Highlight />
                    <RichTextEditor.Subscript />
                    <RichTextEditor.Superscript />
                </RichTextEditor.ControlsGroup>

                <RichTextEditor.ControlsGroup>
                    <RichTextEditor.H1 />
                    <RichTextEditor.H2 />
                    <RichTextEditor.H3 />
                    <RichTextEditor.H4 />
                </RichTextEditor.ControlsGroup>

                {type == 'Textarea' ? (
                    <RichTextEditor.ControlsGroup>
                        <RichTextEditor.Blockquote />
                        <RichTextEditor.Hr />
                        <RichTextEditor.BulletList />
                        <RichTextEditor.OrderedList />
                    </RichTextEditor.ControlsGroup>
                ) : null}


                <RichTextEditor.ControlsGroup>
                    <RichTextEditor.Link />
                    <RichTextEditor.Unlink />
                    {type == 'Textarea' ? (
                        <RichTextEditor.Control
                            onClick={() => addVideo()}
                        >
                            <IconVideo size={18} stroke={1} />
                        </RichTextEditor.Control>
                    ) : null}
                </RichTextEditor.ControlsGroup>

                <RichTextEditor.ControlsGroup>
                    <RichTextEditor.AlignLeft />
                    <RichTextEditor.AlignCenter />
                    <RichTextEditor.AlignJustify />
                    <RichTextEditor.AlignRight />
                </RichTextEditor.ControlsGroup>

                {/* <RichTextEditor.ControlsGroup>
                    <RichTextEditor.Control
                        onClick={() => addTable()}
                    >
                        <IconTable size={18} stroke={1} />
                    </RichTextEditor.Control>
                    <RichTextEditor.Control
                        onClick={() => editor?.chain().focus().deleteTable().run()}
                    >
                        <IconTableOff size={18} stroke={1} />
                    </RichTextEditor.Control>
                    <RichTextEditor.Control
                        onClick={() => editor?.chain().focus().addColumnAfter().run()}
                    >
                        <IconTableExport size={18} stroke={1} />
                    </RichTextEditor.Control>
                    <RichTextEditor.Control
                        onClick={() => editor?.chain().focus().addColumnBefore().run()}
                    >
                        <IconTableImport size={18} stroke={1} />
                    </RichTextEditor.Control>
                </RichTextEditor.ControlsGroup> */}


            </RichTextEditor.Toolbar>
            <RichTextEditor.Content />
        </RichTextEditor>
    )
}

export default RichTextSection