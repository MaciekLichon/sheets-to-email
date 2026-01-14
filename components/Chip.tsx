interface ChipProps {
  text: string;
  handleClick: () => void;
}

const Chip = ({ text, handleClick }: ChipProps) => {
  return (
    <button
      className="chip-shadow shrink-0 px-2 py-1 text-sm rounded-full"
      onClick={handleClick}
    >
      {text}
    </button>
  );
};

export default Chip;
