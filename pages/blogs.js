import axios from "axios";
import Head from "next/head";
import Link from "next/link";
import dynamic from "next/dynamic";
import React, { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
const Footer = dynamic(() => import("@/component/footer/footer2"));
const Header = dynamic(() => import("@/component/header/header"));
import style from "../styles/moduleCss/blog.module.css";
import { Input, Select, Space } from "antd";
import category from "../public/category.json";

const { Search } = Input;

const Blogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [data, setData] = useState([]);
  const [isloading, setIsLoading] = useState(false);
  const [keyword, setKeyword] = useState("");
  const [catKey, setCatKey] = useState("");

  async function getUser() {
    try {
      const response = await axios.get(
        `https://api-adbacklist.vercel.app/api/blogs?q=${keyword}`
      );
      const data = response.data.data.blogs;

      setBlogs(data);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.error(error);
    }
  }

  useEffect(() => {
    setIsLoading(true);
    getUser();
  }, [keyword]);

  useEffect(() => {
    if (catKey) {
      const data = blogs.filter((a) => a.category == catKey);
      setData(data);
    } else {
      const data = blogs.filter((a) => a.category);
      setData(data);
    }
  }, [catKey, isloading]);

  const itemsPerPage = 6;

  const [itemOffset, setItemOffset] = useState(0);
  const endOffset = itemOffset + itemsPerPage;
  const currentItems = data?.slice(itemOffset, endOffset);
  const pageCount = Math?.ceil(data?.length / itemsPerPage);

  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % blogs.length;
    setItemOffset(newOffset);
  };

  const onSearch = (e) => {
    setKeyword(e);
  };

  return (
    <div className="bg-gray-100">
      <Head>
        <link rel="icon" href="/logo.png" />
        <title>Blogs</title>
      </Head>
      <Header />
      <div className="w-11/12 m-auto mt-10 sm:w-12/12">
        <div className="w-full flex items-center justify-between p-2 bg-white">
          <div>
            <p className="text-xs sm:text-base">
              Showing 10 post of {blogs?.length}
            </p>
          </div>

          <div className="flex">
            <select
              className="p-1 rounded bg-white border mr-2 border-sky-300 select-info  max-w-xs"
              onChange={(e) => setCatKey(e.target.value)}
            >
              <option value={""}>Select Category</option>

              {category.map((a) => (
                <option value={a.name}>{a.name}</option>
              ))}
            </select>

            <Search
              placeholder="title or writer name"
              onSearch={(e) => onSearch(e)}
              enterButton
            />
          </div>
        </div>
        <hr />
        {isloading ? (
          <button className="btn loading bg-transparent lowercase border-0 m-auto w-full">
            loading
          </button>
        ) : (
          <>
            <div className={style.blogContainer}>
              <>
                {currentItems?.map((a) => (
                  <Link href={`/blog/${a._id}`} key={a._id}>
                    <div className={style.card}>
                      <img className={style.blogImage} src={a?.image} />
                  
                      <div className="p-2">
                        <div className="flex items-center">
                        {a?.category == "Adult" ? (
                          <span className={style.category}>
                            {" "}
                            {a?.category}{" "}
                          </span>
                        ) : (
                          ""
                        )}

                        {a?.category == "Dating" ||
                        a?.category == "Jobs" ||
                        a?.category == "Services" ? (
                          <span className={style.category1}>
                            {" "}
                            {a?.category}{" "}
                          </span>
                        ) : (
                          ""
                        )}

                        {a?.category == "Buy-Sell-Trade" ||
                        a?.category == "Community" ||
                        a?.category == "Automotive" ? (
                          <span className={style.category2}>
                            {" "}
                            {a?.category}{" "}
                          </span>
                        ) : (
                          ""
                        )}

                        {a?.category == "Real Estate" ||
                        a?.category == "Rentals" ||
                        a?.category == "Local Places" ? (
                          <span className={style.category3}>
                            {" "}
                            {a?.category}{" "}
                          </span>
                        ) : (
                          ""
                        )}
                        <p className="ml-2">{a.createdAt?.split("T")[0]?.split(".")[0]}</p>
                        </div>
                        <h1 className="sm:text-xl font-bold text-black">
                          {a?.title}
                        </h1>
                        <div className={style.cardFooter}>
     
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </>
            </div>
            <div className={`${style.pagination}`}>
              <ReactPaginate
                breakLabel="..."
                nextLabel="Next >"
                onPageChange={handlePageClick}
                pageRangeDisplayed={5}
                activeClassName="active"
                pageCount={pageCount}
                previousLabel="< Previous"
                renderOnZeroPageCount={null}
              />
            </div>
            <div className={`${style.pagination2}`}>
              <ReactPaginate
                breakLabel="..."
                nextLabel=">"
                onPageChange={handlePageClick}
                pageRangeDisplayed={5}
                activeClassName="active"
                pageCount={pageCount}
                previousLabel="<"
                renderOnZeroPageCount={null}
              />
            </div>
          </>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default Blogs;
