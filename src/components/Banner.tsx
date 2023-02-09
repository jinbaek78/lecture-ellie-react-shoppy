type BannerProps = {};
const Banner = ({}: BannerProps) => {
  return (
    <div className="flex w-full justify-center items-center h-72 bg-[url('/images/banner.jpeg')] bg-cover bg-center">
      <div className="text-white">
        <p className="text-3xl">Shop With Us</p>
        <p className="text-sm font-light">Best Products, Hight Quality</p>
      </div>
    </div>
  );
};

export default Banner;
