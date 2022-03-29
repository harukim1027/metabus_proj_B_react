import { useApiAxios } from 'api/base';
import MyLocationMap from 'Components/Map/MyLocationMap';
import LoadingIndicator from 'LoadingIndicator';
import { useEffect } from 'react';

function PageMyLocationMap() {
  return (
    <>
      <MyLocationMap />
    </>
  );
}
export default PageMyLocationMap;
