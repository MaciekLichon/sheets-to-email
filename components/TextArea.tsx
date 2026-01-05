import { useRef } from "react";

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
    <div className="grid grid-rows-[30px_1fr] gap-2">
      <div className="flex items-center gap-2">
        {headers.map((header) => (
          <button
            className="border rounded-full px-2 py-1 text-sm bg-white"
            key={header}
            onClick={() => handleChipClick(header)}
          >
            {header}
          </button>
        ))}
      </div>
      <textarea
        className="border size-full resize-none bg-white rounded-lg p-2"
        placeholder="Type your email template here..."
        ref={textareaRef}
        value={text}
        onChange={(e) => handleTextChange(e.target.value)}
      />
    </div>
  );
};

export default TextArea;
