// src/components/MapComponent.js
import React, {useEffect, useState} from "react";
import {GoogleMap, LoadScript, Marker, InfoWindow} from "@react-google-maps/api";
import {dataList} from './Response';
import {FaFilter, FaSearch} from "react-icons/fa";

const googleMapsApiKey="AIzaSyCxVDVlIHLV_qsVtIBkm879cNWsi26PJDs";

const getMarkerIcon = (score) => {
  let color;
  switch (score) {
    case "優等":
      color = "#FD853A"; // 優等顏色
      break;
    case "甲等":
      color = "#76A732"; // 甲等顏色
      break;
    case "乙等":
      color = "#5AB4C5"; // 乙等顏色
      break;
    default:
      color = "#738995"; // 丙等顏色
      break;
  }
  return {
    path: 'M0 0 C0.83949188 0.00215515 1.67898376 0.0043103 2.54391479 0.00653076 C22.88476775 0.09032269 40.99655025 3.05503958 60.375 9.3125 C61.08076172 9.53776367 61.78652344 9.76302734 62.51367188 9.99511719 C106.58088468 24.3760759 144.41317762 58.56910512 165.68139648 99.43676758 C190.81125949 149.40988754 191.24066593 202.4326505 173.99365234 255.02294922 C162.19868732 289.77803853 145.38002246 322.97312596 126.375 354.3125 C125.43769043 355.87363525 125.43769043 355.87363525 124.48144531 357.46630859 C114.66488122 373.80503932 104.25907182 389.66681999 93.375 405.3125 C92.5399292 406.51640381 92.5399292 406.51640381 91.68798828 407.74462891 C79.96015684 424.62198108 67.69402394 441.08775764 54.99609375 457.24609375 C53.47054041 459.19071476 51.95263232 461.14100454 50.4375 463.09375 C45.10975991 469.94516957 39.62794946 476.63374763 33.98828125 483.23046875 C31.58418687 486.04885029 29.25732006 488.92421953 26.9375 491.8125 C23.42986767 496.11156562 19.79652814 500.27284422 16.0625 504.375 C15.55855713 504.93574219 15.05461426 505.49648438 14.53540039 506.07421875 C11.0293569 509.87960865 8.72931735 512.03050656 3.5703125 512.6484375 C-2.72086405 512.72847791 -6.76650602 512.71904105 -11.625 508.3125 C-12.41390625 507.6009375 -12.41390625 507.6009375 -13.21875 506.875 C-17.62392314 502.71010903 -21.38422869 498.03959385 -25.1796875 493.32421875 C-27.29193275 490.72271541 -29.44005059 488.16341181 -31.61743164 485.61694336 C-37.30556429 478.96455019 -42.76018004 472.15613289 -48.12548828 465.24169922 C-49.71249728 463.19993023 -51.30689855 461.16408876 -52.90234375 459.12890625 C-79.10311748 425.65820923 -103.90389057 390.88487675 -125.625 354.3125 C-126.23230957 353.2910791 -126.83961914 352.2696582 -127.46533203 351.21728516 C-152.44560871 308.9395937 -175.4028265 263.16361935 -183.625 214.3125 C-183.75197266 213.57789551 -183.87894531 212.84329102 -184.00976562 212.08642578 C-191.77894872 165.11325031 -178.4956642 116.16167788 -151.38232422 77.54248047 C-145.39629779 69.25614695 -138.66726628 61.70741391 -131.625 54.3125 C-130.97144531 53.60609375 -130.31789062 52.8996875 -129.64453125 52.171875 C-104.63083707 25.93149646 -68.05471378 8.20649013 -32.625 2.3125 C-31.64273438 2.13807373 -30.66046875 1.96364746 -29.6484375 1.78393555 C-19.74097644 0.17254141 -10.01770407 -0.04626429 0 0 Z M-62.625 117.3125 C-63.30949219 117.91449219 -63.99398437 118.51648438 -64.69921875 119.13671875 C-82.20133657 135.53850696 -91.17909371 158.9176113 -92.84765625 182.453125 C-93.59203022 208.2149373 -83.9329696 231.40037712 -66.625 250.3125 C-49.54877837 267.83192127 -26.85564376 277.99532882 -2.43408203 278.78540039 C24.41926185 279.04445838 47.99440004 269.33754438 67.265625 250.578125 C84.13501191 233.37592651 93.16090851 209.83372295 93.625 185.875 C93.03525594 158.48466476 82.12630995 135.12699901 62.4453125 116.140625 C26.61989726 84.50610739 -27.26000414 85.91135657 -62.625 117.3125 Z ',
    fillColor: color,
    fillOpacity: 1,
    strokeWeight: 1,
    strokeColor: 'black',
    scale: 0.05,
  };
};

