import { useEffect, useState } from 'react';
import { getProducts } from '../services/productService';
import ProductCard from '../components/ProductCard';

const Home = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    getProducts().then(res => setProducts(res.data));
  }, []);

  return (
    <div>
      <h2>Catálogo de Productos</h2>
      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
        {products.map(prod => <ProductCard key={prod.id} product={prod} />)}
      </div>
    </div>
  );
};

export default Home;
