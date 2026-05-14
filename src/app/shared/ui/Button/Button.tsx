type PropsType = {
  className?: string;
  disabled?: boolean;
  title: string;
  onClick: () => void;
};

export const Button = ({ className, disabled, title, onClick }: PropsType) => {
  return (
    <button className={className} onClick={onClick}>
      {title}
    </button>
  );
};
