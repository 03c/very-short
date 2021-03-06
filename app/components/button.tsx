import { FC } from 'react';

interface ButtonProps {
  type: 'button' | 'submit' | 'reset' | undefined;
  onClick?: Function;
}

const Button: FC<ButtonProps> = ({ onClick, type, children }) => {
  return (
    <button
      type={type}
      className="p-4 pl-6 pr-6 bg-green"
      onClick={() => {
        onClick && onClick();
      }}
    >
      {children}
    </button>
  );
};

export default Button;
