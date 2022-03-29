import { Map, MapMarker } from 'react-kakao-maps-sdk';
import { useState, useEffect, useMemo } from 'react';

function SearchInfraMap() {
  const [info, setInfo] = useState();
  const [markers, setMarkers] = useState([]);
  const [map, setMap] = useState();
  const [currentLoc, setCurrentLoc] = useState({
    center: {
      lat: 36.32754333444323,
      lng: 127.44633210644454,
    },
    errMsg: null,
    isLoading: true,
  });
  const [query, setQuery] = useState('대전광역시 유성구 관평동 애견미용');
  const [infra, setInfra] = useState('애견미용');

  const { kakao } = window;

  const geocoder = useMemo(function () {
    return new kakao.maps.services.Geocoder();
  }, []);

  useEffect(() => {
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
  }, []);

  useEffect(() => {
    if (!map) return;
    const ps = new kakao.maps.services.Places();

    ps.keywordSearch(query, (data, status, _pagination) => {
      if (status === kakao.maps.services.Status.OK) {
        // 검색된 장소 위치를 기준으로 지도 범위를 재설정하기위해
        // LatLngBounds 객체에 좌표를 추가합니다
        const bounds = new kakao.maps.LatLngBounds();
        let markers = [];

        for (var i = 0; i < data.length; i++) {
          // @ts-ignore
          markers.push({
            position: {
              lat: data[i].y,
              lng: data[i].x,
            },
            content: data[i].place_name,
          });
          // @ts-ignore
          bounds.extend(new kakao.maps.LatLng(data[i].y, data[i].x));
        }
        setMarkers(markers);

        // 검색된 장소 위치를 기준으로 지도 범위를 재설정합니다
        map.setBounds(bounds);
      }
    });
  }, [map, query]);

  // 함수들
  // 행정동 주소 표시 함수
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
  // 인프라 검색 함수
  function searchInfra(result, status) {
    if (status === kakao.maps.services.Status.OK) {
      for (var i = 0; i < result.length; i++) {
        // 행정동의 region_type 값은 'H' 이므로
        if (result[i].region_type === 'H') {
          setQuery(`${result[i].address_name} ${infra}`);
          break;
        }
      }
    }
  }

  useEffect(() => {
    if (!map) return;
    searchAddrFromCoords(map.getCenter(), searchInfra);
  }, [infra]);

  // 화면 중앙의 행정동 주소 정보 화면 좌상단에 뿌려주기
  function searchAddrFromCoords(coords, callback) {
    // 좌표로 행정동 주소 정보를 요청합니다
    geocoder.coord2RegionCode(coords.getLng(), coords.getLat(), callback);
  }

  return (
    <>
      <Map // 로드뷰를 표시할 Container
        center={{
          lat: 37.566826,
          lng: 126.9786567,
        }}
        style={{
          width: '100%',
          height: '700px',
        }}
        level={3}
        onCreate={setMap}
        onCenterChanged={(map) => {
          searchAddrFromCoords(map.getCenter(), displayCenterInfo);
          // console.log('map.getCenter: ', map.getCenter());
        }}
      >
        {/* 행정동 위치 표기 */}
        <div
          style={{
            position: 'absolute',
            left: '10px',
            top: '40px',
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
        {/* 검색한 인프라 마커들 */}
        {markers.map((marker) => (
          <MapMarker
            key={`marker-${marker.content}-${marker.position.lat},${marker.position.lng}`}
            position={marker.position}
            onClick={() => setInfo(marker)}
          >
            {info && info.content === marker.content && (
              <div style={{ color: '#000' }}>{marker.content}</div>
            )}
          </MapMarker>
        ))}
        <h2>현재 행정주소에서</h2>
        <button onClick={() => setInfra('동물병원')}>동물 병원 찾기</button>
        <button onClick={() => setInfra('애견미용')}>애견 미용 찾기</button>
      </Map>
    </>
  );
}

export default SearchInfraMap;
