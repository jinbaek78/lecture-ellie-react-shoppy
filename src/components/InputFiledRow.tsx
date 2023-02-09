type InputFiledRowProps = {
  placeholder: string;
  name: string;
};
const InputFiledRow = ({ placeholder, name }: InputFiledRowProps) => {
  return (
    <div className="flex p-3 items-center justify-start w-full h-15 border  border-zinc-200 my-2">
      <input
        className="text-xl outline-none w-full"
        type="text"
        placeholder={placeholder}
        name={name}
      />
    </div>
  );
};

export default InputFiledRow;
