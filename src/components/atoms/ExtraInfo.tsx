import  contactData, { type ContactItem }  from '../../constant/data';

const ItemsMenu = () => {
  return (
    <div>
      <ul className='flex flex-row items-center justify-center gap-4'>
        {contactData?.extraInfo.map((item: ContactItem, index: number) => (
          <li className='flex flex-row items-center text-tertiary gap-2' key={index}>
            <a href={item.link} target='_blank' rel='noopener noreferrer'>
              {item.name}
            </a>
            {item.icon && <item.icon className='w-6 h-6' />}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ItemsMenu;
