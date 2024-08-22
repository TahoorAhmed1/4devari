export const PURPOSE = {
  buy: "buy",
  rent: "rent",
  coliving: "coliving space",
  coworking: "coworking space",
  // coliving: "coliving",
  // coworking: "coworking",
};

const USER_ROLE = [
  {
    id: 1,
    title: "USER",
  },
  {
    id: 2,
    title: "AGENCY",
  },
  {
    id: 3,
    title: "BUILDER",
  },
];

export const MAP_POLYGONS = [
  [
    { lat: 28.630818281028954, lng: 79.80954378826904 },
    { lat: 28.62362346815063, lng: 79.80272024853515 },
    { lat: 28.623585797675588, lng: 79.81490820629882 },
    { lat: 28.630818281028954, lng: 79.80954378826904 },
  ],
  [
    { lat: 28.63130796240949, lng: 79.8170110581665 },
    { lat: 28.623623468150655, lng: 79.81705397351074 },
    { lat: 28.623623468150655, lng: 79.82619494183349 },
    { lat: 28.6313832978037, lng: 79.82619494183349 },
    { lat: 28.63130796240949, lng: 79.8170110581665 },
  ],
];
export const MAP_DEFAULT_CENTER = {
  lat: 30.375321,
  lng: 69.34511599999999,
  // lat: 28.626137,
  // lng: 79.821603,
};
export const MARKERS_DATA = [
  { id: "1", position: { lat: 28.625, lng: 79.8095 }, title: "Location 1" },
  { id: "2", position: { lat: 28.6341, lng: 79.818 }, title: "Location 2" },
  { id: "3", position: { lat: 28.6235, lng: 79.835 }, title: "Location 3" },
  { id: "4", position: { lat: 28.628, lng: 79.821 }, title: "Location 4" },
];

export const RESTRICT_BOUNDS = {
  north: 44.27870098163019,
  south: 14.181934685293058,
  east: 100.80995974999998,
  west: 37.88027224999998,
};


// 'geocode'

// Returns address results. Generally, these are the most precise and accurate results.
// '(cities)'

// Restricts results to cities.
// 'address'

// Returns address results, similar to the 'geocode' type.
// 'establishment'

// Returns results that are likely to be places of business, such as restaurants, hotels, or other commercial entities.
// 'regions'

// Suggests regions instead of individual addresses or businesses. This is often used for more generalized searches.
// '(regions)'

// Similar to 'regions,' this type restricts suggestions to regions.
// 'locality'

// Restricts results to a specific locality (city or town).
// 'sublocality'

// Restricts results to a specific sublocality (neighborhood).
// 'route'

// Suggests street names.
// 'country'

// Restricts results to a specific country.
// 'postal_code'

// Restricts results to a specific postal code.
// 'airport'

// Suggests airports.
// 'train_station'

// Suggests train stations.
