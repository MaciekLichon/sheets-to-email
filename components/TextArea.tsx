import { useRef } from "react";
import Chip from "./Chip";

interface TextAreaProps {
  headers: string[];
  text: string;
  handleTextChange: (newText: string) => void;
}

const TextArea = ({ headers, text, handleTextChange }: TextAreaProps) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleChipClick = (header: string) => {
    const placeholder = `{{${header}}}`;
    const startPos = textareaRef.current?.selectionStart;
    const endPos = textareaRef.current?.selectionEnd;

    if (textareaRef.current && startPos != null && endPos != null) {
      const textBefore = text.substring(0, startPos);
      const textAfter = text.substring(endPos, text.length);
      const newText = textBefore + placeholder + textAfter;
      handleTextChange(newText);
    }
  };

  return (
    <div id="textarea" className="box-wrapper grid grid-rows-[auto_1fr]">
      <div className="chip-container-mask p-5 pb-2 overflow-auto">
        <div className="flex items-center gap-2 flex-nowrap min-h-7">
          {headers.map((header, index) => (
            <Chip
              key={header + index}
              text={header}
              handleClick={() => handleChipClick(header)}
            />
          ))}
        </div>
      </div>
      <textarea
        className="size-full resize-none outline-none px-5 pb-5"
        placeholder="Type your email template here..."
        ref={textareaRef}
        value={text}
        onChange={(e) => handleTextChange(e.target.value)}
      />
    </div>
  );
};

export default TextArea;
