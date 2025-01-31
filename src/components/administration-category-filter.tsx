interface CategoryFilterProps {
    categories: { id: number; name: string }[];
    activeCategory: number | null;
    handleFilter: (categoryId: number | null) => void;
}

const CategoryFilter = ({ categories, activeCategory, handleFilter }: CategoryFilterProps) => (
    <div className="flex flex-wrap justify-center items-center gap-4 mb-6">
        <button
            className={`px-4 py-2 rounded ${activeCategory === null ? "bg-primary text-white" : "bg-gray-600"}`}
            onClick={() => handleFilter(null)}
        >
            Todas
        </button>
        {categories.map(category => (
            <button
                key={category.id}
                className={`px-4 py-2 rounded ${activeCategory === category.id ? "bg-primary text-white" : "bg-gray-600"}`}
                onClick={() => handleFilter(category.id)}
            >
                {category.name}
            </button>
        ))}
    </div>
);

export default CategoryFilter;
