import { useState, useEffect, useRef } from 'react';
import { type Category } from '../../constant/data';
import ButtonFilter from '../atoms/ButtonFilter';
import FilterMenu from './FilterMenu';
import { getCategories } from '../../constant/Api';

const FilterCategories = ({
  onFilter,
}: {
  onFilter: (filteredCategories: Category[]) => void;
}) => {
  const [categories, setCategories] = useState<Category[]>([]); // Carga las categorías dinámicamente
  const [isOpen, setIsOpen] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const menuRef = useRef<HTMLDivElement>(null);

  // Función para alternar el menú
  const toggleMenu = (): void => {
    setIsOpen(!isOpen);
  };

  // Manejo de cambios en las categorías seleccionadas
  const handleCategoryChange = (category: string): void => {
    setSelectedCategories((prevSelected) =>
      prevSelected.includes(category)
        ? prevSelected.filter((cat) => cat !== category)
        : [...prevSelected, category]
    );
  };

  // Cargar las categorías desde la API
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await getCategories(); // Llama a la API para obtener las categorías
        setCategories(data); // Guarda las categorías en el estado local
      } catch (error) {
        console.error('Error al cargar categorías:', error);
      }
    };

    fetchCategories();
  }, []);

  // Filtrar las categorías seleccionadas
  useEffect(() => {
    const filteredCategories: Category[] = categories.filter(
      (category) =>
        selectedCategories.length === 0 || selectedCategories.includes(category.name)
    );
    onFilter(filteredCategories);
  }, [selectedCategories, categories, onFilter]);

  // Cerrar el menú al hacer clic fuera de él
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent): void => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div ref={menuRef}>
      <ButtonFilter onClick={toggleMenu} isOpen={isOpen} />
      {isOpen && (
        <div>
          <FilterMenu
            categories={categories} // Pasa las categorías dinámicas
            selectedCategories={selectedCategories}
            onCategoryChange={handleCategoryChange}
          />
        </div>
      )}
    </div>
  );
};

export default FilterCategories;
