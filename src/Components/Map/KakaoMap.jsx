/* global kakao */
import { useEffect } from 'react';

function Kmap() {
  const IITP = { lat: 36.3276637140944, lng: 127.4438988132827 };
  const testLoc = '대전광역시 중구 대사동 84-4';
  const { kakao } = window;

  useEffect(() => {
    var container = document.querySelector('.kakao-map');
    var options = {
      center: new kakao.maps.LatLng(IITP),
      level: 3,
    };
    var map = new kakao.maps.Map(container, options);
    var geocoder = new kakao.maps.services.Geocoder();
    geocoder.addressSearch(testLoc, function (result, status) {
      // 정상적으로 검색이 완료됐으면
      if (status === kakao.maps.services.Status.OK) {
        const coords = new kakao.maps.LatLng(result[0].y, result[0].x);
        console.log('result: ', result);
        console.log('coords: ', coords);

        // 결과값으로 받은 위치를 마커로 표시합니다
        const marker = new kakao.maps.Marker({
          map: map,
          position: coords,
        });
        marker.setMap(map);
        // 인포윈도우로 장소에 대한 설명을 표시합니다
        var infowindow = new kakao.maps.InfoWindow({
          content:
            '<div style="width:200px;text-align:center;padding:6px 0;">' +
            '여기가 한밭종합운동장' +
            '</div>',
        });
        infowindow.open(map, marker);

        // 지도의 중심을 결과값으로 받은 위치로 이동시킵니다
        map.setCenter(coords);
      }
    });
    //위도, 경도로 변환 및 마커표시
    // let markerPosition = new kakao.maps.LatLng(IITP);
    // let marker = new kakao.maps.Marker({
    //   position: markerPosition,
    // });
  }, []);
  return (
    <div className="kakao-map" style={{ width: '100%', height: '500px' }}></div>
  );
}

export default Kmap;
