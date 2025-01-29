import React, { useState, useEffect } from 'react';
import { InputLogin } from './atoms/input';
import { getCategories, createCategory, updateCategory, deleteCategory } from '../constant/Api';

const PanelAdminCategories = () => {
    const [categories, setCategories] = useState([{ id: 0, name: '' }]);
    const [newCategory, setNewCategory] = useState('');
    const [editCategory, setEditCategory] = useState<any>(null);

    useEffect(() => {
        fetchCategories();
    }, []);

    const fetchCategories = async () => {
        try {
            const fetchedCategories = await getCategories();
            setCategories(fetchedCategories);
        } catch (error) {
            console.error("Error fetching categories:", error);
        }
    };

    const handleAddCategory = async () => {
        try {
            await createCategory(newCategory);
            fetchCategories();
            setNewCategory('');
        } catch (error) {
            console.error("Error creating category:", error);
        }
    };

    const handleUpdateCategory = async () => {
        try {
            await updateCategory(editCategory.id, editCategory.name);
            fetchCategories();
            setEditCategory(null);
        } catch (error) {
            console.error("Error updating category:", error);
        }
    };

    const handleRemoveCategory = async (categoryId: number) => {
        try {
            await deleteCategory(categoryId);
            fetchCategories();
        } catch (error) {
            console.error("Error deleting category:", error);
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        if (editCategory) {
            setEditCategory({ ...editCategory, [name]: value });
        } else {
            setNewCategory(value);
        }
    };

    return (
        <div className="p-4 bg-transparent border-primary border-2 rounded-sm mb-10">
            <h1 className="text-white text-2xl mb-4 text-left">Administrador de categorías</h1>
            <div className="mb-6 flex flex-col justify-center items-center">
                <h2 className="text-white text-xl mb-6 text-left">
                    {editCategory ? "Editar categoría" : "Agregar nueva categoría"}
                </h2>
                <div className="flex flex-row gap-4 mb-4">
                    <InputLogin
                        type="text"
                        name="name"
                        placeholder="Nombre de la categoría"
                        value={editCategory ? editCategory.name : newCategory}
                        onChange={handleInputChange}
                    />
                    <button
                        className={`${editCategory ? "bg-greenButton" : "bg-primary"} text-white p-2 rounded w-24`}
                        onClick={editCategory ? handleUpdateCategory : handleAddCategory}
                    >
                        {editCategory ? "Actualizar" : "Agregar"}
                    </button>
                </div>
            </div>
                <h2 className="text-white text-xl mb-2 text-center">Categorías</h2>
            <div className="flex flex-wrap items-center justify-center gap-6 mx-4">
                {categories.map((category) => (
                    <div key={category.id}>
                        <div className="bg-transparent border-primary border-2 rounded-md p-4 mb-2 text-white flex flex-col gap-4">
                            <p>{category.name}</p>
                        </div>
                        <div className="flex justify-center my-5 gap-4">
                            <button
                                className="bg-greenButton text-white p-2 rounded mr-2 w-24"
                                onClick={() => setEditCategory(category)}
                            >
                                Editar
                            </button>
                            <button
                                className="bg-redButton text-white p-2 rounded w-24"
                                onClick={() => handleRemoveCategory(category.id)}
                            >
                                Eliminar
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default PanelAdminCategories;
