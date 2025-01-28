import { useState, useEffect } from 'react';
import InputFilter from '../components/atoms/InputFilter';
import FilterCategories from '../components/molecules/FilterCategories';
import Menu from '../components/organisms/Menu';
import { type Category, type Product } from '../constant/data';
import { useCart } from '../hooks/useCart';
import { getCategories } from '../constant/Api';

const Dashboard = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredCategories, setFilteredCategories] = useState<Category[]>([]);
  const { addToCart } = useCart();

  // Cargar categorías desde la API
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await getCategories();
        setCategories(data);
        setFilteredCategories(data);
      } catch (error) {
        console.error('Error al cargar categorías:', error);
      }
    };

    fetchCategories();
  }, []);

  const handleSearch: (term: string) => void = (term: string): void => {
    setSearchTerm(term);
  };

  // Función para reemplazar los acentos
  function quitarAcentos(cadena: string): string {
    const acentos = 'áéíóúÁÉÍÓÚ';
    const sinAcentos = 'aeiouAEIOU';

    for (let i = 0; i < acentos.length; i++) {
      cadena = cadena.replace(
        new RegExp(acentos.charAt(i), 'g'),
        sinAcentos.charAt(i)
      );
    }

    return cadena;
  }

  // Filtrar categorías y productos según el término de búsqueda
  const displayedCategories = filteredCategories.map((category) => ({
    ...category,
    products: category.products.filter((product) =>
      quitarAcentos(product.title.toLowerCase()).includes(
        quitarAcentos(searchTerm.toLowerCase())
      )
    ),
  }));

  return (
    <section className='flex bg-black flex-col justify-center items-center pt-20 '>
      <div className='flex flex-row justify-between items-center gap-8 w-full px-4 md:w-full md:px-16 lg:w-full lg:px-28'>
        <InputFilter onSearch={handleSearch} />
        <FilterCategories onFilter={setFilteredCategories} />
      </div>
      <div className='bg-black w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5'>
        {displayedCategories.map(
          (category: { products: Product[]; id: number; name: string }) => (
            <Menu
              key={category.id}
              products={category.products}
              addToCart={addToCart}
            />
          )
        )}
      </div>
    </section>
  );
};

export default Dashboard;
