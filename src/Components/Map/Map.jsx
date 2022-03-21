import { useState, useEffect } from 'react';
import { Map, MapMarker } from 'react-kakao-maps-sdk';
import { useApiAxios } from 'api/base.js';

function CyMap({ centersData }) {
  const [openDiv, setOpenDiv] = useState(false);
  const [center, setCenter] = useState({
    lat: 36.3276637140944,
    lng: 127.4438988132827,
  });
  const IITP = { lat: 36.3276637140944, lng: 127.4438988132827 };
  const [showSC, setShowSC] = useState(false);

  // 지오코딩시도
  const { kakao } = window;
  const positions = [];
  useEffect(() => {
    var geocoder = new kakao.maps.services.Geocoder();
    centersData?.map((cenData) => {
      geocoder.addressSearch(cenData.center_address, function (result, status) {
        // 정상적으로 검색이 완료됐으면
        if (status === kakao.maps.services.Status.OK) {
          const coords = new kakao.maps.LatLng(result[0].y, result[0].x);
          console.log('coords: ', coords);
          // 지도의 중심을 결과값으로 받은 위치로 이동시킵니다
          // map.setCenter(coords);
          coords &&
            positions.push({
              center_name: cenData.center_name,
              center_coords: { lat: coords.Ma, lng: coords.La },
            });
          console.log('positions: ', positions);
          // setGeocode({ lat: coords.Ma, lng: coords.La });
        }
      });
      return positions;
    });
    console.log('positions: ', positions);
    // map 여기까지
  }, [centersData]);
  // console.log('geocode:', geocode);

  function map_marker(marker_obj) {
    return <MapMarker position={marker_obj.center_coords} />;
  }

  //-------------

  return (
    <>
      <Map
        center={center}
        style={{ width: '100%', height: '700px' }}
        level="10"
      >
        {/* <CustomOverlayMap position={IITP + 5}></CustomOverlayMap> */}

        {showSC &&
          positions.map((marker_obj) => {
            return map_marker(marker_obj);
          })}
      </Map>
      <button onClick={() => setShowSC(!showSC)}>센터 보기!</button>
    </>
  );
}

export default CyMap;
