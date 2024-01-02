import { IoHome } from "react-icons/io5";
import { MenuItemsT } from "./types";
import { styleIcon } from "./styleIcon";
import { FaUserCog } from "react-icons/fa";
import { FaUserPlus } from "react-icons/fa6";
import { FaClipboardUser } from "react-icons/fa6";
import { HiUsers } from "react-icons/hi";

// user
export const menuItems: MenuItemsT[] = [
  {
    name: 'Dashboard',
    path: '/',
    icon: <IoHome style={styleIcon} />
  },
  {
    name: 'Profil',
    path: '/profil',
    icon: <FaUserCog style={styleIcon} />
  },
]

// admin
export const menuItemsAdmin: MenuItemsT[] = [
  {
    name: 'Dashboard',
    path: '/',
    icon: <IoHome style={styleIcon} />
  },
  {
    name: 'Profil',
    path: '/profil',
    icon: <FaUserCog style={styleIcon} />
  },
  {
    name: 'Register',
    path: null,
    icon: HiUsers,
    children:[
      {
        name: 'Daftarkan Admin',
        path: '/register/Admin',
        icon: <FaUserPlus style={styleIcon} />
      },
      {
        name: 'Tambah Karyawan',
        path: '/register/Karyawan',
        icon: <FaClipboardUser style={styleIcon} />
      }
    ]
  }
]