import PanelAdminProducts from "../components/administration-products";
import SideBar from "../components/sidebar";

const PanelAdmin=() => {
    return (
        <div className=" h-[calc(100vh-186px)] w-full relative flex items-center justify-center bg-black">
           <div className="flex gap-4">
            <SideBar/>
            <PanelAdminProducts/>
           </div>
        </div>
    )
}
export default PanelAdmin;