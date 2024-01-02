import MenuBtn from "./MenuBtn";

export default function HeadNavbar() {
    return (
        <div className="flex items-center">
            {/* client component */}
            <MenuBtn />
            <div>
                <h1 className="text-blue-text text-xl"><strong>Manajemen Karyawan</strong></h1>
                <p className="text-slate-400 text-[0.83rem]"><small>Created by ©2023 Mohamad Ridwan Apriyadi.</small></p>
            </div>
        </div>
    )
}