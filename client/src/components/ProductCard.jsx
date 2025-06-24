const ProductCard = ({ product }) => (
  <div style={{ border: '1px solid #ccc', padding: '10px', margin: '10px' }}>
    <img src={product.image} alt={product.title} width="100" />
    <h3>{product.title}</h3>
    <p>{product.description}</p>
    <p><b>Precio:</b> ${product.price}</p>
  </div>
);

export default ProductCard;
