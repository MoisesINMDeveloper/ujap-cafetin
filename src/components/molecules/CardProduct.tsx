import type {Product} from "../../constant/data";
import Button from "../atoms/common/Button";
import Description from "../atoms/common/Description";
import ImageProduct from "../atoms/common/ImageProduct";
import Price from "../atoms/common/Price";
import TitleProduct from "../atoms/common/Title";




const ProductDetail=({product,onAddToCart}: {product: Product,onAddToCart: () => void}) => {
    return (
        <div className="flex flex-col justify-between items-center w-[300px] h-[500px] p-5 border-2 border-primary text-white rounded-lg">
            <div className="flex flex-col justify-center px-4">
                <Price price={product.price} />
                <div className=' mb-4'>
                    <TitleProduct title={product.title} />
                </div>
                <ImageProduct images={product.images} alt={product.title} />
                <Description text={product.description} />
            </div>
                <Button label="Agregar pedido" onClick={onAddToCart} />
        </div>
    );
};

export default ProductDetail;
