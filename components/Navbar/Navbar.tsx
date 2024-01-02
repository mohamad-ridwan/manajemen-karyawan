import HeadNavbar from "./HeadNavbar/HeadNavbar";
import ProfilIcon from "./ProfilIcon/ProfilIcon";

export default function Navbar(){
    return (
        <div className="flex flex-wrap justify-between w-full">
            <HeadNavbar/>
            <ProfilIcon/>
        </div>
    )
}