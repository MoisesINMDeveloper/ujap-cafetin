import { useState } from "react";
import PanelAdminProducts from "../components/administration-products";
import SideBar from "../components/molecules/sidebar";
import PanelAdminCategories from "../components/administration-categories";
import { PanelAdminOrders } from "../components/administration-pedidos";
import { PanelAdminMobilePayment } from "../components/administration-pagomovil";
import PanelAdminDelivery from "../components/administration-delivery";

interface PanelAdminProps {
  activeView: string;
  setActiveView: (view: string) => void;
}

const PanelAdmin = ({ activeView, setActiveView }: PanelAdminProps) => {
  const renderActiveView = () => {
    switch (activeView) {
      case "PRODUCTOS":
        return <PanelAdminProducts />;
      case "PEDIDOS":
        return <PanelAdminOrders />;
      case "PAGOMOVIL":
        return <PanelAdminMobilePayment />;
      case "DELIVERY":
        return <PanelAdminDelivery />;
      case "CATEGORIAS":
        return <PanelAdminCategories />;
      default:
        return <PanelAdminProducts />;
    }
  };

  return (
    <div className="w-full flex overflow-auto items-center justify-center mt-[4rem] bg-black">
      <div >
        <div className="hidden lg:block">
        <SideBar setActiveView={setActiveView} />
        </div>
        <div className="lg:ml-32">
          {renderActiveView()}
        </div>
      </div>
    </div>
  );
};

export default PanelAdmin;
