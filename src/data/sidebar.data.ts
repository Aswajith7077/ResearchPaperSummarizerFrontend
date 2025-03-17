import { SidebarDataType } from "@/types/sidebar.type";
import { HiShoppingCart } from "react-icons/hi";
import { MdPayments } from "react-icons/md";
import { RiShip2Fill } from "react-icons/ri";
import { SiSinglestore } from "react-icons/si";
import { MdSpaceDashboard } from "react-icons/md";

const sidebar_data: SidebarDataType = {
    sidebar_profile: {
        fullname: "Aswajith S",
        username: "voicedaswa"
    },
    sidebar_dashboard: {
        title: "Dashboard",
        url: "dashboard",
        icon: MdSpaceDashboard
    },
    sidebar_category: {
        title: "Category",
        items: [
            {
                title: "Electronics",
                url: ""
            },
            {
                title: "Watches",
                url: ""
            },
            {
                title: "Clothing",
                url: ""
            },
            {
                title: "Garage",
                url: ""
            },
            {
                title: "Sports",
                url: ""
            },
            {
                title: "Entertainment",
                url: ""
            }
        ]
    },
    sidebar_utilities: [
        {
            title: "Cart",
            url: "cart",
            icon: HiShoppingCart
        },
        {
            title: "Shipping",
            url: "shipping",
            icon: RiShip2Fill
        },
        {
            title: "Payment History",
            url: "payment_history",
            icon: MdPayments
        },
        {
            title: "Nex Store",
            url: "nex_store",
            icon: SiSinglestore
        },
    ]
};

export { sidebar_data };
