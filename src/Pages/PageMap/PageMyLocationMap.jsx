import { useApiAxios } from 'api/base';
import MyLocationMap from 'Components/Map/MyLocationMap';
import LoadingIndicator from 'LoadingIndicator';
import { useEffect } from 'react';

function PageMyLocationMap({ setInputAddr, setShowMap }) {
  return (
    <>
      <MyLocationMap setInputAddr={setInputAddr} setShowMap={setShowMap} />
    </>
  );
}
export default PageMyLocationMap;
