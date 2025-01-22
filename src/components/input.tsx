export const InputLogin = ({ type, text, value, onChange }: { type: string, text: string, value: string, onChange: (e: React.ChangeEvent<HTMLInputElement>) => void }) => {
    return ( 
        <> 
          <input 
              className="w-[240px] h-[50px] rounded-md border-[1px] outline-none border-primary text-white placeholder:text-gray-400 px-2 bg-transparent" 
              type={type} 
              placeholder={text} 
              value={value} 
              onChange={onChange} 
          />            
        </>
    );
}