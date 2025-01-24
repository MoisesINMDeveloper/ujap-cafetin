interface ProductCardProps {
    product: {
        id: number;
        categoryId: number;
        title: string;
        description: string;
        price: number;
        images: string[];
    };
    handleDelete: (productId: number) => void;
    handleUpdate: (product: { id: number; categoryId: number; title: string; description: string; price: number; images: string[] }) => void;
}

const ProductCard = ({ product, handleDelete, handleUpdate }: ProductCardProps) => (
    <div className="bg-gray-800 p-4 rounded">
        <h2 className="text-xl font-bold">{product.title}</h2>
        <p className="text-gray-400">{product.description}</p>
        <p className="text-lg font-semibold">${product.price}</p>
        <div className="flex gap-2 mt-2">
            {product.images.map((image, index) => (
                <img
                    key={index}
                    src={image}
                    alt={product.title}
                    className="w-16 h-16 object-cover rounded"
                />
            ))}
        </div>
        <div className="flex justify-center gap-2 mt-4">
            <button
                className="bg-blue-500 text-white px-4 py-2 rounded"
                onClick={() => handleUpdate(product)}
            >
                Actualizar
            </button>
            <button
                className="bg-red-500 text-white px-4 py-2 rounded"
                onClick={() => handleDelete(product.id)}
            >
                Eliminar
            </button>
        </div>
    </div>
);

export default ProductCard;
