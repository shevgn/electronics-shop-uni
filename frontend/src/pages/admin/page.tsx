import Header from "@/components/header/Header";
import { RootState } from "@/store";
import { useSelector } from "react-redux";

export default function Admin() {
  const user = useSelector((state: RootState) => state.user);

  if (!user.user || !user.token) {
    return <div>Unauthorized</div>;
  }

  if (user.user.role !== "admin") {
    return <div>Access denied</div>;
  }

  return (
    <>
      <Header />
      <main className="h-screen w-screen">
        <div className="flex h-full items-center justify-center text-neutral-900">
          <h1 className="text-3xl">Admin Page</h1>
        </div>
      </main>
    </>
  );
}
