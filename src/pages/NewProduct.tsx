import { useMutation, useQueryClient } from '@tanstack/react-query';
import { ChangeEvent, FormEvent, ReactNode, useState } from 'react';
import { addNewProduct } from '../api/firebase';
import { uploadImage } from '../api/uplodaer';
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

type AddProductVariables = {
  product: ProductType;
  url: string;
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
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const [success, setSuccess] = useState<string>('');

  const queryClient = useQueryClient();
  const addProduct = useMutation(
    ({ product, url }: AddProductVariables) => addNewProduct(product, url),
    { onSuccess: () => queryClient.invalidateQueries(['products']) }
  );

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (file) {
      setIsUploading(true);
      uploadImage(file) //
        .then((url) => {
          addProduct.mutate(
            { product, url },
            {
              onSuccess: () => {
                setSuccess('Your Product has successfully added');
                setTimeout(() => setSuccess(''), 4000);
              },
            }
          );
        })
        .finally(() => setIsUploading(false));
    }
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
    <section className="w-full text-center">
      <h2 className="text-2xl font-bold my-4">New Product Registration</h2>
      {success && <p className="my-2">✅ {success}</p>}
      {file && (
        <img
          className="w-96 mx-auto mb-2"
          src={URL.createObjectURL(file)}
          alt="local file"
        />
      )}
      <form className="flex flex-col px-12" onSubmit={handleSubmit}>
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
        <Button
          text={isUploading ? 'Uploading...' : 'Register Product'}
          disabled={isUploading}
        />
      </form>
    </section>
  );
};

export default NewProduct;
