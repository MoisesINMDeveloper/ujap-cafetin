import { useState } from "react";

interface Category {
    id: number;
    name: string;
}

interface CreateProductModalProps {
    categories: Category[];
    onClose: () => void;
    onSave: (newProduct: { title: string; description: string; price: number; images: string[]; categoryId: number }) => void;
}

const CreateProductModal = ({ categories, onClose, onSave }: CreateProductModalProps) => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState(0);
    const [images, setImages] = useState<string[]>([]);
    const [categoryId, setCategoryId] = useState<number | null>(null);

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
                    setImages(base64Images);  // Agregar imágenes en base64 al estado
                })
                .catch((error) => {
                    console.error("Error al cargar las imágenes", error);
                });
        }
    };

    const handleSave = () => {
        if (categoryId !== null) {
            const newProduct = { title, description, price, images, categoryId };
            onSave(newProduct);
        }
    };

    return (
        <div className="fixed z-50 inset-0 bg-black bg-opacity-50 flex items-center text-black justify-center">
            <div className="bg-black border-primary border-2 w-[350px] p-4 rounded">
                <h2 className="text-xl font-bold mb-4 text-white">Agregar Producto</h2>
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
                        <div className="mt-2 flex">
                            {images.map((image, index) => (
                                <img key={index} src={image} alt={`image-${index}`} className="w-16 h-16 object-cover rounded" />
                            ))}
                        </div>
                    )}
                </div>
                <div className="mb-4">
                    <label className="block text-white">Categoría</label>
                    <select
                        value={categoryId ?? ""}
                        onChange={(e) => setCategoryId(parseInt(e.target.value))}
                        className="w-full p-2 border-2 border-primary rounded"
                    >
                        <option value="" disabled>Selecciona una categoría</option>
                        {categories.map((category) => (
                            <option key={category.id} value={category.id}>{category.name}</option>
                        ))}
                    </select>
                </div>
                <div className="flex justify-end gap-4">
                    <button onClick={onClose} className="px-4 py-2 bg-redButton   text-white rounded">Cancelar</button>
                    <button onClick={handleSave} className="px-4 py-2 bg-greenButton text-white rounded">Guardar</button>
                </div>
            </div>
        </div>
    );
};

export default CreateProductModal;
