import React from "react";
import Table1 from "../../../Components/Table1";
import Header from "../SideBar";

function MoviesList() {
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

        <Table1 admin={true} />
      </div>
    </div>
  );
}

export default MoviesList;
