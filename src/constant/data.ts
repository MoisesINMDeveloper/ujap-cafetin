import type { IconType } from "react-icons";
import { TbTruckDelivery } from "react-icons/tb";
import { MdOutlineDinnerDining } from "react-icons/md";

import { FaInstagram, FaWhatsapp } from "react-icons/fa";

export interface Product {
  id: number;
  title: string;
  price: number;
  images: string[];
  description: string;
}

export interface Category {
  id: number;
  name: string;
  products: Product[];
}
export interface PayDates {
  bank: string;
  code: string;
  cedula: string;
  phone: string;
}
export interface ContactItem {
  name: string;
  link: string;
  icon: IconType;
}
export interface DeliveryOptions {
  name: string;
  fee: number;
}
export interface ExtraInfo{
  name:string
  link: string;
  icon: IconType;
}
const data: {
  categories: Category[];
  paydates: PayDates;
  contactData: ContactItem[];
  deliveryOptions: DeliveryOptions[];
  extraInfo: ExtraInfo[];
} = {
  categories: [
    {
      id: 1,
      name: "confiteria",
      products: [
        {
          id: 1,
          title: "Cocosette",
          price: 30.00,
          images: [
            "/cafetin-ujap/confiteria/cocosette.jpeg",
          ],
          description:
            "Galleta crujiente con relleno de crema de coco y sabor a coco.",
        },
        {
          id: 2,
          title: "Susy Maxi",
          price: 40.00,
          images: ["/cafetin-ujap/confiteria/susy.jpeg"],
          description:
            "Son galletas tipo wafer (oblea) rellenas de crema de chocolate.",
        },
        {
          id: 3,
          title: "Palitos",
          price: 35.00,
          images: ["/cafetin-ujap/confiteria/palos.jpeg"],
          description:
            "Galletas de vainilla cubiertas de chocolate.",
        }, 
        {
          id: 4,
          title: "Doritos",
          price: 47.00,
          images: ["/cafetin-ujap/confiteria/doritos.jpeg"],
          description:
            "80 gramos de ricos nachos cubiertos de condimento de queso.",
        },
        {
          id: 5,
          title: "Ruffles",
          price: 48.00,
          images: ["/cafetin-ujap/confiteria/ruffles.jpeg"],
          description:
            "Ricas papas con sabor a cebolla, queso o ketchup.",
        },
        {
          id: 6,
          title: "TOM",
          price: 45.00,
          images: ["/cafetin-ujap/confiteria/tom.jpeg"],
          description:
            "Ruedas de platanos con sabor a ajo.",
        },
        {
          id: 7,
          title: "Trululu",
          price: 30.00,
          images: ["/cafetin-ujap/confiteria/trululu-fresas.jpeg",
                  "/cafetin-ujap/confiteria/trululu-gomas.jpeg",
                  "/cafetin-ujap/confiteria/trululu.jpeg"],
          description:
            "Deliciosas gomitas con distintos sabores y formas, perfectas para tu paladar.",
        },
        {
          id: 8,
          title: "Chestrees",
          price: 45.00,
          images: ["/cafetin-ujap/confiteria/chestrees.jpeg"],
          description:
            "Palitos de queso para compartir con tus amigos.",
        },
      ],
    },
    {
      id: 2,
      name: "Empanadas",
      products: [
        {
          id: 1,
          title: "Empanadas",
          price: 70.00,
          images: [
            "/cafetin-ujap/empanadas/empanadas.jpeg",
          ],
          description:
            "Deliciosas empanadas de carne mechada, pollo, jamon y queso, pabellon, cazón.",
        },
        {
          id: 2,
          title: "Burguer Comb",
          price: 4.99,
          images: ["/cafetin-ujap/burger/BurgerComb.jpg"],
          description:
            "Doble hamburguesa con racion de papas cuenta con Lechuga tomate cebolla pepinillos y carne de res.",
        },
        {
          id: 3,
          title: "Burger Papas",
          price: 1.99,
          images: ["/cafetin-ujap/burger/burgerpapas.jpg"],
          description:
            "Extraña combinacion entre el morbido queso fundido y la carne acompañada de deliciosas papas fritas perfecta para cualquier antojo.",
        },
        {
          id: 4,
          title: "Burger Express",
          price: 3.99,
          images: ["/cafetin-ujap/burger/rompehuesos.jpg"],
          description:
            "Hamburguesa express cuenta con doble carne racion de papas tomate lechuga aros de cebolla y todo el contorno extra en queso y salsas",
        },
      ],
    },
    {
      id: 3,
      name: "Pepitos",
      products: [
        {
          id: 1,
          title: "Pepito Carne",
          price: 7.99,
          images: [
            "/cafetin-ujap/pepito/PepitoFullEquipo.jfif",
            "/cafetin-ujap/pepito/PepitoPeligro.jfif",
          ],
          description:
            "Un tradicional pepito callejero de carne con: tomate, lechuga, papas cabello de angel, queso amarillo, cebolla, jamon, salsas al gusto.",
        },
      ],
    },
    {
      id: 4,
      name: "salchipapas",
      products: [
        {
          id: 1,
          title: "Salchipapas",
          price: 4.99,
          images: [
            "/cafetin-ujap/salchipapa/salchipapas.jpg",
            "/cafetin-ujap/salchipapa/salchipapas2.jpg",
          ],
          description:
            "Combo de salchicas picadas papas fritas combinadas con salsas al gusto, queso amarillo, jamon y tocineta.",
        },
      ],
    },
    {
      id: 5,
      name: "combos",
      products: [
        {
          id: 1,
          title: "Combo 2 personas",
          price: 4.99,
          images: ["/cafetin-ujap/combos/combofamiliar.jpg"],
          description:
            "Combo para dos personas dos perros calientes, 2 racion de pollo y papas fritas mas 2 jugos naturales.",
        },
        {
          id: 2,
          title: "Papas fritas",
          price: 2.99,
          images: ["/cafetin-ujap/combos/papasfritas.jpg"],
          description:
            "Racion extensa de papas fritas con salsa tartara para abrir el apetito.",
        },
      ],
    },
    {
      id: 6,
      name: "Bebidas",
      products: [
        {
          id: 1,
          title: "Pepsi",
          price: 56.00,
          images: [
            "/cafetin-ujap/bebidas/pepsi.jpeg",
          ],
          description:
            "Bebida pepsi en lata perfecta para acompañar tu desayuno.",
        },
        {
          id: 2,
          title: "Jugos Naturales",
          price: 40.00,
          images: ["/cafetin-ujap/bebidas/jugo-natural.jpeg",],
          description:
            "Jugos naturales parchita, mango, durazno, patilla, fresa.",
        },
        {
          id: 3,
          title: "",
          price: 0.99,
          images: ["/cafetin-ujap/bebidas/batidocambur.jpg"],
          description: "Delicioso batido de cambur muy nutritivo y natural.",
        },
        {
          id: 4,
          title: "Batido de naranja",
          price: 0.99,
          images: ["/cafetin-ujap/bebidas/batidosabroso.jpg"],
          description:
            "Jugo de naranja para los amantes del citrico, altos valores de vitamina C.",
        },
      ],
    },
  ],
  paydates: {
    bank: "Venezuela",
    code: "0102",
    cedula: "24685881",
    phone: "4124676968",
  },
  extraInfo:[
    {
      name: "WhatsApp Cafetín",
      link: "https://wa.me/4124676968",
      icon: FaWhatsapp,
    },
    {
      name: "Cafetín UJAP",
      link: "https://www.instagram.com/cafetinujap",
      icon: FaInstagram,
    }
  ],
  contactData: [
    {
      name: "Cafetín UJAP",
      link: "https://www.instagram.com/cafetinujap",
      icon: FaInstagram,
    },
    {
      name: "WhatsApp Cafetín",
      link: "https://wa.me/4124676968",
      icon: FaWhatsapp,
    },
  ],
  deliveryOptions: [
    { name: "Caña de Azucar", fee: 0 },
    { name: "El Limon", fee: 2 },
    { name: "San Vicente", fee: 3 },
  ],
};

export default data;
