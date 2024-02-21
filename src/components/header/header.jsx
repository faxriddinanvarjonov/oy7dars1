import React, { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import "./header.css";

function Header() {
  let [check, setCheck] = useState(
    localStorage.getItem("theme") == "dracula" ? true : false
  );
  let [theme, setTheme] = useState(
    localStorage.getItem("theme") ? localStorage.getItem("theme") : "winter"
  );
  const [lang, setLang] = useState("en");
  const { t, i18n } = useTranslation();

  useEffect(() => {
    let lang = localStorage.getItem("lang");
    lang && i18n.changeLanguage(lang);
    setLang(lang);
  }, []);
  function changeLang(e) {
    setLang(e.target.value);
    i18n.changeLanguage(e.target.value);
    localStorage.setItem("lang", e.target.value);
  }

  useEffect(() => {
    localStorage.setItem("theme", theme);
    document.querySelector("html").setAttribute("data-theme", theme);
    check ? (checkID.checked = true) : (checkID.checked = false);
  }, [theme]);

  function checkBox() {
    setCheck(!check);
    if (theme == "winter") {
      setTheme("dracula");
    } else {
      setTheme("winter");
    }
  }

  let customers = useSelector((state) => state.customers);
  console.log(customers.customers);

  return (
    <header
      className={
        check == true ? "flex w-full bg-[#181920] dark" : "flex w-full "
      }
    >
      <nav className="flex w-[1152px] py-2 px-9 lg:px-0 h-[67px] items-center justify-between">
        <div className="dropdown lg:hidden">
          <div tabIndex={0} role="button">
            <svg
              stroke="currentColor"
              fill="currentColor"
              strokeWidth="0"
              viewBox="0 0 512 512"
              className="h-6 w-6"
              height="1em"
              width="1em"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M0 96C0 78.3 14.3 64 32 64H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32C14.3 128 0 113.7 0 96zM64 256c0-17.7 14.3-32 32-32H480c17.7 0 32 14.3 32 32s-14.3 32-32 32H96c-17.7 0-32-14.3-32-32zM448 416c0 17.7-14.3 32-32 32H32c-17.7 0-32-14.3-32-32s14.3-32 32-32H416c17.7 0 32 14.3 32 32z"></path>
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52"
          >
            <li>
              <NavLink className="linkHover flex py-2 px-4 rounded-lg" to={"/"}>
                {t("home")}
              </NavLink>
            </li>
            <li>
              <NavLink
                className="linkHover flex py-2 px-4 rounded-lg"
                to={"/about"}
              >
                {t("about")}
              </NavLink>
            </li>
            <li>
              <NavLink
                className="linkHover flex py-2 px-4 rounded-lg"
                to={"/products"}
              >
                {t("products")}
              </NavLink>
            </li>{" "}
            <li>
              <NavLink
                className="linkHover flex py-2 px-4 rounded-lg"
                to={"/cart"}
              >
                {t("Cart")}
              </NavLink>
            </li>
          </ul>
        </div>
        <div className="items-center justify-center  cursor-pointer  leading-4 font-semibold hidden lg:flex">
          <Link
            className="btn btn-primary h-[48px] rounded-xl text-3xl"
            to={"/"}
          >
            C
          </Link>
        </div>
        <div className="hidden lg:flex">
          <NavLink className="linkHover flex py-2 px-4 rounded-lg" to={"/"}>
            {t("home")}
          </NavLink>
          <NavLink
            className="linkHover flex py-2 px-4 rounded-lg"
            to={"/about"}
          >
            {t("about")}
          </NavLink>
          <NavLink
            className="linkHover flex py-2 px-4 rounded-lg"
            to={"/products"}
          >
            {t("products")}
          </NavLink>
          <NavLink className="linkHover flex py-2 px-4 rounded-lg" to={"/cart"}>
            {t("cart")}
          </NavLink>
        </div>
        <div className="flex items-center justify-center">
          <label className="flex">
            <label className="swap swap-rotate flex items-center ">
              <input id="checkID" type="checkbox" onChange={checkBox} />
              <svg
                className={
                  check
                    ? "swap-on fill-current w-[23px] h-[23px] flex items-center justify-center text-emerald-50"
                    : "swap-on fill-current w-[23px] h-[23px] flex items-center justify-center"
                }
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
              >
                <path d="M8 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM8 0a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 0zm0 13a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 13zm8-5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2a.5.5 0 0 1 .5.5zM3 8a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2A.5.5 0 0 1 3 8zm10.657-5.657a.5.5 0 0 1 0 .707l-1.414 1.415a.5.5 0 1 1-.707-.708l1.414-1.414a.5.5 0 0 1 .707 0zm-9.193 9.193a.5.5 0 0 1 0 .707L3.05 13.657a.5.5 0 0 1-.707-.707l1.414-1.414a.5.5 0 0 1 .707 0zm9.193 2.121a.5.5 0 0 1-.707 0l-1.414-1.414a.5.5 0 0 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .707zM4.464 4.465a.5.5 0 0 1-.707 0L2.343 3.05a.5.5 0 1 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .708z"></path>
              </svg>
              <svg
                className="swap-off fill-current w-[23px] h-[23px] flex items-center justify-center"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
              >
                <path d="M6 .278a.768.768 0 0 1 .08.858 7.208 7.208 0 0 0-.878 3.46c0 4.021 3.278 7.277 7.318 7.277.527 0 1.04-.055 1.533-.16a.787.787 0 0 1 .81.316.733.733 0 0 1-.031.893A8.349 8.349 0 0 1 8.344 16C3.734 16 0 12.286 0 7.71 0 4.266 2.114 1.312 5.124.06A.752.752 0 0 1 6 .278z"></path>
              </svg>
            </label>
            <select
              onChange={changeLang}
              value={lang}
              className="select select-primary w-25 max-w-xs ml-5"
            >
              <option value="en">en</option>
              <option value="ru">ru</option>
              <option value="uz">uz</option>
            </select>
            <Link
              className="btn btn-ghost btn-circle btn-md ml-4 active"
              to={"/cart"}
            >
              <div className="indicator">
                <svg
                  stroke="currentColor"
                  fill="currentColor"
                  strokeWidth="0"
                  viewBox="0 0 16 16"
                  className="h-6 w-6"
                  height="1em"
                  width="1em"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .49.598l-1 5a.5.5 0 0 1-.465.401l-9.397.472L4.415 11H13a.5.5 0 0 1 0 1H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zM3.102 4l.84 4.479 9.144-.459L13.89 4H3.102zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"></path>
                </svg>
                <span className="badge badge-sm badge-primary indicator-item">
                  {customers.customers ? customers.customers.length : 0}
                </span>
              </div>
            </Link>
          </label>
        </div>
      </nav>
    </header>
  );
}

export default Header;
