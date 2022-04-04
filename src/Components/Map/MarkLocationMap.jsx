import { useState, useEffect, useMemo } from 'react';
import { CustomOverlayMap, Map, MapMarker } from 'react-kakao-maps-sdk';
import './Map.css';

function MarkLocationMap({ location }) {
  const [currentLoc, setCurrentLoc] = useState({
    center: {
      lat: 36.32754333444323,
      lng: 127.44633210644454,
    },
    errMsg: null,
    isLoading: true,
  });
  // const [clickLoc, setClickLoc] = useState({});
  const [myLoc, setMyLoc] = useState({});
  const [markedLoc, setMarkedLoc] = useState({});
  const [mapCenter, setMapCenter] = useState(1);
  const [map, setMap] = useState();

  const { kakao } = window;
  // 지오코딩
  const geocoder = useMemo(function () {
    return new kakao.maps.services.Geocoder();
  }, []);

  useEffect(() => {
    geocoder.addressSearch(location, function (result, status) {
      // 정상적으로 검색이 완료됐으면
      if (status === kakao.maps.services.Status.OK) {
        const coords = new kakao.maps.LatLng(result[0].y, result[0].x);
        // console.log('coords: ', coords);
        // 지도의 중심을 결과값으로 받은 위치로 이동시킵니다
        // map.setCenter(coords);
        setMarkedLoc({
          location: location,
          center: { lat: coords.Ma, lng: coords.La },
          isPanto: true,
        });
      }
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
            isPanto: true,
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
  }, [location]);
  // 지도 중심좌표 설정
  useEffect(() => {
    setMyLoc(currentLoc);
  }, [currentLoc]);
  // console.log('geocode:', geocode);
  // console.log('locations: ', locations);
  // -----------------useEffect 하나 끝---------------------------

  // ---------------지오코더로 좌표를 주소로 변환하는 함수들-----------
  // 화면 중앙의 행정동 주소 정보 화면 좌상단에 뿌려주기
  function searchAddrFromCoords(coords, callback) {
    // 좌표로 행정동 주소 정보를 요청합니다
    geocoder.coord2RegionCode(coords.getLng(), coords.getLat(), callback);
  }

  function searchDetailAddrFromCoords(coords, callback) {
    // 좌표로 법정동 상세 주소 정보를 요청합니다
    geocoder.coord2Address(coords.lng, coords.lat, callback);
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

  useEffect(() => {
    console.log('myLoc: ', myLoc);
  }, [myLoc]);
  return (
    <div>
      {myLoc.center && markedLoc.center && (
        <Map
          center={mapCenter === 1 ? markedLoc.center : myLoc.center}
          isPanto={mapCenter === 1 ? markedLoc.isPanto : myLoc.isPanto}
          style={{ width: '100%', height: '350px' }}
          level="6"
          onCreate={(map) => setMap(map)}
          // 지도 중심의 행정동 표시를 위해 함수 사용
          onDragEnd={(map) => {
            setMyLoc({
              center: { lat: map.getCenter().Ma, lng: map.getCenter().La },
            });
            searchAddrFromCoords(map.getCenter(), displayCenterInfo);
          }}
          className="mt-10"
        >
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

          {/* 발견위치 마커 */}
          {!currentLoc.isLoading && (
            <MapMarker position={markedLoc.center}>
              <div>여기에요!</div>
            </MapMarker>
          )}
          <div
            style={{
              display: 'flex',
              gap: '10px',
            }}
          >
            <button
              className="p-2 bg-green-300 rounded-lg mr-4"
              onClick={() => {
                setMyLoc(currentLoc);
                setMapCenter(2);
              }}
            >
              현위치 보기
            </button>
            <button
              className="p-2 bg-green-300 rounded-lg mr-4"
              onClick={() => {
                setMapCenter(1);
              }}
            >
              발견 위치 보기
            </button>
          </div>
        </Map>
      )}
      {/* {position && (
        <p>
          {'클릭한 위치의 위도는 ' +
            position.center.lat +
            ' 이고, 경도는 ' +
            position.center.lng +
            ' 입니다'}
        </p>
      )} */}
    </div>
  );
}

export default MarkLocationMap;
