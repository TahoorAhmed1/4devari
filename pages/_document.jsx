import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head />
      {/* <!-- Google tag Manager --> */}
      {/* <script async src="https://www.googletagmanager.com/gtag/js?id=G-YY4JM73M7Y" /> */}
      {/* <script
       dangerouslySetInnerHTML={{
        __html: `
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', 'G-YY4JM73M7Y', {
          page_path: window.location.pathname,
        });
        (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
        new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
        j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
        'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
        })(window,document,'script','dataLayer','GTM-KP8KB5PB')
        `
       }}
      /> */}
      {/* Googgle api */}
      {/* </Head> */}
      <body>
        {/* <!-- Google Tag Manager (noscript) --> */}
        {/* <noscript><iframe src="https://www.googletagmanager.com/ns.html?id=GTM-KP8KB5PB"
          height="0" width="0" style={{display: 'none', visibility: 'hidden'}}></iframe></noscript> */}
        {/* <!-- End Google Tag Manager (noscript) --> */}
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
