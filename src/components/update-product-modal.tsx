import { useState } from "react";

interface Product {
    id: number;
    categoryId: number;
    title: string;
    description: string;
    price: number;
    images: string[];
}

interface UpdateProductModalProps {
    product: Product;
    onClose: () => void;
    onSave: (updatedProduct: Product) => void;
}

const UpdateProductModal = ({ product, onClose, onSave }: UpdateProductModalProps) => {
    const [title, setTitle] = useState(product.title);
    const [description, setDescription] = useState(product.description);
    const [price, setPrice] = useState(product.price);
    const [images, setImages] = useState(product.images);

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (files) {
            const imagePromises = Array.from(files).map((file) => {
                return new Promise<string>((resolve, reject) => {
                    const reader = new FileReader();
                    reader.onloadend = () => resolve(reader.result as string);
                    reader.onerror = reject;
                    reader.readAsDataURL(file);
                });
            });

            Promise.all(imagePromises)
                .then((base64Images) => {
                    setImages(base64Images);  // Actualiza las imágenes en base64
                })
                .catch((error) => {
                    console.error("Error al cargar las imágenes", error);
                });
        }
    };

    const handleSave = () => {
        const updatedProduct = { ...product, title, description, price, images };
        onSave(updatedProduct);
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center text-black justify-center">
            <div className="bg-black border-primary border-2 w-[350px] p-4 rounded">
                <h2 className="text-xl font-bold mb-4 text-white">Actualizar Producto</h2>
                <div className="mb-4">
                    <label className="block text-white">Título</label>
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="w-full p-2 border-2 border-primary outline-none rounded"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-white">Descripción</label>
                    <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="w-full p-2 border-2 border-primary rounded"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-white">Precio</label>
                    <input
                        type="number"
                        value={price}
                        onChange={(e) => setPrice(parseFloat(e.target.value))}
                        className="w-full p-2 border-2 border-primary rounded"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-white">Imágenes</label>
                    <input
                        type="file"
                        accept="image/*"
                        multiple
                        onChange={handleImageChange}
                        className="w-full p-2 border-2 border-primary rounded"
                    />
                    {images.length > 0 && (
                        <div className="mt-2">
                            {images.map((image, index) => (
                                <img key={index} src={image} alt={`image-${index}`} className="w-16 h-16 object-cover rounded" />
                            ))}
                        </div>
                    )}
                </div>
                <div className="flex justify-end gap-4">
                    <button onClick={onClose} className="px-4 py-2 bg-gray-500 text-white rounded">Cancelar</button>
                    <button onClick={handleSave} className="px-4 py-2 bg-blue-500 text-white rounded">Guardar</button>
                </div>
            </div>
        </div>
    );
};

export default UpdateProductModal;
