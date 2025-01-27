import { useEffect, useState } from "react";
import { getCategories, getProducts, deleteProduct, updateProduct, createProducts } from "../constant/Api";
import CategoryFilter from "./administration-category-filter";
import ProductList from "./administration-product-list";
import UpdateProductModal from "./update-product-modal";
import CreateProductModal from "./create-product-modal";

const PanelAdminProducts = () => {
    interface Product {
        id: number;
        categoryId: number;
        title: string;
        description: string;
        price: number;
        images: string[];
    }
    
    const [categories, setCategories] = useState([]);
    const [products, setProducts] = useState<Product[]>([]);
    const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
    const [activeCategory, setActiveCategory] = useState<number | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const [currentProduct, setCurrentProduct] = useState<Product | null>(null);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await getCategories();
                setCategories(response);
            } catch (error) {
                console.error("Error fetching categories:", error);
            }
        };

        fetchCategories();
    }, []);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await getProducts();
                setProducts(response);
                setFilteredProducts(response);
            } catch (error) {
                console.error("Error fetching products:", error);
            }
        };

        fetchProducts();
    }, []);

    const handleFilter = (categoryId: number | null) => {
        setActiveCategory(categoryId);
        if (categoryId === null) {
            setFilteredProducts(products);
        } else {
            setFilteredProducts(products.filter(product => product.categoryId === categoryId));
        }
    };

    const handleDelete = async (productId: number) => {
        try {
            await deleteProduct(productId);
            setProducts(prev => prev.filter(product => product.id !== productId));
            setFilteredProducts(prev => prev.filter(product => product.id !== productId));
        } catch (error) {
            console.error("Error deleting product:", error);
        }
    };

    const handleUpdate = (product: Product) => {
        setCurrentProduct(product);
        setIsModalOpen(true);
    };

    const handleModalClose = () => {
        setIsModalOpen(false);
        setCurrentProduct(null);
    };

    const handleModalSave = async (updatedProduct: Product) => {
        try {
            await updateProduct(updatedProduct.id, updatedProduct);
            setProducts(prev => prev.map(product => product.id === updatedProduct.id ? updatedProduct : product));
            setFilteredProducts(prev => prev.map(product => product.id === updatedProduct.id ? updatedProduct : product));
            handleModalClose();
        } catch (error) {
            console.error("Error updating product:", error);
        }
    };

    const handleCreateModalOpen = () => {
        setIsCreateModalOpen(true);
    };

    const handleCreateModalClose = () => {
        setIsCreateModalOpen(false);
    };

    const handleCreateModalSave = async (newProduct: Omit<Product, 'id'>) => {
        try {
            const createdProduct = await createProducts(newProduct);
            setProducts(prev => [...prev, createdProduct]);
            setFilteredProducts(prev => [...prev, createdProduct]);
            handleCreateModalClose();
        } catch (error) {
            console.error("Error creating product:", error);
        }
    };

    return (
        <div className="text-white p-4 flex flex-col gap-6 items-center justify-center">
            <h1 className="text-2xl mb-4">Administrador de Productos</h1>
            <CategoryFilter
                categories={categories}
                activeCategory={activeCategory}
                handleFilter={handleFilter}
            />
            <ProductList
                products={filteredProducts}
                handleDelete={handleDelete}
                handleUpdate={handleUpdate}
            />
            <button
                className="bg-primary text-white font-bold px-4 py-2 rounded my-4"
                onClick={handleCreateModalOpen}
            >
                Agregar Producto
            </button>
            {isModalOpen && currentProduct && (
                <UpdateProductModal
                    product={currentProduct}
                    onClose={handleModalClose}
                    onSave={handleModalSave}
                />
            )}
            {isCreateModalOpen && (
                <CreateProductModal
                    categories={categories}
                    onClose={handleCreateModalClose}
                    onSave={handleCreateModalSave}
                />
            )}
        </div>
    );
};

export default PanelAdminProducts;
