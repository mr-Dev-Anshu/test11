import React, { useState } from "react";
import { ImCross } from "react-icons/im";


const Discount = () => {
  const [toggle, setToggle] = useState(false)
  return (
    <div>

      {toggle ? <div className="flex items-center gap-2 ">
        <input
          className="p-3 bg-white w-20 font-semibold border rounded-md border-gray-300 focus:outline-none"
          type="number"
          defaultValue={0}
          placeholder="0"
        />
        <select className="p-3 text-sm bg-white w-30 font-semibold border rounded-md border-gray-300 focus:outline-none" name="" id="">
          <option value="%Off">% Off</option>
          <option value="">Flat Off </option>
        </select>
        <ImCross
          onClick={() =>
            setToggle(!toggle)
          }
          size={20}
        />
      </div> : <div onClick={() => setToggle(!toggle)} className="bg-blue-600 px-2 py-3 rounded-md text-white w-full "><button >Add discount</button></div>}
    </div>
  );
};

export default Discount;