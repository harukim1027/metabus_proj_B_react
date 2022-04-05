import { useState, useEffect, useMemo } from 'react';
import { CustomOverlayMap, Map, MapMarker } from 'react-kakao-maps-sdk';
import './Map.css';

function MyLocationMap({ setInputAddr, setShowMap }) {
  const [openDiv, setOpenDiv] = useState(false);
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

  const [position, setPosition] = useState();
  const [detailAddr, setDetailAddr] = useState({});
  const [isopen, setIsopen] = useState(true);
  const [map, setMap] = useState();

  const { kakao } = window;
  // 지오코딩
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
  // displayAddressInfo

  // 클릭한 마커 위치(위,경도)를 주소로 변환하기
  useEffect(() => {
    position &&
      searchDetailAddrFromCoords(position.center, function (result, status) {
        if (status === kakao.maps.services.Status.OK) {
          result[0].road_address
            ? setDetailAddr({
                road_addr: result[0].road_address.address_name,
                addr: result[0].address.address_name,
              })
            : setDetailAddr({ addr: result[0].address.address_name });
        } else {
        }
      });
  }, [position]);

  console.log('detailAddr: ', detailAddr, 'position: ', position);
  // console.log('currentLoc: ', currentLoc);
  useEffect(() => {
    console.log('myLoc: ', myLoc);
  }, [myLoc]);
  return (
    <div className="">
      {myLoc.center && (
        <Map
          center={myLoc.center}
          style={{ width: '100%', height: '350px' }}
          level="3"
          onClick={(_t, mouseEvent) => {
            // console.log('mouseEvent: ', mouseEvent);
            setPosition({
              center: {
                lat: mouseEvent.latLng.getLat(),
                lng: mouseEvent.latLng.getLng(),
              },
            });
            // setClickLoc({
            //   center: {
            //     lat: mouseEvent.latLng.getLat(),
            //     lng: mouseEvent.latLng.getLng(),
            //   },
            // });
            setIsopen(true);
          }}
          onCreate={(map) => setMap(map)}
          // 지도 중심의 행정동 표시를 위해 함수 사용
          onCenterChanged={(map) => {
            searchAddrFromCoords(map.getCenter(), displayCenterInfo);
            // console.log('map.getCenter: ', map.getCenter());
          }}
          onDragEnd={(map) => {
            setMyLoc({
              center: { lat: map.getCenter().Ma, lng: map.getCenter().La },
            });
            searchAddrFromCoords(map.getCenter(), displayCenterInfo);
          }}
          className="mt-10"
        >
          {/* 행정동 위치 표기 */}
          <div
            style={{
              position: 'absolute',
              left: '20px',
              top: '100px',
              borderRadius: '2px',
              background: 'rgba(255, 255, 255, 0.8)',
              zIndex: 1,
              padding: '5px',
            }}
          >
            <span className=" font-semibold">지도중심기준 행정동 주소정보</span>
            <br />
            <span id="centerAddr"></span>
          </div>
          {/* ---------- */}

          {/* 클릭한 위치 마커 표시 */}
          {isopen && position && (
            <>
              <MapMarker position={position.center} />
              <CustomOverlayMap position={position.center}>
                <div className="wrap">
                  <div className="info">
                    <div className="title flex justify-between">
                      <h2 className="">법정동 주소정보</h2>
                      <button
                        className="bg-blue-400 hover:bg-black rounded-full px-2 mr-2 text-center text-sm justify-center hover:text-white duration-300"
                        onClick={() => {
                          setIsopen(false);
                        }}
                      >
                        X
                      </button>
                    </div>
                    도로명 주소 :{' '}
                    {detailAddr.road_addr ? detailAddr.road_addr : '없음'}
                    <br />
                    지번 주소 : {detailAddr?.addr}
                  </div>
                </div>
              </CustomOverlayMap>
            </>
          )}

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
          <div
            style={{
              display: 'flex',
              gap: '10px',
            }}
          >
            <button
              className="p-2 bg-green-300 rounded-lg"
              onClick={() => setMyLoc(currentLoc)}
            >
              현재 내 위치 바로가기
            </button>
            {/* 지도에서 선택한 위치 주소 입력 */}
            <button
              onClick={() => {
                setInputAddr(detailAddr.addr);
                setShowMap(false);
              }}
            >
              선택한 주소 입력하기
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

export default MyLocationMap;
