import Button from '../components/ui/Button';
import InputFieldRow from '../components/ui/InputFieldRow';

type NewProductProps = {};
const NewProduct = ({}: NewProductProps) => {
  return (
    <>
      <div className="flex flex-col items-center my-3">
        <p className="text-2xl">Register a new product</p>
        <img className="w-48 h-64 mt-3" src="/images/2.webp" alt="test" />
      </div>
      <form>
        <InputFieldRow type="file" />
        <InputFieldRow type="text" placeholder="name" />
        <InputFieldRow type="number" placeholder="price" />
        <InputFieldRow type="text" placeholder="category" />
        <InputFieldRow type="text" placeholder="description" />
        <InputFieldRow type="text" placeholder="options" />
        <div className="h-12">
          <Button text="Register product" onClick={() => undefined} />
        </div>
      </form>
    </>
  );
};

export default NewProduct;
