import { FormEvent, useState } from 'react';
import { useDB } from '../context/DbContext';

export type ProductType = {
  imgURL?: string;
  name: string;
  price: number;
  category: string;
  description: string;
  options: string;
};

const emptyProduct = {
  imgURL: 'https://picsum.photos/200/200',
  name: '',
  price: 0,
  category: '',
  description: '',
  options: '',
};
type AdminProps = {};
const Admin = ({}: AdminProps) => {
  const [productInfo, setProductInfo] = useState<ProductType>(emptyProduct);
  const imgURL = 'https://picsum.photos/200/200';
  const { updateProduct } = useDB();
  console.log('productInfo: ', productInfo);
  const handleValuesChange = (e: FormEvent<HTMLFormElement>) => {
    const InputElement = e.target as HTMLInputElement;
    console.log(InputElement);
    console.log(InputElement.value);
    setProductInfo({ ...productInfo, [InputElement.name]: InputElement.value });
  };
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    updateProduct(productInfo);
    (e.target as HTMLFormElement).reset();
  };
  return (
    <div className="flex flex-col h-full">
      <div>
        <p className="text-2xl text-center p-2">Register new Product </p>
        {imgURL && (
          <img
            className="m-auto p-1 pb-2"
            src={imgURL}
            width={350}
            height={500}
          />
        )}
      </div>

      <form onSubmit={handleSubmit} onChange={handleValuesChange}>
        <div className="flex p-3 items-center justify-start w-full h-15 border  border-zinc-200">
          <input type="file" name="imgURL" className="w-full" />
        </div>

        <div className="flex p-3 items-center justify-start w-full h-15 border  border-zinc-200 my-2">
          <input
            className="text-xl outline-none w-full"
            type="text"
            placeholder="name"
            name="name"
          />
        </div>

        <div className="flex p-3 items-center justify-start w-full h-15 border  border-zinc-200 my-2 ">
          <input
            className="text-xl outline-none w-full"
            type="text"
            placeholder="price"
            name="price"
          />
        </div>

        <div className="flex p-3 items-center justify-start w-full h-15 border  border-zinc-200 my-2 ">
          <input
            className="text-xl outline-none w-full"
            type="text"
            placeholder="category"
            name="category"
          />
        </div>

        <div className="flex p-3 items-center justify-start w-full h-15 border  border-zinc-200 my-2 ">
          <input
            className="text-xl outline-none w-full"
            type="text"
            placeholder="description"
            name="description"
          />
        </div>

        <div className="flex p-3 items-center justify-start w-full h-15 border  border-zinc-200 my-2 ">
          <input
            className="text-xl outline-none w-full"
            type="text"
            placeholder="options(use comma ,)"
            name="options"
          />
        </div>

        <button
          className="flex p-3 items-center justify-start w-full h-15 border  border-zinc-200 my-2  bg-[#4abad9]"
          type="submit"
        >
          <p className="text-white font-bold w-full justify-center">
            Register Product
          </p>
        </button>
      </form>
    </div>
  );
};

export default Admin;
