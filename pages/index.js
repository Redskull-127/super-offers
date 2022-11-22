/* eslint-disable @next/next/no-img-element */
import Head from "next/head";
import styles from "../styles/Home.module.css";
import Navbar from "../components/navbar";
import Cards from "../components/cards";
import { useEffect, useState, useMemo } from "react";

export default function Home() {
  const [data, setData] = useState([]);
  const [topData, setTopData] = useState([]);
  const [search, setSearch] = useState("");
  const [filterdItems, setFilterdItems] = useState([]);

  //UseMemo for handleFetch function
  const handleFetchMemo = useMemo(() => {
    function handleFetch() {
      fetch("data.json")
        .then((res) => res.json())
        .then((datas) => {
          console.log(datas);
          setData(datas.offers);
          for(let i=0; i<datas.offers.length; i++){
            if(datas.offers[i].store){
              setFilterdItems((s) => [...s, datas.offers[i]])
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
  }, [handleFetchMemo]);


  const handleSearch = filterdItems.filter((item) => {
    if(item.store.toString().toLowerCase().includes(search.toLowerCase())) return item;
  })

  const handleInputvalue = (e) => {
    setSearch(e.target.value);
  };

  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <Navbar />
        <div className={styles.heading}>
          <p>Most Trending Offers</p>
        </div>
        <div className={styles.cards}>
          {topData && topData.length > 0
            ? topData.map((card, id) => (
                <Cards
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
        <div className={styles.searchBar}>
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
          <><div className={styles.heading}>
              <p>Your Desired Result...</p>
            </div><div className={styles.grid} style={{ marginBottom: 20 + 'rem' }}>
                {handleSearch && handleSearch.length > 0
                  ? handleSearch.map((card, id) => (
                    <div key={id} className={styles.gridchild}>
                      <img
                        src={card.image_url}
                        alt={card.store}
                        className={styles.bgImg} />
                      <h2>{card.store}</h2>
                      <p className={styles.desc}>
                        {card.offer_text}
                        <br />
                        {card.code != null && card.code != ""
                          ? "use"
                          : "get"} at{" "}
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
              </div></>
        ) : null}
        <div className={styles.heading}>
          <p>All Active Offers</p>
        </div>
        <div className={styles.grid}>
          {data && data.length > 0 && data != null ? (
            <>
              {data.map((card, id) => (
                <div key={id} className={styles.gridchild}>
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
                      : "get"} {card.code} at{" "}
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
        <p>Made with ❤️ by <a href="https://meertarbani.dev" target='_blank' rel="noreferrer" >Meer Tarbani</a></p>
      </main>
    </div>
  );
}