const mapContainerStyle = {
    width: "100vw",
    height: "92vh",
};


const center = {
  lat: 25.0330, // 台北經度
  lng: 121.5654, // 台北緯度
};

function MapComponent() {
  const [selectedPlace, setSelectedPlace] = useState(null);
  const [places, setPlaces] = useState([]);
  const [filter, setFilter] = useState({ types: [], grades: [] });
  const [searchVisible, setSearchVisible] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const [mapCenter, setMapCenter] = useState(center);
  const [filterVisible, setFilterVisible] = useState(false);
  const [selectedTypes, setSelectedTypes] = useState([]);
  const [selectedGrades, setSelectedGrades] = useState([]);

  const toggleType = (type) => {
    setSelectedTypes((prev) =>
        prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]
    );
  };

  const toggleGrade = (grade) => {
    setSelectedGrades((prev) =>
        prev.includes(grade) ? prev.filter((g) => g !== grade) : [...prev, grade]
    );
  };

  const applyFilter = () => {
    setFilter({ types: selectedTypes, grades: selectedGrades });
    setFilterVisible(false);
  };

  const handleSearch = async () => {
    if (!searchInput) return;

    const geocodeUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
        searchInput
    )}&key=${googleMapsApiKey}`;

    try {
      const response = await fetch(geocodeUrl);
      const data = await response.json();
      if (data.status === "OK") {
        const location = data.results[0].geometry.location;
        setMapCenter({ lat: location.lat, lng: location.lng });
      } else {
        alert("地址未找到");
      }
    } catch (error) {
      console.error("Geocode error:", error);
    }
  };

  const toggleSearch = () => {
    setSearchVisible(!searchVisible); // Toggle search visibility
    setFilterVisible(false); // Close filter when search opens
  };

  const toggleFilter = () => {
    setFilterVisible(!filterVisible); // Toggle filter visibility
    setSearchVisible(false); // Close search when filter opens
  };

  useEffect(() => {
    const filteredPlaces = dataList.filter((place) => {
      const matchesType = filter.types.length === 0 || filter.types.includes(place.attributes.teamYN);
      const matchesGrade = filter.grades.length === 0 || filter.grades.includes(place.attributes.score);
      return matchesType && matchesGrade;
    });
    setPlaces(filteredPlaces.map(place => place.attributes));
  }, [filter]);

  const handleLoadMap = () => {
    dataList.forEach((place) => {
      setPlaces(places => [...places, place.attributes]);
    });

  };

  return (
    <div className="flex flex-col">
      <div className="relative">
        <button
            onClick={toggleFilter}
            className="absolute top-4 left-4 z-10 bg-white shadow-md p-2 rounded-full"
        >
          <FaFilter size={24} />
        </button>

        {filterVisible && (
            <div className="absolute top-14 left-4 z-10 bg-white p-4 rounded-lg shadow-md w-80">
              <h3 className="font-bold mb-2">托嬰中心類型</h3>
              <div className="filter-options flex flex-wrap gap-2">
                {["大公托", "小家園", "準公共", "私立"].map((type) => (
                    <button
                        key={type}
                        onClick={() => toggleType(type)}
                        className={`rounded-full px-4 py-1 border transition-colors duration-300 ${
                            selectedTypes.includes(type) ? 'bg-[#468D9B] text-white' : 'bg-white border-gray-300'
                        }`}
                    >
                      {type}
                    </button>
                ))}
              </div>

              <h3 className="font-bold mb-2 mt-4">評鑒等級</h3>
              <div className="filter-options flex flex-wrap gap-2">
                {["優等", "甲等", "乙等", "丙等"].map((grade) => (
                    <button
                        key={grade}
                        onClick={() => toggleGrade(grade)}
                        className={`rounded-full px-4 py-1 border transition-colors duration-300 ${
                            selectedGrades.includes(grade) ? 'bg-[#468D9B] text-white' : 'bg-white border-gray-300'
                        }`}
                    >
                      {grade}
                    </button>
                ))}
              </div>

              <button
                  onClick={applyFilter}
                  className="mt-4 bg-[#468D9B] text-white rounded-md px-4 py-2"
              >
                搜尋
              </button>
            </div>
        )}

        <button
            onClick={toggleSearch}
            className="absolute bg-white p-2 rounded-full shadow-md top-4 left-16 z-10"
        >
          <FaSearch size={24} />
        </button>

        {searchVisible && (
            <div className="absolute top-14 left-4 z-10 bg-white p-4 rounded-lg shadow-md w-80">
              <input
                  type="text"
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                  placeholder="輸入地址"
                  className="border p-2 rounded-lg focus:outline-none"
              />
              <button
                  onClick={handleSearch}
                  className="bg-[#468D9B] text-white p-2 rounded-lg ml-2"
              >
                搜尋
              </button>
            </div>
        )}
      </div>
      <div className="flex-grow relative">
        <LoadScript googleMapsApiKey={googleMapsApiKey} libraries={["places"]}>
          <GoogleMap
            mapContainerStyle={mapContainerStyle}
            center={mapCenter}
            zoom={12}
            onLoad={handleLoadMap}
            options={{
              mapTypeControl: false,
              streetViewControl: false,
              fullscreenControl: false,
            }}
          >
            {places.map((place) => (
              <Marker
                key={place.OBJECTID}
                position={{
                  lat: place.lat,
                  lng: place.lng,
                }}
                onClick={() => {
                  setSelectedPlace(place);
                }}
                icon={getMarkerIcon(place.score)}
              />
            ))}

            {selectedPlace && (
              <InfoWindow
                position={{
                  lat: selectedPlace.lat,
                  lng: selectedPlace.lng,
                }}
                onCloseClick={() => {
                  setSelectedPlace(null);
                }}
              >
                <div className="line-height-5">
                  <h2 className="font-bold text-center">{selectedPlace.name}</h2>
                  <p><strong className="font-bold">地址:</strong> {selectedPlace.address}</p>
                  <p><strong className="font-bold">電話:</strong> {selectedPlace.tel}</p>
                  <p><strong className="font-bold">評分:</strong> {selectedPlace.score}</p>
                  <p><strong className="font-bold">區域:</strong> {selectedPlace.town}</p>
                  <p><strong className="font-bold">收費資訊:</strong> {selectedPlace.charge}</p>
                  <button
                      className="mt-4 p-2 bg-[#468D9B] text-white rounded"
                      onClick={() => {
                        const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
                        const googleMapsUrl = isMobile
                            ? `geo:${selectedPlace.lat},${selectedPlace.lng}?q=${encodeURIComponent(selectedPlace.name)}`
                            : `https://www.google.com/maps?q=${selectedPlace.name}`;
                        window.open(googleMapsUrl, '_blank');
                      }}
                  >
                    在 Google Map 上查看
                  </button>
                </div>
              </InfoWindow>
            )}
          </GoogleMap>
      </LoadScript>
    </div>
  </div>);
}

export default MapComponent;
