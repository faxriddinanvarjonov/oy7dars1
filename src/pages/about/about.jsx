import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import "./about.css";

function About() {
  const { t, i18n } = useTranslation();

  useEffect(() => {
    let lang = localStorage.getItem("lang");
    if (lang) {
      i18n.changeLanguage(lang);
    }
  }, []);

  return (
    <section className="align-element py-20">
      <div className="flex flex-wrap gap-2 sm:gap-x-6 items-center justify-center">
        <h1 className="text-4xl font-bold leading-none tracking-tight sm:text-6xl">
          {t("weLove")}
        </h1>
        <div className="stats bg-primary shadow">
          <div className="stat">
            <p className="stat-title text-primary-content text-4xl font-bold tracking-widest">
              comfy
            </p>
          </div>
        </div>
      </div>
      <p className="mt-6 text-lg leading-8 max-w-2xl mx-auto">{t("lorem")}</p>
    </section>
  );
}

export default About;
