import { create } from "zustand";
import { jwtDecode } from "jwt-decode";

type userType = {
    id: string;
    name: string;
    email: string;
    userType: "normal" | "premium";
};

type Store = {
    user: null | userType;
    update_user: (payload: null | userType) => void;
};

const getToken = localStorage.getItem("token");

export const useUserStore = create<Store>()((set) => ({
    user: getToken ? jwtDecode(getToken) : null,
    update_user: (payload: null | userType) => set(() => ({ user: payload })),
}));
