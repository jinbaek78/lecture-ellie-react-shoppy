import { FormEvent, useRef, useState } from 'react';
import { getImageURL } from '../api/cloudinary';
import { saveProduct } from '../api/firebase';
import Button from '../components/ui/Button';
import InputFieldRow from '../components/ui/InputFieldRow';

const SUCCESS_MESSAGE = '✅Your product have successfully registered!';
const ERROR_MESSAGE = 'You need a image file to register the product';

export type ProductInfoType = {
  category: string;
  description: string;
  id: string;
  options: string;
  image: string;
};
const initialProductInfo: ProductInfoType = {
  category: '',
  description: '',
  id: '',
  options: '',
  image: '',
};

type NewProductProps = {};
const NewProduct = ({}: NewProductProps) => {
  const [productInfo, setProductInfo] =
    useState<ProductInfoType>(initialProductInfo);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [successMessage, setSuccessMessage] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const formRef = useRef<HTMLFormElement | null>(null);
  const handleChange = (e: FormEvent<HTMLFormElement>) => {
    const target = e.target as HTMLInputElement;
    if (target.name !== 'file') {
      return setProductInfo({ ...productInfo, [target.name]: target.value });
    }
    const files = target.files;
    if (files) {
      setImageFile(files[0]);
    }
  };
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!imageFile) {
      setErrorMessage(ERROR_MESSAGE);
      setTimeout(() => setErrorMessage(''), 4000);
      return;
    }

    setLoading(true);
    getImageURL(imageFile) //
      .then((imgURL) => saveProduct({ ...productInfo, image: imgURL }))
      .then(() => {
        const formElement = formRef.current;
        if (formElement) {
          formElement.reset();
          setImageFile(null);
        }
        setLoading(false);
        setSuccessMessage(SUCCESS_MESSAGE);
        setTimeout(() => setSuccessMessage(''), 4000);
      })
      .catch(console.error);
  };
  return (
    <>
      <div className="flex flex-col items-center my-3">
        <p className="text-2xl">Register a new product</p>
        {imageFile && (
          <img
            className="w-48 h-64 mt-3"
            src={URL.createObjectURL(imageFile)}
            alt="test"
          />
        )}
        {successMessage && <p>{successMessage}</p>}
      </div>
      <form ref={formRef} onSubmit={handleSubmit} onChange={handleChange}>
        <InputFieldRow type="file" name="file" />
        <InputFieldRow type="text" placeholder="name" />
        <InputFieldRow type="number" placeholder="price" />
        <InputFieldRow type="text" placeholder="category" />
        <InputFieldRow type="text" placeholder="description" />
        <InputFieldRow
          type="text"
          placeholder="options use comma ,"
          name="options"
        />
        <div className="h-12">
          {!loading && (
            <Button text="Register product" onClick={() => undefined} />
          )}

          {loading && (
            <Button
              text="Registration in progress..."
              onClick={() => undefined}
            />
          )}
        </div>
        {errorMessage && (
          <p className="text-xl text-red-500 text-center">{errorMessage}</p>
        )}
      </form>
    </>
  );
};

export default NewProduct;
