interface SideBarProps {
    setActiveView: (view: string) => void;
  }
  
  const SideBar = ({ setActiveView }: SideBarProps) => {
    const itemsBar = [
      { id: 1, name: "PRODUCTOS" },
      { id: 2, name: "PEDIDOS" },
      { id: 3, name: "PAGOMOVIL" },
      { id: 4, name: "DELIVERY" },
      { id: 5, name: "CATEGORIAS" }
    ];
  
    return (
      <div className="fixed left-0 top-10 h-screen w-48 bg-black border-r-2 border-primary z-50 transition-transform duration-300">
        <ul className="text-lg w-full px-6 mt-12 flex flex-col items-start gap-6">
          {itemsBar.map(item => (
            <li key={item.id} className="w-full">
              <button
                className="text-white hover:text-tertiary hover:underline w-full text-left"
                onClick={() => setActiveView(item.name)} // Llama a setActiveView al hacer clic
              >
                {item.name}
              </button>
            </li>
          ))}
        </ul>
      </div>
    );
  };
  
  export default SideBar;
  