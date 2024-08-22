import React, { useState } from "react";
import classes from "./trending-links.module.css";
import trending_link_arrow from "../../public/assets/component-assets/trending-links-assets/trending-link-arrow.svg";
import Router from "next/router";

function TrendingLinks({ otherDivRef }) {
  const tabs = [
    {
      id: 1,
      title: "For Sale",
      popular_searches: [
        {
          label: "House for sale in Lahore",
          link: "/buy/residential/house?lat=31.5203696&lng=74.35874729999999&radius=31.72357060620462",
        },
        {
          label: "Flat for sale in Lahore",
          link: "/buy/residential/flat?lat=31.5203696&lng=74.35874729999999&radius=31.72357060620462",
        },
        {
          label: "Plots for sale in Bahria Town Lahore",
          link: "/buy/plot?lng=74.1768412&lat=31.3694884&radius=3.8203571392973923",
        },
        {
          label: "Flats for sale in Gulberg Islamabad",
          link: "/buy/residential/flat?lng=73.1985381&lat=33.6125495&radius=4.602010102313072",
        },
        {
          label: "Commercial properties for sale in Clifton Karachi",
          link: "/buy/commercial?lng=67.02509599999999&lat=24.8269877&radius=3.306960457803213",
        },
        {
          label: "Residential plots for sale in Gulshan-e-Iqbal Karachi",
          link: "/buy/plot/residential-plot?lng=67.0970916&lat=24.9180271&radius=4.054245507187052",
        },
        {
          label: "Farmhouses for sale in Raiwind Road Lahore",
          link: "/buy/residential/farmhouse?lng=74.2325105&lat=31.3689001&radius=0.19745901526809187",
        },
        {
          label: "Shops for sale in Saddar Rawalpindi",
          link: "/buy/residential/farmhouse?lng=73.0528412&lat=33.5968788&radius=1.811482693474668",
        },
      ],
      popular_areas: [
        {
          label: "G-13 Islamabad",
          link: "/buy/residential?lng=72.9667466&lat=33.6517191&radius=1.6841909152113566"
        },
        {
          label: "Saddar Rawalpindi",
          link: "/buy/residential?lng=73.0528412&lat=33.5968788&radius=1.811482693474668"
        },
        {
          label: "Raiwind Road Lahore",
          link: "/buy/residential?lng=74.2325105&lat=31.3689001&radius=0.19745901526809187"
        },
        {
          label: "Gulshan-e-Iqbal Karachi",
          link: "/buy/residential?lng=67.0970916&lat=24.9180271&radius=4.054245507187052"
        },
        {
          label: "Gulberg Islamabad",
          link: "/buy/residential?lng=73.1985381&lat=33.6125495&radius=4.602010102313072"
        },
        {
          label: "DHA Karachi",
          link: "/buy/residential?lng=67.0576612&lat=24.8043485&radius=6.727159992734969"
        },
      ],
      trending_areas: [
        {
          label: "Johar Town Lahore",
          link: "/buy/commercial?lng=74.27284610000001&lat=31.469693&radius=3.4869827197524823"
        },
        {
          label: "Blue Area Islamabad",
          link: "/buy/commercial?lng=73.071358&lat=33.7181584&radius=2.000593914488833"
        },
        {
          label: "Model Town Lahore",
          link: "/buy/commercial?lng=74.3239342&lat=31.4804642&radius=2.502238107334402"
        },
        {
          label: "Gulberg Lahore",
          link: "/buy/commercial?lng=74.3499496&lat=31.5164883&radius=1.6955677500694801"
        },
        {
          label: "North Nazimabad Karachi",
          link: "/buy/commercial?lng=67.042281&lat=24.9372146&radius=3.3342180399871904"
        },
        {
          label: "Gulistan-e-Jauhar Karachi",
          link: "/buy/commercial?lng=67.1343848&lat=24.9204194&radius=3.381493970050967"
        },
      ],
      popular_cities: [
        {label: "Islamabad", link: "/buy/residential?lng=73.04788479999999&lat=33.6844202&radius=33.500792551547356"},
        {label: "Lahore", link: "/buy/residential?lng=74.35874729999999&lat=31.5203696&radius=31.72357060620462"},
        {label: "Karachi", link: "/buy/residential?lng=67.0011364&lat=24.8607343&radius=70.80875090113182"},
        {label: "Rawalpindi", link: "/buy/residential?lng=73.0169135&lat=33.5651107&radius=16.583152964339543"},
        {label: "Faislabad", link: "/buy/residential?lng=73.13496049999999&lat=31.45036619999999&radius=20.249017626191485"},
        {label: "Multan", link: "/buy/residential?lng=71.5249154&lat=30.157458&radius=21.832574474123714"},
      ],
    },
    {
      id: 2,
      title: "Rent",
      popular_searches: [
        {
          label: "Houses for rent in DHA Karachi",
          link: "/rent/residential/House?lat=24.8043485&lng=67.0576612&radius=6.727159992734969",
        },
        {
          label: "Farmhouses for rent in Raiwind Road Lahore",
          link: "/rent/residential/farmhouse?lng=74.2325105&lat=31.3689001&radius=0.19745901526809187",
        },
        {
          label: "Commercial properties for rent in Clifton Karachi",
          link: "/rent/commercial?lng=67.02509599999999&lat=24.8269877&radius=3.306960457803213",
        },
       
        {
          label: "Plots for rent in Bahria Town Lahore",
          link: "/rent/plot?lng=74.1768412&lat=31.3694884&radius=3.8203571392973923",
        },
        {
          label: "Flats for rent in Gulberg Islamabad",
          link: "/rent/residential/flat?lng=73.1985381&lat=33.6125495&radius=4.602010102313072",
        },

        {
          label: "Residential plots for rent in Gulshan-e-Iqbal Karachi",
          link: "/rent/plot/residential-plot?lng=67.0970916&lat=24.9180271&radius=4.054245507187052",
        },
        {
          label: "Shops for rent in Saddar Rawalpindi",
          link: "/rent/residential/farmhouse?lng=73.0528412&lat=33.5968788&radius=1.811482693474668",
        },
        {
          label: "Flat for rent in Lahore",
          link: "/rent/residential/flat?lat=31.5203696&lng=74.35874729999999&radius=31.72357060620462",
        },
      ],
      popular_areas: [
        {
          label: "DHA Karachi",
          link: "/rent/residential?lng=67.0576612&lat=24.8043485&radius=6.727159992734969"
        },
        
        {
          label: "Saddar Rawalpindi",
          link: "/rent/residential?lng=73.0528412&lat=33.5968788&radius=1.811482693474668"
        },
        {
          label: "Raiwind Road Lahore",
          link: "/rent/residential?lng=74.2325105&lat=31.3689001&radius=0.19745901526809187"
        },
        {
          label: "G-13 Islamabad",
          link: "/rent/residential?lng=72.9667466&lat=33.6517191&radius=1.6841909152113566"
        },
        {
          label: "Gulshan-e-Iqbal Karachi",
          link: "/rent/residential?lng=67.0970916&lat=24.9180271&radius=4.054245507187052"
        },
      ],
      trending_areas: [
        {
          label: "North Nazimabad Karachi",
          link: "/rent/commercial?lng=67.042281&lat=24.9372146&radius=3.3342180399871904"
        },
        {
          label: "Model Town Lahore",
          link: "/rent/commercial?lng=74.3239342&lat=31.4804642&radius=2.502238107334402"
        },
        {
          label: "Blue Area Islamabad",
          link: "/rent/commercial?lng=73.071358&lat=33.7181584&radius=2.000593914488833"
        },

        {
          label: "Gulberg Lahore",
          link: "/rent/commercial?lng=74.3499496&lat=31.5164883&radius=1.6955677500694801"
        },
        {
          label: "Johar Town Lahore",
          link: "/rent/commercial?lng=74.27284610000001&lat=31.469693&radius=3.4869827197524823"
        },
        {
          label: "Gulistan-e-Jauhar Karachi",
          link: "/rent/commercial?lng=67.1343848&lat=24.9204194&radius=3.381493970050967"
        },
      ],
      popular_cities: [
        {label: "Islamabad", link: "/rent/residential?lng=73.04788479999999&lat=33.6844202&radius=33.500792551547356"},
        {label: "Lahore", link: "/rent/residential?lng=74.35874729999999&lat=31.5203696&radius=31.72357060620462"},
        {label: "Karachi", link: "/rent/residential?lng=67.0011364&lat=24.8607343&radius=70.80875090113182"},
        {label: "Rawalpindi", link: "/rent/residential?lng=73.0169135&lat=33.5651107&radius=16.583152964339543"},
        {label: "Faislabad", link: "/rent/residential?lng=73.13496049999999&lat=31.45036619999999&radius=20.249017626191485"},
        {label: "Multan", link: "/rent/residential?lng=71.5249154&lat=30.157458&radius=21.832574474123714"},
      ],
    },
    {
      id: 4,
      title: "Shared Spaces",
      popular_searches: [
        {
          label: "Shared House in Gulshan-e-Iqbal Karachi",
          link: "/shared/coliving/residential/house?lng=67.0970916&lat=24.9180271&radius=4.054245507187052",
        },
        {
          label: "Shared working space in DHA Karachi",
          link: "/shared/coworking?lat=24.8043485&lng=67.0576612&radius=6.727159992734969",
        },
        {
          label: "Shared Flat in Raiwind Road Lahore",
          link: "/shared/coliving/residential/flat?lng=74.2325105&lat=31.3689001&radius=0.19745901526809187",
        },
        {
          label: "Shared House in Clifton Karachi",
          link: "/shared/coliving/residential/house?lng=67.02509599999999&lat=24.8269877&radius=3.306960457803213",
        },
        {
          label: "Shared Hostel in Bahria Town Lahore",
          link: "/shared/coliving/residential/hostel?lng=74.1768412&lat=31.3694884&radius=3.8203571392973923",
        },
        {
          label: "Shared working space in Saddar Rawalpindi",
          link: "/shared/coworking?lng=73.0528412&lat=33.5968788&radius=1.811482693474668",
        },
      ],
      popular_areas: [
        {
          label: "Shared space in Raiwind Road Lahore",
          link: "/shared/coliving?lng=74.2325105&lat=31.3689001&radius=0.19745901526809187"
        },
        {
          label: "Shared space in Saddar Rawalpindi",
          link: "/shared/coliving?lng=73.0528412&lat=33.5968788&radius=1.811482693474668"
        },
        {
          label: "Shared space in DHA Karachi",
          link: "/shared/coliving?lng=67.0576612&lat=24.8043485&radius=6.727159992734969"
        },
        {
          label: "Shared space in G-13 Islamabad",
          link: "/shared/coliving?lng=72.9667466&lat=33.6517191&radius=1.6841909152113566"
        },
      ],
      trending_areas: [
        {
          label: "Working space Model Town Lahore",
          link: "/shared/coworking?lng=74.3239342&lat=31.4804642&radius=2.502238107334402"
        },
        {
          label: "Working space Gulistan-e-Jauhar Karachi",
          link: "/shared/coworking?lng=67.1343848&lat=24.9204194&radius=3.381493970050967"
        },
        {
          label: "Working space Gulberg Lahore",
          link: "/shared/coworking?lng=74.3499496&lat=31.5164883&radius=1.6955677500694801"
        },
        {
          label: "Working space Johar Town Lahore",
          link: "/shared/coworking?lng=74.27284610000001&lat=31.469693&radius=3.4869827197524823"
        },
      ],
      popular_cities: [
        {label: "Islamabad", link: "/shared/coliving/residential?lng=73.04788479999999&lat=33.6844202&radius=33.500792551547356"},
        {label: "Lahore", link: "/shared/coliving/residential?lng=74.35874729999999&lat=31.5203696&radius=31.72357060620462"},
        {label: "Karachi", link: "/shared/coliving/residential?lng=67.0011364&lat=24.8607343&radius=70.80875090113182"},
        {label: "Rawalpindi", link: "/shared/coliving/residential?lng=73.0169135&lat=33.5651107&radius=16.583152964339543"},
        {label: "Faislabad", link: "/shared/coliving/residential?lng=73.13496049999999&lat=31.45036619999999&radius=20.249017626191485"},
        {label: "Multan", link: "/shared/coliving/residential?lng=71.5249154&lat=30.157458&radius=21.832574474123714"},
      ],
    },
    {
      id: 5,
      title: "Investment Projects",
      popular_searches: [
        {
          label: "Newly lanched projects in DHA Karachi",
          link: "/project/invest?status=New%20Launch&lat=24.8043485&lng=67.0576612&radius=6.727159992734969",
        },
        {
          label: "Near-completion projects on Raiwind Road Lahore",
          link: "/project/invest?status=Near%20possession&lng=74.2325105&lat=31.3689001&radius=0.19745901526809187",
        },
        {
          label: "Project under construction in Clifton Karachi",
          link: "/project/invest?status=Under%20construction&lng=67.02509599999999&lat=24.8269877&radius=3.306960457803213",
        },
      ],
      popular_areas: [
        {
          label: "DHA Karachi",
          link: "/project/invest?type=residential&lng=67.0576612&lat=24.8043485&radius=6.727159992734969"
        },
        
        {
          label: "Saddar Rawalpindi",
          link: "/project/invest?type=residential&lng=73.0528412&lat=33.5968788&radius=1.811482693474668"
        },
        {
          label: "Raiwind Road Lahore",
          link: "/project/invest?type=residential&lng=74.2325105&lat=31.3689001&radius=0.19745901526809187"
        },
        {
          label: "G-13 Islamabad",
          link: "/project/invest?type=residential&lng=72.9667466&lat=33.6517191&radius=1.6841909152113566"
        },
        {
          label: "Gulshan-e-Iqbal Karachi",
          link: "/project/invest?type=residential&lng=67.0970916&lat=24.9180271&radius=4.054245507187052"
        },
      ],
      trending_areas: [
        {
          label: "North Nazimabad Karachi",
          link: "/project/invest?type=commercial&lng=67.042281&lat=24.9372146&radius=3.3342180399871904"
        },
        {
          label: "Model Town Lahore",
          link: "/project/invest?type=commercial&lng=74.3239342&lat=31.4804642&radius=2.502238107334402"
        },
        {
          label: "Blue Area Islamabad",
          link: "/project/invest?type=commercial&lng=73.071358&lat=33.7181584&radius=2.000593914488833"
        },
        {
          label: "Gulberg Lahore",
          link: "/project/invest?type=commercial&lng=74.3499496&lat=31.5164883&radius=1.6955677500694801"
        },
        {
          label: "Johar Town Lahore",
          link: "/project/invest?type=commercial&lng=74.27284610000001&lat=31.469693&radius=3.4869827197524823"
        },
        {
          label: "Gulistan-e-Jauhar Karachi",
          link: "/project/invest?type=commercial&lng=67.1343848&lat=24.9204194&radius=3.381493970050967"
        },
      ],
      popular_cities: [
        {label: "Islamabad", link: "/project/invest?lng=73.04788479999999&lat=33.6844202&radius=33.500792551547356"},
        {label: "Lahore", link: "/project/invest?lng=74.35874729999999&lat=31.5203696&radius=31.72357060620462"},
        {label: "Karachi", link: "/project/invest?lng=67.0011364&lat=24.8607343&radius=70.80875090113182"},
        {label: "Rawalpindi", link: "/project/invest?lng=73.0169135&lat=33.5651107&radius=16.583152964339543"},
        {label: "Faislabad", link: "/project/invest?lng=73.13496049999999&lat=31.45036619999999&radius=20.249017626191485"},
        {label: "Multan", link: "/project/invest?lng=71.5249154&lat=30.157458&radius=21.832574474123714"},
      ],
    },
  ];

  const [selectedTab, setSelectedTab] = useState(tabs[0]);

  const handleSelectTab = async (tab) => {
    setSelectedTab(tab);
  };


  return (
    <div className={classes.container}>
      <div className={classes.content_container} ref={otherDivRef}>
        <div className={classes.tabs_container}>
          {tabs?.map((tab, index) => (
            <p
              onClick={() => {
                handleSelectTab(tab);
              }}
              className={
                selectedTab.id === tab?.id
                  ? classes.single_tab_selected
                  : classes.single_tab
              }
              key={index}
            >
              {tab?.title}
            </p>
          ))}
        </div>

        <div className={classes.links_container}>
          <div className={classes.col}>
            <h2>Popular Searches</h2>

            {selectedTab?.popular_searches && selectedTab?.popular_searches?.map((s,i) => (
              <div onClick={() => Router.push(s.link)} key={`ps-${i}`} className={classes.single_link}>
                <img src={trending_link_arrow.src} />
                <p>{s.label}</p>
              </div>
            ))}
          </div>

          <div className={classes.col}>
            <h2>{selectedTab.title === "Shared Spaces" ? "Popular Living Areas" : "Popular Residential Areas"}</h2>

            {selectedTab?.popular_areas && selectedTab?.popular_areas?.map((sa,i) => (
              <div onClick={() => Router.push(sa.link)} key={`psa-${i}`} className={classes.single_link}>
                <img src={trending_link_arrow.src} />
                <p>{sa.label}</p>
              </div>
            ))}
          </div>

          <div className={classes.col}>
            <h2>{selectedTab.title === "Shared Spaces" ? "Popular Working Areas" : "Trending Commercial Areas"}</h2>

            {selectedTab?.trending_areas && selectedTab?.trending_areas?.map((sta,i) => (
              <div onClick={() => Router.push(sta.link)} key={`psta-${i}`} className={classes.single_link}>
                <img src={trending_link_arrow.src} />
                <p>{sta.label}</p>
              </div>
            ))}
          </div>

          <div className={classes.col}>
            <h2>Popular Cities</h2>

            {selectedTab?.popular_cities && selectedTab?.popular_cities?.map((sts,i) => (
              <div onClick={() => Router.push(sts.link)} key={`psts-${i}`} className={classes.single_link}>
                <img src={trending_link_arrow.src} />
                <p>{sts.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default TrendingLinks;
