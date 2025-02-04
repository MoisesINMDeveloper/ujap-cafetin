import data,{ContactItem} from '../../constant/data'; // Ajusta la ruta según la ubicación real de tu archivo data.ts

const ItemsMenu=() => {
  return (
    <div className='z-20 absolute w-auto top-14 left-2 bg-[#000000c2] border-l-2 border-b-2 border-r-2 rounded-t-none border-primary text-gray-200 shadow-lg rounded-lg p-4 transition-opacity duration-300 ease-in-out'>
      <ul className='justify-between'>
        {data?.contactData.map((item: ContactItem,index: number) => (
          <li
            key={index}
            className='p-2 flex text-tertiary active:text-fourth items-center gap-4'
          >
            <a
              className='text-sm'
              href={item.link}
              target='_blank'
              rel='noopener noreferrer'
            >
              {item.name}
            </a>
            {item.icon&&<item.icon className='mr-2 h-6 w-6' />}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ItemsMenu;
