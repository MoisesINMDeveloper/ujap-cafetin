import { useState } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { MdOutlineCancel } from 'react-icons/md';

const ImageProduct = ({ images, alt }: { images: string[]; alt: string }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  const openModal: (image: string) => void = (image: string): void => {
    setSelectedImage(image);
    setIsModalOpen(true);
  };

  const closeModal: () => void = (): void => {
    setSelectedImage(null);
    setIsModalOpen(false);
  };

  return (
    <div>
      <div className='w-[280px] h-[180px] box-shadow rounded-lg mb-4 overflow-hidden'>
        <Slider {...settings}>
          {images.map((src: string, index: number) => (
            <img
              key={index}
              src={src}
              alt={alt}
              className='object-cover cursor-pointer'
              onClick={(): void => openModal(src)}
            />
          ))}
        </Slider>
      </div>
      {isModalOpen && (
        <div className='fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50'>
          <div className='relative bg-transparent rounded-lg p-4 max-w-3xl max-h-90vh overflow-auto'>
            <button
              onClick={closeModal}
              className='absolute top-0 right-0  p-1 rounded-full'
            >
              <MdOutlineCancel className='h-8 w-8 text-fourth' />
            </button>
            <img
              src={selectedImage ?? ''}
              alt={alt}
              className='max-w-full max-h-full'
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default ImageProduct;
