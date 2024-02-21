import React from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";

function CardsFlex({ product, Mykey }) {
  let dispatch = useDispatch();

  function add(e) {
    dispatch({ type: "ADD", id: e });
    console.log(e);
  }

  return (
    <div
      onClick={() => {
        add(product.id);
      }}
      key={Mykey}
      className="mt-12 grid gap-y-8"
    >
      <Link
        to={""}
        element={<h1>hi</h1>}
        className="flex flex-col p-8 rounded-lg flex-wrap bg-base-100 shadow-xl sm:flex-row gap-y-4 hover:shadow-2xl duration-300 group"
      >
        <img
          src={product.attributes.image}
          alt={product.attributes.title}
          className="h-24 w-24 rounded-lg sm:h-32 sm:w-32 object-cover group-hover:scale-105 transition duration-300"
        />
        <div className="ml-0 sm:ml-16">
          <h2 className="font-medium text-lg capitalize">
            {product.attributes.title}
          </h2>
          <h3 className="capitalize text-md text-neutral-content">
            {product.attributes.company}
          </h3>
        </div>
        <span className="ml-0 sm:ml-auto font-medium text-lg">
          ${product.attributes.price}
        </span>
      </Link>
    </div>
  );
}

export default CardsFlex;
