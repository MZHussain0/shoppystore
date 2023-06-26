import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchLoggedInUserOrdersAsync,
  selectUserInfo,
  selectUserOrders,
} from "../profileSlice";
import { Link } from "react-router-dom";

const UserOrders = () => {
  const dispatch = useDispatch();
  const user = useSelector(selectUserInfo);

  useEffect(() => {
    dispatch(fetchLoggedInUserOrdersAsync(user.id));
  }, [dispatch, user]);

  const orders = useSelector(selectUserOrders);
  return (
    <>
      {orders?.map((order) => (
        <div key={order.id}>
          <div className="bg-white mt-8 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <h2 className="text-xl font-semibold pt-4">Order #{order.id}</h2>
            <h3 className="text-lg font-semibold text-pink-500">
              Order Status : {order.status}
            </h3>
            <div className="border-t border-gray-200 px-2 py-4 sm:px-4">
              <div className="flow-root">
                <ul className="-my-6 divide-y divide-gray-200">
                  {order.items.map((item) => (
                    <li key={item.id} className="flex py-4">
                      <div className="h-20 w-20 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                        <img
                          src={item.thumbnail}
                          alt={item.title}
                          className="h-full w-full object-cover object-center"
                        />
                      </div>

                      <div className="ml-4 flex flex-1 flex-col">
                        <div>
                          <div className="flex justify-between text-base font-medium text-gray-900">
                            <h3>
                              <a href={item.href}>{item.title}</a>
                            </h3>
                            <p className="ml-4">${item.price}</p>
                          </div>
                          <p className="mt-1 text-sm text-gray-500">
                            {item.brand}
                          </p>
                        </div>
                        <div className="flex flex-1 items-end justify-between text-sm">
                          <div className="text-gray-500">
                            <label
                              htmlFor="quantity"
                              className="mr-2 text-lg font-medium leading-6 text-gray-900">
                              Qty - {item.quantity}
                            </label>
                          </div>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
              <div className="flex justify-between my-2 text-base font-medium text-gray-900">
                <p>Subtotal</p>
                <p>${order.items ? order.totalAmount : 0}</p>
              </div>
              <div className="flex justify-between my-2 text-base font-medium text-indigo-500">
                <p>Total Items in cart</p>
                <p>{order.items ? order.totalItems : 0} items</p>
              </div>
            </div>
          </div>
        </div>
      ))}
      <div className="mt-6 pb-8 flex justify-center text-center text-sm text-gray-500">
        <Link to={"/"}>
          <button
            type="button"
            className="font-medium text-indigo-600 hover:text-indigo-500">
            Continue to homepage
            <span aria-hidden="true"> &rarr;</span>
          </button>
        </Link>
      </div>
    </>
  );
};

export default UserOrders;
