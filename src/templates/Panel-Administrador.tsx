import { useState } from "react";
import PanelAdminProducts from "../components/administration-products";
import SideBar from "../components/molecules/sidebar";
import PanelAdminCategories from "../components/administration-categories";
import { PanelAdminOrders } from "../components/administration-pedidos";
import { PanelAdminMobilePayment } from "../components/administration-pagomovil";
import { PanelAdminDelivery } from "../components/administration-delivery";

const PanelAdmin=() => {
    const [activeView, setActiveView] = useState("PRODUCTOS");

    const renderActiveView = () =>{
        switch(activeView){
            case "PRODUCTOS":
                return <PanelAdminProducts/>
            case "PEDIDOS":
                return <PanelAdminOrders/>
            case "PAGOMOVIL":
                return <PanelAdminMobilePayment/>
            case "DELIVERY":
                return <PanelAdminDelivery/>
            case "CATEGORIAS":
                return <PanelAdminCategories/>
            default:
                return <PanelAdminProducts/>
        }
    }
    return (
        <div className=" h-[calc(100vh-186px)] w-full relative flex items-center justify-center bg-black">
           <div className="flex gap-4">
           <SideBar setActiveView={setActiveView} />
           {renderActiveView()}
           </div>
        </div>
    )
}
export default PanelAdmin;