import React from "react";
import Table2 from "../../../Components/Table2";
import Header from "../SideBar";
import { UsersData } from "../../../Data/MovieData";
import Footer from "../../../Layout/Footer/Footer";

function UsersList() {
  return (
    <div>
      <Header />
        <div className="flex flex-col gap-6">
          <h2 className="text-xl font-bold">Users</h2>

          <Table2 data={UsersData} users={true} />
        </div>
      <Footer />
    </div>
  );
}

export default UsersList;
