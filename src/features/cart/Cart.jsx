import React, { Fragment, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  deleteItemsFromCartAsync,
  selectCart,
  updateItemsAsync,
} from "./cartSlice";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { Dialog, Transition } from "@headlessui/react";
import { Link, Navigate, useLocation } from "react-router-dom";
import { selectLoggedInUser } from "../auth/authSlice";

export default function Cart({ handleOrder }) {
  const [open, setOpen] = useState(true);
  const dispatch = useDispatch();
  const location = useLocation();

  const items = useSelector(selectCart);
  const user = useSelector(selectLoggedInUser);

  const totalAmount = items.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );
  const totalItems = items.reduce((acc, item) => acc + item.quantity, 0);

  const handleQuantity = (e, item) => {
    dispatch(updateItemsAsync({ ...item, quantity: +e.target.value }));
  };

  return (
    <>
      {items.length ? (
        <div className="bg-white mt-8 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-semibold pt-4">Cart</h2>
          <div className="border-t border-gray-200 px-2 py-6 sm:px-4">
            <div className="flow-root">
              <ul className="-my-6 divide-y divide-gray-200">
                {items.map((item) => (
                  <li key={item.id} className="flex py-6">
                    <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
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
                            Qty
                          </label>
                          <select
                            onChange={(e) => handleQuantity(e, item)}
                            className="font-semibold text-sm"
                            value={item.quantity}>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="2">3</option>
                            <option value="2">4</option>
                          </select>
                        </div>

                        <div className="flex">
                          <button
                            onClick={() =>
                              dispatch(deleteItemsFromCartAsync(item.id))
                            }
                            type="button"
                            className="font-medium text-indigo-600 hover:text-indigo-500">
                            Remove
                          </button>
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
              <p>${items ? totalAmount : 0}</p>
            </div>
            <div className="flex justify-between my-2 text-base font-medium text-indigo-500">
              <p>Total Items in cart</p>
              <p>{items ? totalItems : 0} items</p>
            </div>
            <p className="mt-0.5 text-sm text-gray-500">
              Shipping and taxes calculated at checkout.
            </p>
            <div className="mt-6">
              <Link
                onClick={() =>
                  location.pathname === "/checkout" && handleOrder()
                }
                to={location.pathname === "/cart" && "/checkout"}
                className="flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700">
                {location.pathname === "/cart" ? "Checkout" : "Order Now"}
              </Link>
            </div>
            <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
              <p>
                or
                <Link to={"/"}>
                  <button
                    type="button"
                    className="font-medium text-indigo-600 hover:text-indigo-500"
                    onClick={() => setOpen(false)}>
                    Continue Shopping
                    <span aria-hidden="true"> &rarr;</span>
                  </button>
                </Link>
              </p>
            </div>
          </div>
        </div>
      ) : (
        <Navigate to={"/"} replace={true} />
      )}
    </>
  );
}
