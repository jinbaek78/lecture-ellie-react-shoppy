import { ChangeEvent, FormEvent, ReactNode, useState } from 'react';
import Button from '../components/ui/Button';

export type ProductType = {
  title: string;
  price: number;
  category: string;
  description: string;
  id: string;
  options: string;
  image: string;
};

const initialProduct: ProductType = {
  title: '',
  price: 0,
  category: '',
  description: '',
  id: '',
  options: '',
  image: '',
};

type NewProductProps = {};
const NewProduct = ({}: NewProductProps) => {
  const [product, setProduct] = useState<ProductType>(initialProduct);
  const [file, setFile] = useState<File | null>(null);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value, files } = e.target;
    if (name === 'file') {
      setFile(files && files[0]);
      return;
    }

    setProduct((product) => ({ ...product, [name]: value }));
  };
  return (
    <section>
      {file && <img src={URL.createObjectURL(file)} alt="local file" />}
      <form onSubmit={handleSubmit}>
        <input
          type="file"
          accept="image/*"
          name="file"
          required
          onChange={handleChange}
        />
        <input
          type="text"
          name="title"
          value={product.title ?? ''}
          placeholder="title"
          required
          onChange={handleChange}
        />
        <input
          type="number"
          name="price"
          value={product.price ? product.price : ''}
          placeholder="Price"
          required
          onChange={handleChange}
        />
        <input
          type="text"
          name="category"
          value={product.category ?? ''}
          placeholder="category"
          required
          onChange={handleChange}
        />
        <input
          type="text"
          name="description"
          value={product.description ?? ''}
          placeholder="description"
          required
          onChange={handleChange}
        />
        <input
          type="text"
          name="options"
          value={product.options ?? ''}
          placeholder="options(use , to distinguish)"
          required
          onChange={handleChange}
        />
        <Button text={'Register Product'} />
      </form>
    </section>
  );
};

export default NewProduct;
