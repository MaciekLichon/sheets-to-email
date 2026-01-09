interface VariantButtonProps {
  variant: number;
  handleClick: () => void;
}

const VariantButton = ({ variant, handleClick }: VariantButtonProps) => {
  return (
    <button
      onClick={handleClick}
      style={{ transform: `rotate(${(variant - 1) * 90}deg)` }}
      className="size-10 p-2 border rounded-md"
    >
      <div className="grid gap-0.5 grid-cols-2 grid-rows-2 ">
        <span className="row-span-2 bg-black"></span>
        <span className="bg-black aspect-square"></span>
        <span className="bg-black aspect-square"></span>
      </div>
    </button>
  );
};

export default VariantButton;
