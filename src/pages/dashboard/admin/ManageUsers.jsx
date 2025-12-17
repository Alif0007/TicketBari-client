import { useEffect, useState } from "react";
import axiosPublic from "../../../utils/axiosPublic";

const ManageUsers = () => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        axiosPublic.get("/users").then(res => setUsers(res.data));

    }, []);

    const changeRole = (id, role, email) => {
        axiosPublic.patch(`/users/${email}/role`, { role })
            .then(() => {
                setUsers(prev =>
                    prev.map(u => u._id === id ? { ...u, role } : u)
                );
            });
    };

    return (
        <table className="table">
            <tbody>
                {users.map(user => (
                    <tr key={user._id}>
                        <td>{user.name}</td>
                        <td>{user.role}</td>
                        <td>
                            <button onClick={() => changeRole(user._id, "admin", user.email)} className="btn btn-xs">Make Admin</button>
                            <button onClick={() => changeRole(user._id, "vendor", user.email)} className="btn btn-xs ml-2">Make Vendor</button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default ManageUsers