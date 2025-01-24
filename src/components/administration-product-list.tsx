import ProductCard from "./administration-productcard";

interface Product {
    id: number;
    categoryId: number; // Añade esta línea
    title: string;
    description: string;
    price: number;
    images: string[];
}

interface ProductListProps {
    products: Product[];
    handleDelete: (productId: number) => void;
    handleUpdate: (product: Product) => void;
}

const ProductList = ({ products, handleDelete, handleUpdate }: ProductListProps) => (
    <div className="flex flex-row gap-6">
        {products.map(product => (
            <ProductCard
                key={product.id}
                product={product}
                handleDelete={handleDelete}
                handleUpdate={handleUpdate}
            />
        ))}
    </div>
);

export default ProductList;
