import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";

function Cart() {
  let [api, setApi] = useState(
    "https://strapi-store-server.onrender.com/api/products"
  );
  let [data, setData] = useState([]);

  let customers = useSelector((state) => state.customers);
  console.log(customers.customers);

  const { t, i18n } = useTranslation();

  useEffect(() => {
    let lang = localStorage.getItem("lang");
    if (lang) {
      i18n.changeLanguage(lang);
    }
  }, []);

  useEffect(() => {
    fetch(api)
      .then((res) => res.json())
      .then((data) => {
        setData(data);
        console.log(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [api]);
  console.log(data.data);
  return (
    <section className="align-element py-20 w-[1152px]">
      <div className="border-b border-base-300 pb-5">
        <h2 className="text-3xl font-medium tracking-wider capitalize">
          {customers.customers.length
            ? t("shoppingCart")
            : t("shoppingCartEmp")}
        </h2>
      </div>
      <div className="mt-8 grid gap-8 lg:grid-cols-12">
        <div className="lg:col-span-8">
          {customers.customers ? (
            data.data &&
            data.data.map((product) => {
              return (
                <>
                  {customers.customers.map((id, index) => {
                    return (
                      <>
                        {product.id == id && (
                          <article
                            key={index}
                            className="mb-12 flex flex-col gap-y-4 sm:flex-row flex-wrap border-b border-base-300 pb-6 last:border-b-0"
                          >
                            <img
                              src={String(product.attributes.image)}
                              alt=""
                              className="h-24 w-24 rounded-lg sm:h-32 sm:w-32 object-cover"
                            />
                            <div className="sm:ml-16 sm:w-48">
                              <h3 className="capitalize font-medium">
                                {product.attributes.title}
                              </h3>
                              <h4 className="mt-2 capitalize text-sm text-neutral-content">
                                {product.attributes.company}
                              </h4>
                              <p className="mt-4 text-sm capitalize flex items-center gap-x-2">
                                color :
                                <span
                                  className="badge badge-sm"
                                  style={{
                                    backgroundColor: "rgb(255, 87, 51)",
                                  }}
                                ></span>
                              </p>
                            </div>
                            <div className="sm:ml-12">
                              <div className="form-control max-w-xs">
                                <label htmlFor="amount" className="label p-0">
                                  <span className="label-text">Amount</span>
                                </label>
                                <select
                                  name="amount"
                                  id="amount"
                                  className="mt-2 select select-base select-bordered select-xs"
                                >
                                  <option value="1">1</option>
                                  <option value="2">2</option>
                                  <option value="3">3</option>
                                  <option value="4">4</option>
                                  <option value="5">5</option>
                                  <option value="6">6</option>
                                  <option value="7">7</option>
                                  <option value="8">8</option>
                                  <option value="9">9</option>
                                </select>
                              </div>
                              <button className="mt-2 link link-primary link-hover text-sm">
                                remove
                              </button>
                            </div>
                            <p className="font-medium sm:ml-auto">
                              ${product.attributes.price}
                            </p>
                          </article>
                        )}
                      </>
                    );
                  })}
                </>
              );
            })
          ) : (
            <span className="loading loading-ring loading-lg"></span>
          )}
        </div>
      </div>
    </section>
  );
}

export default Cart;
