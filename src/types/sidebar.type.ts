import { IconType } from "react-icons/lib"



type SidebarProfileType = {
    fullname:string,
    username:string,
}

type ItemType = {
    title:string,
    url:string,
}

type SidebarCategoryType = {
    title:string,
    items:ItemType[]
}

type SidebarUtilityType = {
    title:string,
    url:string,
    icon:IconType
}


type SidebarDataType = {
    sidebar_profile:SidebarProfileType,
    sidebar_dashboard:SidebarUtilityType,
    sidebar_category:SidebarCategoryType,
    sidebar_utilities:SidebarUtilityType[]
}


export type {
    SidebarDataType
}