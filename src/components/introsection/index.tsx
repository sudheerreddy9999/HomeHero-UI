import Services from "@/components/services";
import Image from "@/components/Image/image";
// import ServicesImg from "@/assets/services-Image.png"
import BannerImage from "@/assets/icons/banner-image.jpg"
// import { useDispatch } from "react-redux";
export default function IntroSection() {
  // const dispatch: any = useDispatch();
  return (
    <>
      <div className="flex justify-center flex-col-reverse mt-20  lg:flex-row  items-center dark:bg-black  ">
        <div className="w-1/2">
          <Services />
        </div>
        <div className="w-full    lg:w-1/2 p-2 m-auto flex justify-center items-end">
        <Image src={BannerImage} alt="services img" className="rounded-lg   w-11/12 h-[300px] lg:h-[460px]"/>
        </div>
      </div>
    </>
  );
}
// Home.getLayout = function getLayout(page: React.ReactElement) {
//   return <AuthorizedLayout>{page}</AuthorizedLayout>;
// };
