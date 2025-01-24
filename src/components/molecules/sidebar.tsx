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
    ]
    return (
        <div className="left-0 top-10 bg-black absolute">
            <ul className="text-lg border-r-2 border-primary h-[calc(100vh-226px)] w-[150px] px-[25px]  flex flex-col items-center justify-around">
                {itemsBar.map(item =>
                    <li className="text-white hover:text-tertiary hover:underline" key={item.id}><button className="hover:underline"
                    onClick={() => setActiveView(item.name)}>
                        {item.name}
                    </button>
                    </li>
                )}
            </ul>
        </div>
    );
}

export default SideBar;