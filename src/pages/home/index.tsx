import AuthorizedLayout from "@/layout/authorizedLayout"
import { increaseCountValue } from "@/store/actions/auth";
import { useDispatch, useSelector } from "react-redux";
export default function Home() {
    const dispatch:any = useDispatch()
    const {count}=useSelector((state:any)=> state.auth);
    console.log(count);
    const handleButtonClick=()=>{
        dispatch(increaseCountValue())
    }
    return(
        <>
        <h1 className="text-blue-600">Hello i am on the default function I am inside Home Page How can i do it </h1>
        <h2>Count Value: {count}</h2>
        <button className="bg-amber-300 text-9xl"  onClick={()=>handleButtonClick()}>click</button>
        </>
    )
}
Home.getLayout = function getLayout(page: React.ReactElement) {
    return <AuthorizedLayout>{page}</AuthorizedLayout>
}