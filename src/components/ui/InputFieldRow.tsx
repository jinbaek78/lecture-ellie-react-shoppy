import { ReactNode } from 'react';

type InputFieldRowProps = {
  type: 'text' | 'file' | 'number';
  placeholder?: string;
  name?: string;
};
const InputFieldRow = ({
  type,
  placeholder = '',
  name = '',
}: InputFieldRowProps) => {
  return (
    <div className="w-full h-14 flex items-center p-2 my-1 border border-zinc-300 text-lg">
      <input
        type={type}
        placeholder={placeholder}
        name={name ? name : placeholder}
        className="w-full outline-none"
      />
    </div>
  );
};

export default InputFieldRow;
