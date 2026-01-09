interface VariantButtonProps {
  variant: number;
  handleClick: () => void;
}

const VariantButton = ({ variant, handleClick }: VariantButtonProps) => {
  return (
    <button
      onClick={handleClick}
      style={{ transform: `rotate(${(variant - 1) * 90}deg)` }}
      className="grid gap-1 grid-cols-2 grid-rows-2 size-10"
    >
      <span className="row-span-2 bg-black"></span>
      <span className="bg-black"></span>
      <span className="bg-black"></span>
    </button>
  );
};

export default VariantButton;
