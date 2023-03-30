import Head from "next/head";
import dynamic from "next/dynamic";
const Footer = dynamic(() => import("@/component/footer/footer"));
import styles from "../styles/moduleCss/home.module.css";
import Script from "next/script";
const Index = dynamic(() => import("@/component/countries"));
const Header2 = dynamic(() => import("@/component/header/header2"));
const Search = dynamic(() => import("@/component/search/search"));

export default function Home() {
  return (
    <>
      <Head>
        <title>Adbacklist is an Easy and Secure Way to Post Online Classified Ads</title>
<meta  name="title" content="Free Classified site Adbacklist is an Easy and Secure Way to Post Online Classified Ads"/>
        <meta name="description" content="Adbacklist makes it easy to post classified ads online. 
Sell, find, and rent anything with a secure and safe platform. 
Get started today and reach thousands of potential customers in your local area in minutes!" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta
          name="google-site-verification"
          content="TYiSHLlk3Y-BJ095SPo4lMOG4hSRTUyxfIKdLR-_sfs"
        />
        <meta
          name="p:domain_verify"
          content="0730451c9c8761c27a8bae02652c5f38"
        />
        <link rel="icon" href="/favicon.ico" />
    
      </Head>

      <main className={styles.main}>
        <Header2 />
        <div className={styles.container}>
          <Search />
          <Index />
        </div>

        <Footer />
      </main>
    </>
  );
}