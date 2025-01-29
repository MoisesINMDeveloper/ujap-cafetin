interface InputLoginProps {
  type: string;
  name: string;
  placeholder: string;
  value: string | number ;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const InputLogin = ({ type, name, placeholder, value, onChange }: InputLoginProps) => {
  return (
    <input
      className="w-[240px] h-[50px] rounded-md border-[1px] outline-none border-primary text-white placeholder:text-gray-400 px-2 bg-transparent"
      type={type}
      name={name}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
    />
  );
};