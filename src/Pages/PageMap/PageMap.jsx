import { useApiAxios } from 'api/base';
import CyMap from 'Components/Map/Map';
import { useEffect } from 'react';

function PageMap() {
  // API로 센터 데이터 받기
  const [
    { data: centersData, loading: getCenterLoading, error: getCenterError },
    refetch,
  ] = useApiAxios(
    {
      url: `/streetanimal/api/centers/`,
      method: 'GET',
    },
    {
      manual: true,
    },
  );

  useEffect(() => {
    refetch();
  }, []);
  //-------------------
  // console.log('centersData: ', centersData);

  return <CyMap centersData={centersData} />;
}
export default PageMap;
