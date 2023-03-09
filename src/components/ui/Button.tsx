import { ReactNode } from 'react';

type ButtonProps = {
  text: string;
  disabled?: boolean;
  onClick?: () => void;
};
const Button = ({ disabled, text, onClick }: ButtonProps) => {
  return (
    <button
      disabled={disabled}
      onClick={onClick}
      className="w-full bg-brand text-white py-2 px-4 rounded-sm
       enabled:hover:brightness-110 disabled:bg-gray-300"
    >
      {text}
    </button>
  );
};

export default Button;
