interface TextPreviewProps {
  text: string;
  selectedRow: Record<string, string> | null;
}

const TextPreview = ({ text, selectedRow }: TextPreviewProps) => {
  const transformText = (
    text: string,
    selectedRow: Record<string, string> | null
  ) =>
    text.replace(/{{(.*?)}}/g, (_: string, key: string) => {
      const value = selectedRow?.[key.trim()];
      return value != null ? String(value) : `{{${key}}}`;
    });

  return (
    <div className="grid grid-rows-[auto_1fr] gap-1">
      <h2>Preview</h2>
      <div className="whitespace-pre-wrap border bg-white rounded-lg p-2 overflow-auto">
        {transformText(text, selectedRow)}
      </div>
    </div>
  );
};

export default TextPreview;
