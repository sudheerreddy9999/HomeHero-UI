import AuthorizedLayout from "@/layout/authorizedLayout";
import Services from "@/components/services";
import Image from "@/components/Image/image";
import ServicesImg from "@/assets/services-Image.png"
import { useDispatch, useSelector } from "react-redux";
export default function Home() {
  const dispatch: any = useDispatch();
  return (
    <>
      <div className="flex justify-center flex-col-reverse mt-20  lg:flex-row  items-center dark:bg-black min-h-screen ">
        <div className="w-1/2">
          <Services />
        </div>
        <div className="w-full  lg:w-1/2 p-2 flex justify-center items-center">
        <Image src={ServicesImg} className="rounded-lg  w-11/12 h-[300px] lg:h-[520px]"/>
        </div>
      </div>
    </>
  );
}
Home.getLayout = function getLayout(page: React.ReactElement) {
  return <AuthorizedLayout>{page}</AuthorizedLayout>;
};
