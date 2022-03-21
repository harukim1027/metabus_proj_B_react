import { useState, useEffect } from 'react';
import { Map, MapMarker } from 'react-kakao-maps-sdk';

function CyMap({ centersData }) {
  const [openDiv, setOpenDiv] = useState(false);
  const [center, setCenter] = useState({
    lat: 36.3276637140944,
    lng: 127.4438988132827,
  });
  const IITP = { lat: 36.3276637140944, lng: 127.4438988132827 };
  // const [showSC, setShowSC] = useState(false);
  const [locations, setLocations] = useState([
    {
      center_name: '대전지식산업센터',
      center_coords: { lat: 36.3276637140944, lng: 127.4438988132827 },
    },
  ]);

  // 지오코딩
  const { kakao } = window;

  const geocoder = new kakao.maps.services.Geocoder();
  useEffect(() => {
    centersData?.map((cenData) => {
      geocoder.addressSearch(cenData.center_address, function (result, status) {
        // 정상적으로 검색이 완료됐으면
        if (status === kakao.maps.services.Status.OK) {
          const coords = new kakao.maps.LatLng(result[0].y, result[0].x);
          // console.log('coords: ', coords);
          // 지도의 중심을 결과값으로 받은 위치로 이동시킵니다
          // map.setCenter(coords);
          setLocations((prevLocs) => [
            ...prevLocs,
            {
              center_name: cenData?.center_name,
              center_call: cenData?.center_call,
              center_coords: { lat: coords.Ma, lng: coords.La },
            },
          ]);
        }
      });
    });
  }, [centersData]);
  // console.log('geocode:', geocode);
  // console.log('locations: ', locations);
  function map_marker(marker_obj) {
    return <MapMarker position={marker_obj.center_coords} />;
  }

  //-------------

  return (
    <>
      <Map center={center} style={{ width: '100%', height: '700px' }} level="3">
        {/* <CustomOverlayMap position={IITP + 5}></CustomOverlayMap> */}

        {locations.map((marker_obj) => {
          return map_marker(marker_obj);
        })}
      </Map>
      {/* <button onClick={() => setShowSC(!showSC)}>센터 보기!</button> */}
    </>
  );
}

export default CyMap;
