"use client";


import { 
  BoldIcon, 
  ItalicIcon, 
  ListTodoIcon, 
  LucideIcon, 
  MessageSquarePlusIcon, 
  PrinterIcon, 
  Redo2Icon, 
  RemoveFormattingIcon, 
  SpellCheckIcon, 
  UnderlineIcon, 
  Undo2Icon 
} from "lucide-react";

import { cn } from "@/lib/utils";
import { useEditorStore } from "@/store/user-editor-store";
import { Separator } from "@/components/ui/separator";

interface ToolbarButtonProps {
  onClick?: () => void;
  isActive?: boolean;
  icon: LucideIcon;
};

const ToolbarButton = ({
  onClick,
  isActive,
  icon: Icon,
}: ToolbarButtonProps) => {
  return (
    <button
      onClick={onClick}
      className={cn(
        "text-sm h-7 min-w-7 flex items-center justify-center  rounded-sm hover:bg-neutral-200/80",
        isActive && "bg-neutral-200/80"
      )}
    >
      <Icon />
    </button>
  );
}

export const Toolbar = () =>  {
  const { editor } = useEditorStore();


  const sections: {
    label: string;
    icon: LucideIcon;
    onClick: () => void;
    isActive?: boolean;
  }[][] = [
    [
      {
        label: "Undo",
        icon: Undo2Icon,
        onClick: () => editor?.chain().focus().undo().run(),
      },
      {
        label: "Redo",
        icon: Redo2Icon,
        onClick: () => editor?.chain().focus().redo().run(),
      },
      {
        label: "Print",
        icon: PrinterIcon,
        onClick: () => window.print,
      },
      {
        label: "Spell Check",
        icon: SpellCheckIcon,
        onClick: () => {
          const current = editor?.view.dom.getAttribute("spellcheck");
          editor?.view.dom.setAttribute("spellcheck", current === "false" ? "true" : "false");
        }
      },
    ],
    [
      {
        label: "Bold",
        icon: BoldIcon,
        isActive: editor?.isActive("bold"),
        onClick: () => editor?.chain().focus().toggleBold().run()
      },
      {
        label: "Italic",
        icon: ItalicIcon,
        isActive: editor?.isActive("italic"),
        onClick: () => editor?.chain().focus().toggleItalic().run(),
      },
      {
        label: "Underline",
        icon: UnderlineIcon,
        isActive: editor?.isActive("underline"),
        onClick: () => editor?.chain().focus().toggleUnderline().run(),
      },
    ],
    [
      {
        label: "Comment",
        icon: MessageSquarePlusIcon,
        isActive: false, //TODO: Enable this functionality
        onClick: () => console.log("TODO: Comment")
      },
      {
        label: "List Todo",
        icon: ListTodoIcon,
        isActive: editor?.isActive("taskList"),
        onClick: () => editor?.chain().focus().toggleTaskList().run(),
      },
      {
        label: "Remove Formatting",
        icon: RemoveFormattingIcon,
        onClick: () => editor?.chain().focus().unsetAllMarks().run(),
      },
    ]
  ];

  return  (
    <div className="bg-[#F1F4F9] px-2.5 py-0.5 rounded-[24px] min-h-[40px] flex items-center gap-x-0.5 overflow-x-auto">
      {sections[0].map((item) => (
        <ToolbarButton key={item.label} {...item} />
      ))}
      <Separator orientation="vertical" className="h-6 bg-neutral-300" />
      {/* TODO: FONT FAMILY */}
      <Separator orientation="vertical" className="h-6 bg-neutral-300" />
      {/* TODO: HEADING */}
      <Separator orientation="vertical" className="h-6 bg-neutral-300" />
      {/* TODO: FONT SIZE */}
      <Separator orientation="vertical" className="h-6 bg-neutral-300" />
      {sections[1].map((item) => (
        <ToolbarButton key={item.label} {...item} />
      ))}
      {/* TODO: TEXT COLOR */}
      {/* TODO: HIGHLIGH COLOR */}
      <Separator orientation="vertical" className="h-6 bg-neutral-300" />
      {/* TODO: LINK */}
      {/* TODO: IMAGE */}
      {/* TODO: ALIGN */}
      {/* TODO: LINE HEIGHT */}
      {/* TODO: LIST */}
      {sections[2].map((item) => (
        <ToolbarButton key={item.label} {...item} />
      ))}
    </div>
  );
};