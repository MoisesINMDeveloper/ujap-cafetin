import { useState } from "react";
import PanelAdminProducts from "../components/administration-products";
import SideBar from "../components/molecules/sidebar";
import PanelAdminCategories from "../components/administration-categories";
import { PanelAdminOrders } from "../components/administration-pedidos";
import { PanelAdminMobilePayment } from "../components/administration-pagomovil";
import PanelAdminDelivery from "../components/administration-delivery";

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
        <div className="  w-full flex overflow-auto  items-center justify-center mt-[4rem] bg-black">
           <div>
           <SideBar setActiveView={setActiveView} />
           <div className="ml-20">
                {renderActiveView()}
           </div>
           </div>
        </div>
    )
}
export default PanelAdmin;