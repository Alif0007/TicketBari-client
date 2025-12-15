import { useContext } from "react";
import { AuthContext } from "../../../authProvider/AuthProvider";


const VendorProfile = () => {
    const { user } = useContext(AuthContext);

    return (
        <div className="card bg-base-100 shadow-xl p-6 max-w-lg">
            <div className="flex items-center gap-4">
                <img
                    src={user?.photoURL}
                    alt="Vendor"
                    className="w-20 h-20 rounded-full"
                />
                <div>
                    <h2 className="text-xl font-bold">{user?.displayName}</h2>
                    <p>{user?.email}</p>
                    <span className="badge badge-primary mt-2">Vendor</span>
                </div>
            </div>
        </div>
    );
};

export default VendorProfile;
