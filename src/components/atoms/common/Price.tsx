const Price=({price}: {price: number}) => {
    return <p className="text-secundary text-xl text-right">{price.toFixed(2)} $</p>;
}

export default Price;