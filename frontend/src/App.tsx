import AuthPage from "./Auth";
import AppLayoutExample from "./components/Layout";
import { useUserStore } from "./store/user.store";
import TodoPage from "./Todo";

export default function TodoApp() {
    const { user } = useUserStore();
    return <AppLayoutExample>{user ? <TodoPage /> : <AuthPage />}</AppLayoutExample>;
}
