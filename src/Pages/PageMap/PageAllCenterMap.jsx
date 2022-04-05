import { useApiAxios } from 'api/base';
import AllCenterMap from 'Components/Map/AllCenterMap';
import LoadingIndicator from 'LoadingIndicator';
import { useEffect } from 'react';

function PageAllCenterMap({ ismain }) {
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

  return (
    <>
      {getCenterLoading && <LoadingIndicator />}
      <AllCenterMap centersData={centersData} ismain={ismain} />
    </>
  );
}
export default PageAllCenterMap;
