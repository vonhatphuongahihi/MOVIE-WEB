import React from "react";
import Table3 from "../../../Components/Table3";
import Header from "../SideBar";

function ShowsList() {
  return (
    <div>
      <Header />
      <div className="flex flex-col gap-6">
        <div className="flex-btn gap-2">
          <h2 className="text-xl font-bold">Movies List</h2>
          <button className="bg-main font-medium transitions hover:bg-subMain border border-subMain text-white py-3 px-6 rounded">
            Delete All
          </button>
        </div>

        <Table3 admin={true} />
      </div>
    </div>
  );
}

export default ShowsList;
