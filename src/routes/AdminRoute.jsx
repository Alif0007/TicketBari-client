import { Navigate } from "react-router";
import useAuth from "../hooks/useAuth";
import { useEffect, useState } from "react";
import axiosPublic from "../utils/axiosPublic";

export default function AdminRoute({ children }) {
    const { user, loading } = useAuth();

    const [role, setRole] = useState("")

    useEffect(() => {
        axiosPublic.get(`users/${user.email}/role`)
            .then(res => setRole(res.data.role))
    }, [user.email])


    if (loading) return <div className="text-center">Loading...</div>;

    if (role !== "admin") {
        return <div>Lorem ipsum dolor sit amet consectetur adipisicing elit. Mollitia non dolorem repellat facere voluptatem molestiae minima, molestias quas earum quia illo, ad voluptate impedit eius velit obcaecati amet vel nesciunt ut corporis. Eos officiis ut exercitationem nulla repellendus. Maxime, odit exercitationem non aspernatur obcaecati itaque deserunt dignissimos harum, asperiores, laborum voluptas! Quasi repellat voluptate dignissimos voluptates beatae assumenda eaque eum doloremque voluptatum ea. Accusamus culpa recusandae quibusdam quasi laudantium obcaecati et tempora itaque quis repellat error, dolores, eligendi ex corporis, aliquam a. Rem, eveniet cumque quis explicabo distinctio quia porro in pariatur sapiente suscipit, doloremque labore? Iusto vero adipisci illum.</div>;
    }

    return children;
}
