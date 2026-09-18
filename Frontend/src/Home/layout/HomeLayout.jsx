import { Outlet } from "react-router-dom";
import HeaderHome from "../components/HeaderHome";

function HomeLayout() {
  return (
    <div className="home-layout">
      <HeaderHome />
      <main className="home-main">
        <Outlet />
      </main>
    </div>
  );
}

export default HomeLayout;
