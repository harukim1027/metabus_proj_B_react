import { useApiAxios } from 'api/base';
import LoadingIndicator from 'LoadingIndicator';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';

function CentersAnimals() {
  const { centerId } = useParams();
  const [{ data: centersAnimals, loading, error }, refetch] = useApiAxios(
    {
      url: `/streetanimal/api/animalnotpaging/`,
      method: 'GET',
      params: {
        center_name: centerId,
      },
    },
    { manual: true },
  );

  useEffect(() => {
    refetch();
  }, [centerId]);

  return (
    <div className=" mt-20">
      <h2>{centerId}</h2>
      {loading && <LoadingIndicator />}
      {centersAnimals?.map((animal) => (
        <h2>{animal.announce_no}</h2>
      ))}
    </div>
  );
}

export default CentersAnimals;
