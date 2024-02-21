import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

function CardsCol({ product, Mykey }) {
  let counter = useSelector((state) => state.counter);
  let dispatch = useDispatch();

  function add(e) {
    dispatch({ type: "ADD", id: e });
  }

  return (
    <div
      onClick={() => {
        add(product.id);
      }}
      key={Mykey}
    >
      <Link className="card" to={""}>
        <div className="px-4 pt-4">
          <img
            className="rounded-xl h-64 md:h-48 w-full object-cover"
            src={String(product.attributes.image)}
          />
        </div>
        <div className="text-center card-body items-center">
          <h2 className="capitalize card-title tracking-wider">
            {product.attributes.title}
          </h2>
          <span className="text-secondary dark:text-[#9367E7]">
            ${product.attributes.price}
          </span>
        </div>
      </Link>
    </div>
  );
}

export default CardsCol;
