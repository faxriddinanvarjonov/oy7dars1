import React, { useEffect, useState } from "react";
import carouselItem1 from "../../assets/carouselItem1.webp";
import carouselItem2 from "../../assets/carouselItem2.webp";
import carouselItem3 from "../../assets/carouselItem3.webp";
import carouselItem4 from "../../assets/carouselItem4.webp";
import "./home.css";
import { Link, createPath } from "react-router-dom";
import { useTranslation } from "react-i18next";
import CardsCol from "../../components/cards/cardsCol";

function Home() {
  let [check, setCheck] = useState(
    localStorage.getItem("theme") == "dracula" ? true : false
  );
  let [api, setApi] = useState(
    "https://strapi-store-server.onrender.com/api/products"
  );
  let [data, setData] = useState([]);
  
  const [lang, setLang] = useState("uz");
  const { t, i18n } = useTranslation();

  useEffect(() => {
    document
      .querySelector("header")
      .setAttribute(
        "class",
        check == true ? "flex w-full bg-[#181920] dark" : "flex w-full "
      );
    let lang = localStorage.getItem("lang");
    if (lang) {
      i18n.changeLanguage(lang);
      setLang(lang);
    }
  }, []);

  function handleClickLang(e) {
    setLang(e.target.value);
    i18n.changeLanguage(e.target.value);
    localStorage.setItem("lang", e.target.value);
  }

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

  return (
    <>
      {data.data ? (
        <section className="align-element py-20">
          <div className="grid lg:grid-cols-2 gap-24 items-center max-w-[1152px]">
            <div>
              <h1 className="max-w-2xl text-4xl font-bold tracking-tight sm:text-6xl">
                {t("h1")}
              </h1>
              <p className="mt-8 max-w-xl text-lg leading-8">{t("lorem")}</p>
              <Link to={"/products"} className="btn btn-primary mt-10">
                {t("ourProd")}
              </Link>
            </div>
            <div className="hidden h-[28rem] lg:carousel carousel-center p-4 space-x-4 bg-neutral rounded-box ">
              <div className="carousel-item">
                <img
                  src={carouselItem1}
                  className="rounded-box h-full w-80 object-cover"
                />
              </div>
              <div className="carousel-item">
                <img
                  src={carouselItem2}
                  className="rounded-box h-full w-80 object-cover"
                />
              </div>
              <div className="carousel-item">
                <img
                  src={carouselItem3}
                  className="rounded-box h-full w-80 object-cover"
                />
              </div>
              <div className="carousel-item">
                <img
                  src={carouselItem4}
                  className="rounded-box h-full w-80 object-cover"
                />
              </div>
            </div>
          </div>
          <div className="pt-[100px]">
            <div className="border-base-300 border-b pb-[20px]">
              <h2 className="text-3xl capitalize font-medium tracking-wider">
                {t("feautProds")}
              </h2>
            </div>
          </div>
          <div className="pt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {data.data ? (
              data.data.map((product, index) => {
                return (
                  product.attributes.featured == true && (
                    <CardsCol product={product} key={index} />
                  )
                );
              })
            ) : (
              <span className="loading loading-ring loading-lg"></span>
            )}
          </div>
        </section>
      ) : (
        <>
          <span className="loading loading-ring loading-lg"></span>
        </>
      )}

      {/* <section className="align-element py-20">
        <div className="grid lg:grid-cols-2 gap-24 items-center max-w-[1152px]">
          <div>
            <h1 className="max-w-2xl text-4xl font-bold tracking-tight sm:text-6xl">
              {t("h1")}
            </h1>
            <p className="mt-8 max-w-xl text-lg leading-8">{t("lorem")}</p>
            <Link to={"/products"} className="btn btn-primary mt-10">
              {t("ourProd")}
            </Link>
          </div>
          <div className="hidden h-[28rem] lg:carousel carousel-center p-4 space-x-4 bg-neutral rounded-box ">
            <div className="carousel-item">
              <img
                src={carouselItem1}
                className="rounded-box h-full w-80 object-cover"
              />
            </div>
            <div className="carousel-item">
              <img
                src={carouselItem2}
                className="rounded-box h-full w-80 object-cover"
              />
            </div>
            <div className="carousel-item">
              <img
                src={carouselItem3}
                className="rounded-box h-full w-80 object-cover"
              />
            </div>
            <div className="carousel-item">
              <img
                src={carouselItem4}
                className="rounded-box h-full w-80 object-cover"
              />
            </div>
          </div>
        </div>
        <div className="pt-[100px]">
          <div className="border-base-300 border-b pb-[20px]">
            <h2 className="text-3xl capitalize font-medium tracking-wider">
              {t("feautProds")}
            </h2>
          </div>
        </div>
        <div className="pt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {data.data ? (
            data.data.map((product, index) => {
              return (
                product.attributes.featured == true && (
                  <CardsCol product={product} key={index} />
                )
              );
            })
          ) : (
            <span className="loading loading-ring loading-lg"></span>
          )}
        </div>
      </section> */}
    </>
  );
}

export default Home;
