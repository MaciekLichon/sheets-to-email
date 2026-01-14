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

  const copyToClipboard = () => {
    const transformedText = transformText(text, selectedRow);
    navigator.clipboard.writeText(transformedText);
    alert("Copied to clipboard!");
  };

  return (
    <div
      id="preview"
      className="box-wrapper p-5 grid grid-rows-[auto_1fr] gap-1 overflow-auto"
    >
      <div className="flex justify-between">
        <h2>Preview</h2>
        <button className="chip-shadow rounded-full" onClick={copyToClipboard}>
          <svg
            className="size-8"
            viewBox="-2.4 -2.4 28.8 28.8"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g strokeWidth="0" />
            <g
              strokeLinecap="round"
              strokeLinejoin="round"
              stroke="#ccc"
              strokeWidth=".192"
            />
            <path
              d="M10 8V7c0-.943 0-1.414.293-1.707S11.057 5 12 5h5c.943 0 1.414 0 1.707.293S19 6.057 19 7v5c0 .943 0 1.414-.293 1.707S17.943 14 17 14h-1m-9 5h5c.943 0 1.414 0 1.707-.293S14 17.943 14 17v-5c0-.943 0-1.414-.293-1.707S12.943 10 12 10H7c-.943 0-1.414 0-1.707.293S5 11.057 5 12v5c0 .943 0 1.414.293 1.707S6.057 19 7 19"
              stroke="#000"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>
      <div className="whitespace-pre-wrap overflow-auto">
        {transformText(text, selectedRow)}
      </div>
    </div>
  );
};

export default TextPreview;
