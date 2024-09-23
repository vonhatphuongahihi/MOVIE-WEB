import React, { useState } from "react";
import { FaCirclePlus } from "react-icons/fa6";
import CategoryModal from "../../../Components/Modals/CategoryModal";
import Table2 from "../../../Components/Table2";
import { CategoriesData } from "../../../Data/CategoriesData";
import SideBar from "../SideBar";

function Categories() {
  const [modalOpen, setModalOpen] = useState(false);
  return (
    <SideBar>
      <CategoryModal 
      modalOpen={modalOpen} 
      setModalOpen={setModalOpen} 
      />
      <div className="flex flex-col gap-6">
        <div className="flex-btn gap-2">
          <h2 className="text-xl font-bold">Categories</h2>
          <button 
            onClick={() => setModalOpen(true)}
            className="bg-subMain flex-rows gap-4 font-medium transitions hover:bg-main border border-subMain text-white py-2 px-4 rounded"
          >
            <FaCirclePlus />            Create
          </button>
        </div>

        <Table2 
          data={CategoriesData} 
          users={false} 
        />
      </div>
    </SideBar>
  );
}

export default Categories;
