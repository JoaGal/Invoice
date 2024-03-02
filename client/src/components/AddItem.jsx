import { TrashIcon } from "@heroicons/react/24/solid";
import { InputCreateInvoice } from "./InputCreateInvoice";
import { useDispatch } from "react-redux";
import { deleteItem } from "../redux/slice/invoiceSlice";

export const AddItem = ({ item, index }) => {
  const dispatch = useDispatch();

  const onDelete = () => {
    dispatch(deleteItem(index));
  };
  return (
    <div>
      <div className=" flex dark:text-white justify-between items-center">
        <div className=" grid grid-cols-3 ">
          <div className=" flex px-2 py-2 flex-col">
            <InputCreateInvoice
              name="Item Name"
              value={item.name}
              nameInput="name"
              index={index}
            />
          </div>

          <div className=" flex px-2 py-2  flex-col">
            <InputCreateInvoice
              name="Qty."
              value={item.quantity}
              nameInput="quantity"
              type="number"
              index={index}
            />
          </div>

          <div className=" flex px-2 py-2  flex-col ">
            <InputCreateInvoice
              name="Price"
              value={item.price}
              nameInput="price"
              type="number"
              index={index}
            />
          </div>
        </div>
        <button onClick={onDelete}>
          <TrashIcon className=" text-gray-500 hover:text-red-500 cursor-pointer mt-4 h-6 w-6" />
        </button>
      </div>
    </div>
  );
};
