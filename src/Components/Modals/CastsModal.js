import React from "react";
import Uploader from "../Uploader";
import { Input } from "../UsedInputs";
import MainModal from "./MainModal";

function CastsModal({ modalOpen, setModalOpen, cast }) {
  return (
    <MainModal modalOpen={modalOpen} setModalOpen={setModalOpen}>
      <div className="inline-block sm:w-4/5 border border-border md:w-3/5 lg:w-2/5 w-full align-middle p-10 overflow-y-auto h-full bg-main text-white rounded-2xl">
        <h2 className="text-3xl font-bold">
          {cast ? "Update Cast" : "Create Cast"}
        </h2>
        <form className="flex flex-col gap-6 text-left mt-6">
          <Input
            label="Cast Name"
            placeholder={cast ? cast.fullName : "John Doe"}
            type="text"
            bg={false}
          />
          <div className="flex flex-col gap-2">
            <p className="text-border font-semibold text-sm">Cast Image</p>
            <Uploder />
            <div className="w-32 h-32 p-2 bg-main border border-border rounded">
              <img
                src={`/images/${cast ? cast.image : "user.png"}`}
                alt={cast?.fullName}
                className="w-full h-full object-cover rounded"
              />
            </div>
          </div>
          <button
            onClick={() => setModalOpen(false)}
            className="w-full flex-rows gap-4 py-3 text-lg transitions hover:bg-dry border-2 border-subMain rounded bg-subMain text-white"
          >
            {cast ? "Update" : "Add"}
          </button>
        </form>
      </div>
    </MainModal>
  );
}

export default CastsModal;
