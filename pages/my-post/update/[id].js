import e from "next/head";
import t from "next/dynamic";
import { useRouter as o } from "next/router";
import a, { useEffect as r, useRef as l, useState as i } from "react";
let Footer = t(() => import("@/component/footer/footer")),
  Header = t(() => import("@/component/header/header"));
import n from "../../../styles/moduleCss/addPost.module.css";
import m from "sweetalert2";
import s from "js-cookie";
import u from "jwt-decode";
import { message as d, Upload, Modal } from "antd";
import y from "../../../public/category.json";
import { AiFillPlusCircle } from "react-icons/ai";
import x from "@/component/user";
import axios from "axios";
import Link from "next/link";
import Swal from "sweetalert2";
let initialState = {
    name: "",
    phone: "",
    email: "",
    category: "",
    subCategory: "",
    imgOne: "",
    imgTwo: "",
    imgThree: "",
    imgFour: "",
    city: "",
    month: "",
    cities: "",
    link: "",
    age: "",
    posterId: "",
    isPremium: !1,
    error: "",
    description: "",
  },
  beforeUpload = (e) => {
    let t = "image/jpeg" === e.type || "image/png" === e.type;
    if (!t) {
      d.error("You can only upload JPG/PNG file!");
      return;
    }
    let o = e.size / 1024 / 1024 < 2;
    if (!o) {
      d.error("Image must smaller than 2MB!");
      return;
    }
    return t && o;
  },
  getBase64 = (e) =>
    new Promise((t, o) => {
      let a = new FileReader();
      a.readAsDataURL(e),
        (a.onload = () => t(a.result)),
        (a.onerror = (e) => o(e));
    }),
  Post = () => {
    const [loading, setLoading] = i(false);
    let e = o(),
      { users } = x(),
      [a, l] = i(initialState),
      [d, g] = i(!1),
      [local, setLocal] = i(0),
      b = (e) => {
        l({ ...a, [e.type]: e.payload });
      },
      f = s.get("token");
    r(() => {
      let e = u(f);
      l({ ...a, posterId: e?._id });
    }, []);

    let [h, w] = i(!1),
      [_, P] = i(""),
      [j, T] = i(""),
      [O, S] = i([]),
      k = () => w(!1),
      v = async (e) => {
        e.url || e.preview || (e.preview = await getBase64(e.originFileObj)),
          P(e.url || e.preview),
          w(!0),
          T(e.name || e.url.substring(e.url.lastIndexOf("/") + 1));
      },
      C = ({ fileList: e }) => {
        S(e);
      },
      F = y.find((e) => e.name == a.category);

    r(() => {
      if (e.query.name?.[0] == "multiple-city-ads") {
        let e = JSON.parse(localStorage?.getItem("cities"));
        if (e == null) {
          setLocal("null");
          return;
        } else {
          setLocal(e?.length * 0.5);
        }
      }
      if (e.query.name?.[0] == "local-ads") {
        setLocal(0.5);
      }
      if (e.query.name?.[0] == "free-ads") {
        setLocal(0.0);
      }
    }, [e.query.name]);

    async function posts(id) {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/products/${id}`,
          {
            method: "GET",
          }
        );

        const newPost = response.data.data.product;
        console.log(newPost);
        setLoading(false);
        l({
          ...a,
          imgOne: newPost.imgOne,
          imgTwo: newPost.imgTwo,
          imgThree: newPost.imgThree,
          imgFour: newPost.imgFour,
          name: newPost.name,
          phone: newPost.phone,
          email: newPost.email,
          category: newPost.category,
          subCategory: newPost.subCategory,
          city: newPost.city,
          link: newPost.link,
          cities: newPost.cities,
          age: newPost.age,
          isPremium: newPost.isPremium,
          posterId: newPost.posterId,
          description: newPost.description,
        });
        S([
          { name : "img One" , url: newPost.imgOne },
          { name : "img Two"  , url: newPost.imgTwo },
          {name : "img Three" , url: newPost.imgThree },
          { name : "img Four"  ,url: newPost.imgFour },
        ]);
      } catch (error) {
        console.error(error);
      }
    }

    r(() => {
      setLoading(true);
      if (e.query.id) {
        posts(e.query.id);
      }
    }, [e?.query]);




    let q = async (t) => {
        // g(!0);
        let o = { ...a },
          r = new FormData();


        if (O[0]) {
          if (O[0].originFileObj == undefined) {
            o.imgOne = O[0].url 
          } else {
            r.append("images", O[0].originFileObj);
            await fetch("http://localhost:5000/api/image/upload-file", {
              method: "POST",
              body: r,
            })
              .then((e) => e.json())
              .then((e) => {
                console.log(e);
                o.imgOne = e.payload.url;
              });
          }
        }else if(!O[0]){
            o.imgOne = "empty";
        }
        
        if (O[1]) {
          if (O[1].originFileObj == undefined) {
            o.imgTwo = O[1].url ;
          } else {
            r.append("images", O[1].originFileObj);
            await fetch("http://localhost:5000/api/image/upload-file", {
              method: "POST",
              body: r,
            })
              .then((e) => e.json())
              .then((e) => {
                console.log(e);
                o.imgTwo = e.payload.url;
              });
          }
        }else if(!O[1]){
            o.imgTwo = "empty";
        }

        if (O[2]) {
          if (O[2].originFileObj == undefined) {
            o.imgThree =O[2].url ;
          } else {
            r.append("images", O[2].originFileObj);
            await fetch("http://localhost:5000/api/image/upload-file", {
              method: "POST",
              body: r,
            })
              .then((e) => e.json())
              .then((e) => {
                console.log(e);
                o.imgThree = e.payload.url;
              });
          }
        }else if(!O[2]){
            o.imgThree = "empty";
        }

        if (O[3]) {
          if (O[3].originFileObj == undefined) {
            o.imgFour = O[3].url ;
          } else {
            r.append("images", O[3].originFileObj);
            await fetch("http://localhost:5000/api/image/upload-file", {
              method: "POST",
              body: r,
            })
              .then((e) => e.json())
              .then((e) => {
                console.log(e);
                o.imgFour = e.payload.url;
              });
          }
        }else if(!O[3]){
            o.imgFour = "empty";
        }

        const options = {
            headers: {
              "content-type": "application/json",
            },
          };

        await axios
        .patch(
          `http://localhost:5000/api/products/${e.query.id}`,
          o,
          options
        )
        .then((res) => {
         console.log(res)
          if (res.data.status == "success") {
            Swal.fire({
              position: "top-center",
              icon: "success",
              title: "Your Profile has been updated",
              showConfirmButton: false,
              timer: 1500,
            })
            .then((t) => {
                e.push("/dashboard")
            });
          }
        });
 },

      B = (
        <div>
          <AiFillPlusCircle className="text-2xl sm:text-4xl m-auto" />

          <div style={{ marginTop: 8 }}>Upload</div>
        </div>
      );

    return (
      <div>
        <e>
          <title>Post Ads</title>

          <link rel="icon" href="/logo.png" />
        </e>
        <Header></Header>

        <div className="bg-gray-100 p-5">
          <div className="bg-white p-5 ">
            <h1 className="text-black font-bold text-2xl">Edit Post</h1>

            <hr />

            <p className="text-black text-xs text-right">
              {" "}
              Only 2 images can be changed. max size 2MB each
            </p>

            <div>
              <div>
                {loading ? (
                  <p className="text-center">loading images</p>
                ) : (
                  <div className={n.imageContainer}>
                    <Upload
                      action={!1}
                      listType="picture-card"
                      fileList={O}
                      beforeUpload={beforeUpload}
                      onPreview={v}
                      onChange={C}
                    >
                      {O.length >= 4 ? null : B}
                    </Upload>

                    <Modal open={h} title={j} footer={null} onCancel={k}>
                      <img alt="example" style={{ width: "100%" }} src={_} />
                    </Modal>
                  </div>
                )}
              </div>

              <div className={n.formDiv}>
                <label className="text-black font-bold text-xs sm:text-xl mb-5">
                  Title :
                  <br />
                  <input
                    onChange={(e) =>
                      b({ type: "name", payload: e.target.value })
                    }
                    type="text"
                    placeholder={a?.name}
                    className="input bg-gray-50  w-full "
                  />
                </label>

                <label className="text-black font-bold text-xs sm:text-xl mb-5">
                  Phone :
                  <br />
                  <input
                    type="number"
                    onChange={(e) =>
                      b({ type: "phone", payload: e.target.value })
                    }
                    placeholder={a?.phone}
                    className="input bg-gray-50  w-full "
                  />
                </label>

                <label className="text-black font-bold text-xs sm:text-xl">
                  Email :
                  <br />
                  <input
                    type="email"
                    
                    onChange={(e) =>
                      b({ type: "email", payload: e.target.value })
                    }
                    placeholder={a?.email}
                    className="input bg-gray-50 w-full "
                  />
                </label>

                <label className="text-black font-bold text-xs sm:text-xl">
                  Social Link :
                  <br />
                  <input
                    type="text"
                    onChange={(e) =>
                      b({ type: "link", payload: e.target.value })
                    }
                    placeholder={a?.link}
                    className="input bg-gray-50 w-full "
                  />
                </label>

                <label className="text-black font-bold text-xs sm:text-xl">
                  Your Age :
                  <br />
                  <input
                    type="number"
                    onChange={(e) =>
                      b({ type: "age", payload: e.target.value })
                    }
                    placeholder={a?.age}
                    className="input bg-gray-50  w-full "
                  />
                </label>
              </div>

              <br />

              <div className={n.formDiv}>
                <label className="text-black font-bold text-xs sm:text-xl">
                  Category :
                  <br />
                  <select
                    name="category"
                    id="category"
                    onChange={(e) =>
                      b({ type: "category", payload: e.target.value })
                    }
                    className="input bg-gray-50 w-full"
                  >
                    <option value="category">{a?.category}</option>

                    {y?.map((e) => (
                      <option value={e?.name}>{e?.name}</option>
                    ))}
                  </select>
                </label>

                <label className="text-black font-bold text-xs sm:text-xl">
                  Sub Category :
                  <br />
                  <select
                    name="category"
                    id="category"
                    onChange={(e) =>
                      b({ type: "subCategory", payload: e.target.value })
                    }
                    className="input bg-gray-50  w-full "
                  >
                    <option value="category">{a?.subCategory}</option>

                    {F?.children?.map((e) => (
                      <option value={e?.name}>{e?.name}</option>
                    ))}
                  </select>
                </label>
              </div>

              <div className="sm:w-2/4 w-full m-auto pt-10 ">
                <label className="text-black font-bold text-xs sm:text-xl">
                  Description :
                  <br />
                  <textarea
                    onChange={(e) =>
                      b({ type: "description", payload: e.target.value })
                    }
                    className="textarea h-48  w-full bg-gray-50"
                    placeholder={a?.description}
                  ></textarea>
                </label>
              </div>

              {e?.query?.name?.[1] && (
                <div className="sm:w-2/4 w-full  m-auto pt-10 ">
                  <label className="text-black font-bold text-xs sm:text-xl">
                    Selected Area :
                    <div className={n.locationLi}>
                      <li>{e?.query?.name?.[1]}</li>
                    </div>
                  </label>
                </div>
              )}

              <p className="text-red-600 text-xs">{a.error}</p>

              <div className="sm:w-2/4 w-full m-auto pt-10 ">
                {users?.credit < local || local == "null" ? (
                  <>
                    <button className={n.postButton} disabled role="button">
                      Submit Post
                    </button>
                    <br />
                    <Link
                      href={`/recharge-credits/${users?._id}`}
                      className="rounded bg-green-400 font-bold text-white p-2 hover:bg-red-400"
                    >
                      Add Credits
                    </Link>
                  </>
                ) : (
                  <>
                    {d ? (
                      <button
                        className={`${n.postButton} loading`}
                        role="button"
                      >
                        Wait...
                      </button>
                    ) : (
                      <button
                        className={n.postButton}
                        onClick={() => q(e?.query?.name)}
                        role="button"
                      >
                        Submit Post
                      </button>
                    )}
                  </>
                )}
              </div>
            </div>
          </div>
        </div>

        <Footer></Footer>
      </div>
    );
  };
export default Post;