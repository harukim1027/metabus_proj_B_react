import { useEffect, useState, useRef } from 'react';
import { Map, MapMarker, CustomOverlayMap } from 'react-kakao-maps-sdk';
import './Map.css';

function CyMap() {
  const [openDiv, setOpenDiv] = useState(false);
  const IITP = { lat: 36.3276637140944, lng: 127.4438988132827 };
  return (
    <Map center={IITP} style={{ width: '100%', height: '700px' }}>
      {/* <CustomOverlayMap position={IITP + 5}></CustomOverlayMap> */}
      <MapMarker position={IITP} onClick={() => setOpenDiv(!openDiv)}>
        {openDiv && (
          <div
            className="text-bold text-xl"
            style={{ color: '#000', padding: '20px' }}
          >
            <h2>시설명 : 대전 지식 산업 센터</h2>
            <h2>전화번호 : 010-1111-1111</h2>
          </div>
        )}
      </MapMarker>
    </Map>
  );
}

export default CyMap;
