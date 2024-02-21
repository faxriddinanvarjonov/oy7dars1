import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import "./products.css";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import CardsFlex from "../../components/cards/cardsFlex";
import CardsCol from "../../components/cards/cardsCol";

function Products() {
  let [api, setApi] = useState(
    "https://strapi-store-server.onrender.com/api/products"
  );
  let [data, setData] = useState([]);
  let [priceState, setPriceState] = useState(100000);
  let [notFound, setNotFound] = useState(false);

  let search = useRef("");
  let category = useRef("all");
  let company = useRef("all");
  let order = useRef("a-z");
  let price = useRef(100000);
  let shiping = useRef("off");

  let [prodDis, setProdDis] = useState(true);
  const { t, i18n } = useTranslation();

  useEffect(() => {
    let lang = localStorage.getItem("lang");
    if (lang) {
      i18n.changeLanguage(lang);
    }
  }, []);

  useEffect(() => {
    fetch(localStorage.getItem("api") ? localStorage.getItem("api") : api)
      .then((res) => res.json())
      .then((data) => {
        setData(data);
        data.data.length == 0 ? setNotFound(true) : setNotFound(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [api]);

  function handleSubmit(e) {
    e.preventDefault();
    console.log(
      search.current.value,
      category.current.value,
      company.current.value,
      order.current.value,
      price.current.value,
      shiping.current.value
    );

    setApi(
      `https://strapi-store-server.onrender.com/api/products?search=${search.current.value}&category=${category.current.value}&company=${company.current.value}&order=${order.current.value}&price=${price.current.value}`
    );
    localStorage.setItem(
      "api",
      `https://strapi-store-server.onrender.com/api/products?search=${search.current.value}&category=${category.current.value}&company=${company.current.value}&order=${order.current.value}&price=${price.current.value}`
    );
  }

  function handleShipping() {
    shiping.current.value == "off"
      ? (shiping.current.value = "on")
      : (shiping.current.value = "off");
  }

  function priceChange() {
    setPriceState(price.current.value);
  }

  function LinkChanger(e) {
    setApi(
      "https://strapi-store-server.onrender.com/api/products" + `?page=${e}`
    );
    console.log(e);
  }
  function handleClickFlex() {
    !prodDis == true && setProdDis(true);
  }
  function handleClickCol() {
    prodDis == true && setProdDis(false);
  }

  console.log("render");

  return (
    <>
      {data.data ? (
        <section className="align-element py-20">
          <form
            onSubmit={handleSubmit}
            className="bg-base-200 rounded-md px-8 py-4 grid gap-x-4  gap-y-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 items-center"
          >
            <div className="form-control">
              <label htmlFor="search" className="label">
                <span className="label-text capitalize">{t("search")}</span>
              </label>
              <input
                ref={search}
                type="search"
                name="search"
                id="search"
                className="input input-bordered input-sm lg:w-[260px]"
              />
            </div>
            <div className="form-control">
              <label htmlFor="category" className="label">
                <span className="label-text capitalize">{t("category")}</span>
              </label>
              <select
                ref={category}
                name="category"
                id="category"
                className="select select-bordered select-sm"
              >
                <option value="all" defaultValue={"z-a"}>
                  all
                </option>
                <option value="Tables">Tables</option>
                <option value="Chairs">Chairs</option>
                <option value="Kids">Kids</option>
                <option value="Sofas">Sofas</option>
                <option value="Beds">Beds</option>
              </select>
            </div>
            <div className="form-control">
              <label htmlFor="company" className="label">
                <span className="label-text capitalize">{t("company")}</span>
              </label>
              <select
                ref={company}
                name="company"
                id="company"
                className="select select-bordered select-sm"
              >
                <option value="all">all</option>
                <option value="Modenza">Modenza</option>
                <option value="Luxora">Luxora</option>
                <option value="Artifex">Artifex</option>
                <option value="Comfora">Comfora</option>
                <option value="Homestead">Homestead</option>
              </select>
            </div>
            <div className="form-control">
              <label htmlFor="order" className="label">
                <span className="label-text capitalize">{t("sort")}</span>
              </label>
              <select
                ref={order}
                name="order"
                id="order"
                className="select select-bordered select-sm"
              >
                <option>a-z</option>
                <option value="z-a">z-a</option>
                <option value="high">high</option>
                <option value="low">low</option>
              </select>
            </div>
            <div className="form-control">
              <label htmlFor="price" className="label cursor-pointer">
                <span className="label-text capitalize">{t("price")}</span>
                <span>${priceState}</span>
              </label>
              <input
                ref={price}
                type="range"
                name="price"
                min="0"
                max="100000"
                className="range range-primary range-sm"
                step="1000"
                defaultValue={100000}
                onChange={priceChange}
              />
              <div className="w-full flex justify-between text-xs px-2 mt-2">
                <span className="font-bold text-md">0</span>
                <span className="font-bold text-md">Max : $1,000.00</span>
              </div>
            </div>
            <div className="form-control items-center">
              <label htmlFor="shipping" className="label cursor-pointer">
                <span className="label-text capitalize">{t("freeShip")}</span>
              </label>
              <input
                ref={shiping}
                onChange={handleShipping}
                type="checkbox"
                name="shipping"
                className="checkbox checkbox-primary checkbox-sm"
              />
            </div>
            <button type="submit" className="btn btn-primary btn-sm uppercase">
              {t("searchBtn")}
            </button>
            <Link
              to={"/products"}
              onClick={() => {
                localStorage.removeItem("api");
                setApi(
                  "https://strapi-store-server.onrender.com/api/products?page=1"
                );
              }}
              className="btn btn-accent btn-sm uppercase"
            >
              {t("reset")}
            </Link>
          </form>
          <div className="flex justify-between items-center mt-8 border-b border-base-300 pb-5">
            <p className="font-medium text-md">
              {data.data
                ? data.data.length + ` ${t("products")}`
                : `? ${t("products")}`}
            </p>
            <div className="flex gap-x-2">
              <button
                onClick={handleClickFlex}
                type="button"
                className={
                  prodDis == true
                    ? "text-xl btn btn-circle btn-sm btn-primary text-primary-content"
                    : "text-xl btn btn-circle btn-sm btn-ghost text-based-content"
                }
              >
                <svg
                  stroke="currentColor"
                  fill="currentColor"
                  strokeWidth="0"
                  viewBox="0 0 16 16"
                  height="1em"
                  width="1em"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M1 2.5A1.5 1.5 0 0 1 2.5 1h3A1.5 1.5 0 0 1 7 2.5v3A1.5 1.5 0 0 1 5.5 7h-3A1.5 1.5 0 0 1 1 5.5v-3zm8 0A1.5 1.5 0 0 1 10.5 1h3A1.5 1.5 0 0 1 15 2.5v3A1.5 1.5 0 0 1 13.5 7h-3A1.5 1.5 0 0 1 9 5.5v-3zm-8 8A1.5 1.5 0 0 1 2.5 9h3A1.5 1.5 0 0 1 7 10.5v3A1.5 1.5 0 0 1 5.5 15h-3A1.5 1.5 0 0 1 1 13.5v-3zm8 0A1.5 1.5 0 0 1 10.5 9h3a1.5 1.5 0 0 1 1.5 1.5v3a1.5 1.5 0 0 1-1.5 1.5h-3A1.5 1.5 0 0 1 9 13.5v-3z"></path>
                </svg>
              </button>
              <button
                onClick={handleClickCol}
                type="button"
                className={
                  prodDis == false
                    ? "text-xl btn btn-circle btn-sm btn-primary text-primary-content"
                    : "text-xl btn btn-circle btn-sm btn-ghost text-based-content"
                }
              >
                <svg
                  stroke="currentColor"
                  fill="currentColor"
                  strokeWidth="0"
                  viewBox="0 0 16 16"
                  height="1em"
                  width="1em"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z"
                  ></path>
                </svg>
              </button>
            </div>
          </div>
          <div
            className={
              prodDis == true &&
              notFound == false &&
              "pt-12 md:grid-cols-2 lg:grid-cols-3  grid gap-4 "
            }
          >
            {notFound == true && (
              <h5 className="text-2xl mt-16">
                Sorry, no products matched your search...
              </h5>
            )}
            {prodDis == true
              ? data.data &&
                data.data.map((product, index) => {
                  return <CardsCol product={product} key={index} />;
                })
              : data.data &&
                data.data.map((product, index) => {
                  return <CardsFlex product={product} key={index} />;
                })}
          </div>
          <div className="wrapper mt-16 flex justify-end">
            <div className="join">
              <button
                onClick={() => {
                  LinkChanger(1);
                }}
                className="btn btn-xs sm:btn-md border-none join-item lg:w-[70px]"
              >
                1
              </button>
              <button
                onClick={() => {
                  LinkChanger(2);
                }}
                className="btn btn-xs sm:btn-md border-none join-item lg:w-[70px]"
              >
                2
              </button>
              <button
                onClick={() => {
                  LinkChanger(3);
                }}
                className="btn btn-xs sm:btn-md border-none join-item lg:w-[70px]"
              >
                3
              </button>
            </div>
          </div>
        </section>
      ) : (
        <span className="loading loading-ring loading-lg"></span>
      )}
    </>
  );
}

export default Products;

{
  /* <h1 key={index}>{product.attributes.title}</h1>; */
}
