/* eslint-disable @next/next/no-img-element */
import Head from "next/head";
import styles from "../styles/Home.module.css";
import Navbar from "../components/navbar";
import Cards from "../components/cards";
import { useEffect, useState, useMemo, useRef } from "react";
import Aos from "aos";
import "aos/dist/aos.css";

export default function Home() {
  const [data, setData] = useState([]);
  const [topData, setTopData] = useState([]);
  const [search, setSearch] = useState("");
  const [filterdItems, setFilterdItems] = useState([]);

  const handleFetchMemo = useMemo(() => {
    function handleFetch() {
      fetch("api/all")
        .then((res) => res.json())
        .then((datas) => {
          console.log(datas);
          setData(datas.offers);
          for (let i = 0; i < datas.offers.length; i++) {
            if (datas.offers[i].store) {
              setFilterdItems((s) => [...s, datas.offers[i]]);
            }
          }
        });

      fetch("top.json")
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          setTopData(data);
        });
    }
    return handleFetch();
  }, []);

  useEffect(() => {
    handleFetchMemo;
    Aos.init({
      offset: 200,
      duration: 600,
      easing: 'ease-in-sine',
      delay: 100,
    });
  }, [handleFetchMemo]);

  const handleSearch = filterdItems.filter((item) => {
    if (item.store.toString().toLowerCase().includes(search.toLowerCase()))
      return item;
  });

  const handleInputvalue = (e) => {
    setSearch(e.target.value);
  };

  return (
    <div className={styles.container}>
      
      <main className={styles.main}>
        <Navbar />
        <div className={styles.bubble}>
          <img src="/Assets/Images/cyborg.gif" data-aos="fade-right" alt="bubble" />
          <p data-aos="fade-up">buy more, Save more!</p>
          <img  src="/Assets/Images/cyborg2.gif" data-aos="fade-left" alt="bubble"/>
        </div>
        <div data-aos="fade-up" className={styles.heading}>
          <p>Most Trending Offers</p>
        </div>
        <div data-aos="fade-up" className={styles.cards}>
          {topData && topData.length > 0
            ? topData.map((card, id) => (
                <Cards
                data-aos="fade-up"
                  key={id}
                  name={card.name}
                  src={card.logo}
                  desc={card.description}
                  link={card.link}
                  code={card.code}
                />
              ))
            : null}
        </div>
        <div data-aos="fade-up" className={styles.searchBar}>
          <input
            type="text"
            placeholder="Search"
            value={search}
            onChange={handleInputvalue}
            className={styles.search}
          />
        </div>
        {search != "" &&
        search != null &&
        data &&
        data.length > 0 &&
        data != null ? (
          <>
            <div data-aos="fade-up" className={styles.heading}>
              <p>Your Desired Result...</p>
            </div>
            <div data-aos="fade-up" className={styles.grid} style={{ marginBottom: 20 + "rem"}}>
              {handleSearch && handleSearch.length > 0
                ? handleSearch.map((card, id) => (
                    <div data-aos="fade-up" key={id} className={styles.gridchild}>
                      <img
                        src={card.image_url}
                        alt={card.store}
                        className={styles.bgImg}
                      />
                      <h2>{card.store}</h2>
                      <p className={styles.desc}>
                        {card.offer_text}
                        <br />
                        {card.code != null && card.code != ""
                          ? "use"
                          : "get"}{" "}
                        at{" "}
                        <a
                          style={{ color: "antiquewhite" }}
                          href={card.merchant_homepage}
                        >
                          Here!
                        </a>
                      </p>
                    </div>
                  ))
                : null}
            </div>
          </>
        ) : null}
        <div data-aos="fade-up" className={styles.heading} style={{marginTop: 13 + 'rem'}}>
          <p>All Active Offers</p>
        </div>
        <div data-aos="fade-up" className={styles.grid}>
          {data && data.length > 0 && data != null ? (
            <>
              {data.map((card, id) => (
                <div data-aos="fade-up" key={id} className={styles.gridchild}>
                  <img
                    src={card.image_url}
                    alt={card.store}
                    className={styles.bgImg}
                  />
                  <h2>{card.store}</h2>
                  <p className={styles.desc}>
                    {card.offer_text}
                    <br />
                    {card.code != null && card.code != "" ? "use" : "get"}{" "}
                    {card.code} at{" "}
                    <a
                      style={{ color: "antiquewhite" }}
                      href={card.merchant_homepage}
                    >
                      Here!
                    </a>
                  </p>
                </div>
              ))}
            </>
          ) : (
            <h1>Loading Please Wait</h1>
          )}
        </div>
        <p>
          Made with ❤️ by{" "}
          <a href="https://meertarbani.dev" target="_blank" rel="noreferrer">
            Meer Tarbani
          </a>
        </p>
      </main>
    </div>
  );
}
