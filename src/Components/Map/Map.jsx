import { useState, useEffect } from 'react';
import { Map, MapMarker } from 'react-kakao-maps-sdk';

function CyMap({ centersData }) {
  const [openDiv, setOpenDiv] = useState(false);
  const [currentLoc, setCurrentLoc] = useState({
    center: {
      lat: 36.32754333444323,
      lng: 127.44633210644454,
    },
    errMsg: null,
    isLoading: true,
  });

  const [position, setPosition] = useState();
  const [map, setMap] = useState();
  const [info, setInfo] = useState();

  // 지오코딩
  const { kakao } = window;
  const [locations, setLocations] = useState([
    {
      center_name: '대전지식산업센터',
      center_coords: { lat: 36.3276637140944, lng: 127.4438988132827 },
    },
  ]);

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
    // geolocaion으로 현위치 표시
    if (navigator.geolocation) {
      // GeoLocation을 이용해서 접속 위치를 얻어옵니다
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setCurrentLoc((prev) => ({
            ...prev,
            center: {
              lat: position.coords.latitude, // 위도
              lng: position.coords.longitude, // 경도
            },
            isLoading: false,
          }));
        },
        (err) => {
          setCurrentLoc((prev) => ({
            ...prev,
            errMsg: err.message,
            isLoading: false,
          }));
        },
      );
    } else {
      // HTML5의 GeoLocation을 사용할 수 없을때 마커 표시 위치와 인포윈도우 내용을 설정합니다
      setCurrentLoc((prev) => ({
        ...prev,
        errMsg: 'geolocation을 사용할수 없어요..',
        isLoading: false,
      }));
    }
    //--------------------
  }, [centersData]);
  // console.log('geocode:', geocode);
  // console.log('locations: ', locations);
  function map_marker(marker_obj) {
    return <MapMarker position={marker_obj.center_coords} />;
  }
  //-------------

  // 주소로 변환하기
  useEffect(() => {}, []);

  // 지오코더로 좌표를 주소로 변환하는 함수들-----활용
  function searchAddrFromCoords(coords, callback) {
    // 좌표로 행정동 주소 정보를 요청합니다
    geocoder.coord2RegionCode(coords.getLng(), coords.getLat(), callback);
  }

  // 화면 중앙의 행정동 주소 정보 화면 좌상단에 뿌려주기
  function searchDetailAddrFromCoords(coords, callback) {
    // 좌표로 법정동 상세 주소 정보를 요청합니다
    geocoder.coord2Address(coords.getLng(), coords.getLat(), callback);
  }

  // 지도 좌측상단에 지도 중심좌표에 대한 주소정보를 표출하는 함수입니다
  function displayCenterInfo(result, status) {
    if (status === kakao.maps.services.Status.OK) {
      var infoDiv = document.getElementById('centerAddr');

      for (var i = 0; i < result.length; i++) {
        // 행정동의 region_type 값은 'H' 이므로
        if (result[i].region_type === 'H') {
          infoDiv.innerHTML = result[i].address_name;
          break;
        }
      }
    }
  }

  return (
    <>
      <Map
        center={currentLoc.center}
        style={{ width: '100%', height: '700px' }}
        level="9"
        onClick={(_t, mouseEvent) =>
          setPosition({
            lat: mouseEvent.latLng.getLat(),
            lng: mouseEvent.latLng.getLng(),
          })
        }
        onCreate={(map) => setMap(map)}
        onCenterChanged={(map) =>
          searchAddrFromCoords(map.getCenter(), displayCenterInfo)
        }
      >
        {/* 행정동 위치 표기 */}
        <div
          style={{
            position: 'absolute',
            left: '10px',
            top: '10px',
            borderRadius: '2px',
            background: 'rgba(255, 255, 255, 0.8)',
            zIndex: 1,
            padding: '5px',
          }}
        >
          <span class=" font-semibold">지도중심기준 행정동 주소정보</span>
          <br />
          <span id="centerAddr"></span>
        </div>
        {/* ---------- */}
        {locations.map((marker_obj) => {
          return map_marker(marker_obj);
        })}
        {/* 클릭으로 위치 마커(포인터) 표시 */}
        {position && <MapMarker position={position} draggable={true} />}

        {/* 현위치 마커 */}
        {!currentLoc.isLoading && (
          <MapMarker
            position={currentLoc.center}
            image={{
              src: '/curlocationmarker.png',
              size: {
                width: 40,
                height: 44,
              },
            }}
          >
            <div style={{ padding: '5px', color: '#000' }}>
              {currentLoc.errMsg
                ? currentLoc.errMsg
                : '현위치 (PC로 접속 시 오차가 있을 수 있습니다.)'}
            </div>
          </MapMarker>
        )}
      </Map>
      {position && (
        <p>
          {'클릭한 위치의 위도는 ' +
            position.lat +
            ' 이고, 경도는 ' +
            position.lng +
            ' 입니다'}
        </p>
      )}
    </>
  );
}

export default CyMap;
