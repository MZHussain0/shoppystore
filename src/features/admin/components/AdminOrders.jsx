import React, { useEffect, useState } from "react";
import { ITEMS_PER_PAGE } from "../../../app/cosntants";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAllOrdersAsync,
  selectOrders,
  selectTotalOrders,
  updateOrderAsync,
} from "../../order/orderSlice";
import { EyeIcon, PencilIcon } from "@heroicons/react/24/outline";

const AdminOrders = () => {
  const orders = useSelector(selectOrders);
  const totalOrders = useSelector(selectTotalOrders);
  const dispatch = useDispatch();
  const [page, setPage] = useState(1);
  const [editableOrderId, setEditableOrderId] = useState(-1);

  useEffect(() => {
    const pagination = { _page: page, _limit: ITEMS_PER_PAGE };
    dispatch(fetchAllOrdersAsync(pagination));
  }, [dispatch, page]);

  const handleEdit = (order) => {
    setEditableOrderId(order.id);
    console.log("edit");
  };
  const handleShow = () => {
    console.log("show");
  };
  const handleUpdate = (e, order) => {
    const updateOrder = { ...order, status: e.target.value };
    dispatch(updateOrderAsync(updateOrder));
    setEditableOrderId(-1);
  };

  const chooseColor = (status) => {
    switch (status) {
      case "dispatched":
        return "bg-purple-300 text-gray-700";
      case "delivered":
        return "bg-green-300 text-gray-700";
      case "cancelled":
        return "bg-rose-300 text-gray-700";
      default:
        return "bg-yellow-300 text-gray-700";
    }
  };

  return (
    <div className="overflow-x-auto">
      <div className=" flex items-center justify-center bg-gray-100 font-sans overflow-hidden">
        <div className="w-full ">
          <div className="bg-white shadow-md rounded my-6">
            <table className="min-w-max w-full table-auto">
              <thead>
                <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                  <th className="py-3 px-6 text-left">Order No.</th>
                  <th className="py-3 px-6 text-left">Items</th>
                  <th className="py-3 px-6 text-center">Total Amount</th>
                  <th className="py-3 px-6 text-center">Status</th>
                  <th className="py-3 px-6 text-center">Actions</th>
                </tr>
              </thead>
              <tbody className="text-gray-600 text-sm font-light">
                {orders?.map((order) => (
                  <tr
                    key={order.id}
                    className="border-b border-gray-200 hover:bg-gray-100">
                    <td className="py-3 px-6 text-left whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="mr-2"></div>
                        <span className="font-medium">{order.id}</span>
                      </div>
                    </td>
                    <td className="py-3 px-6 text-left">
                      {order.items?.map((item) => (
                        <div key={item.id} className="flex items-center">
                          <div className="mr-2">
                            <img
                              className="w-6 h-6 rounded-full"
                              src={item.thumbnail}
                              alt="item"
                            />
                          </div>
                          <span>
                            {item.title} - {item.quantity}
                          </span>
                        </div>
                      ))}
                    </td>
                    <td className="py-3 px-6 text-center">
                      <div className="flex items-center justify-center">
                        ${order.totalAmount}
                      </div>
                    </td>
                    <td className="py-3 px-6 text-center">
                      {editableOrderId === order.id ? (
                        <select
                          name=""
                          id=""
                          onChange={(e) => handleUpdate(e, order)}>
                          <option value="pending">Pending</option>
                          <option value="dispatched">Dispatched</option>
                          <option value="delivered">Delivered</option>
                          <option value="cancelled">Cancelled</option>
                        </select>
                      ) : (
                        <span
                          className={`${chooseColor(
                            order.status
                          )} py-1 px-3 rounded-full text-sm font-medium`}>
                          {order.status}
                        </span>
                      )}
                    </td>
                    <td className="py-3 px-6 text-center">
                      <div className="flex item-center justify-center">
                        <div className="w-4 mr-4 transform hover:text-indigo-500 hover:scale-110">
                          <EyeIcon
                            className="w-6 h-6"
                            onClick={(e) => handleShow(order)}
                          />
                        </div>
                        <div className="w-4 ml-2 transform hover:text-indigo-500 hover:scale-110">
                          <PencilIcon
                            className="w-6 h-6"
                            onClick={(e) => handleEdit(order)}
                          />
                        </div>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminOrders;
