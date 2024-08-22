import "../styles/globals.scss";
import 'react-phone-input-2/lib/style.css'
import MainLayout from "../components/layout/index";
import defaultLayout from "../components/layout/default";
import { AuthProvider } from "../contextApi";
import { wrapper } from "../redux/store";
import { GoogleApiProvider } from "../context/googleContext";
import { useEffect, useState } from "react";
import Loader from "../components/common/loader";
// import ReactGA from "react-ga4";

function MyApp({ Component, pageProps }) {
  const Layout = Component.Layout || defaultLayout;
  const [isShowLoading, setIsShowLoading] = useState(true);


  // useEffect(() => {
  //   ReactGA.initialize(ANALYTICS_TRACKING_ID, {
  //     testMode: true,
  //   });
  //   ReactGA.send({ hitType: "pageview", page: "/", title: "Site View" });
  // },[])
  useEffect(() => {
    setTimeout(() => {
      setIsShowLoading(false)
    },3000)
  },[])


  return (
    <GoogleApiProvider>
      <AuthProvider>
        <MainLayout>
          <Layout>
            <Loader global loading={isShowLoading} />
            <Component {...pageProps} />
          </Layout>
        </MainLayout>
      </AuthProvider>
    </GoogleApiProvider>
  );
}

export default wrapper.withRedux(MyApp);
