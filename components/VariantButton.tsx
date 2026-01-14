interface VariantButtonProps {
  variant: number;
  handleClick: () => void;
}

const VariantButton = ({ variant, handleClick }: VariantButtonProps) => {
  return (
    <button
      onClick={handleClick}
      style={{ transform: `rotate(${(variant - 1) * 90}deg)` }}
      className="button-primary size-10 w-fit"
    >
      <div className="grid gap-0.5 grid-cols-2 grid-rows-2 h-full">
        <span className="row-span-2 rounded-xs bg-black"></span>
        <span className="rounded-xs bg-black aspect-square"></span>
        <span className="rounded-xs bg-black aspect-square"></span>
      </div>
    </button>
  );
};

export default VariantButton;
