import React from "react";
import { Input } from "../UsedInputs";
import MainModal from "./MainModal";

function CategoryModal({ modalOpen, setModalOpen, category}) {
  return (
    <MainModal modalOpen={modalOpen} setModalOpen={setModalOpen}>
        <div className="inline-block sm:w-4/5 border border-border md:w-3/5 lg:w-2/5 w-full align-middle p-10 overflow-y-auto h-full bg-main text-white rounded-2xl">
        <h2 className='text-3xl font-bold'>{category ? "Update" : "Create"}</h2>
        <form className="flex flex-col gap-6 text-left mt-6">
            <Input
                label="Category Name"
                placeholder={category ? category.title : "Actions"}
                type="text"
                bg={false}
            />
            <button
            onClick={() => setModalOpen(false)} 
            className="w-full flex-rows gap-4 py-3 text-lg transitions hover:bg-dry border-2 border-subMain rounded bg-subMain text-white"
            >
              { category ? "Update" : "Add"}
            </button>
        </form>
        </div>
    </MainModal>
  );
}

export default CategoryModal;