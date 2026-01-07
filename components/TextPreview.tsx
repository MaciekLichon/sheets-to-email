import { SheetRow } from "@/types/sheets";

interface TextPreviewProps {
  text: string;
  selectedRow: SheetRow | null;
}

const TextPreview = ({ text, selectedRow }: TextPreviewProps) => {
  const transformText = (text: string, selectedRow: SheetRow | null) =>
    text.replace(/{{(.*?)}}/g, (_: string, key: string) => {
      const value = selectedRow?.[key.trim()];
      return value != null ? String(value) : `{{${key}}}`;
    });

  return (
    <div className="box-wrapper p-5 grid grid-rows-[auto_1fr] gap-1">
      <h2>Preview</h2>
      <div className="whitespace-pre-wrap overflow-auto">
        {transformText(text, selectedRow)}
      </div>
    </div>
  );
};

export default TextPreview;
