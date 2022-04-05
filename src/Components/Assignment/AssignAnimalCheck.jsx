import { useApiAxios } from 'api/base';
import { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

function AssignAnimalCheck() {
  const { animalId } = useParams();
  const navigate = useNavigate();

  const [{ data: animal, loading, error }, refetch] = useApiAxios(
    {
      url: `/streetanimal/api/animal/${animalId}/`,
      method: 'GET',
    },
    { manual: true },
  );

  useEffect(() => {
    refetch();
  }, []);
  return (
    <>
      <div className="m-5 rounded-lg shadow-lg mt-20 w-fit p-10">
        <h2 className="text-center text-2xl">
          동물의 상세 정보를 확인하시고 입양 의사를 결정해주세요.
        </h2>
        {animal && (
          <div>
            <img
              src={animal.image_url1}
              alt=""
              className="w-52 inline cursor-pointer"
              onClick={() => window.open(animal.image_url1)}
            />
            <img
              src={animal.image_url2}
              alt=""
              className="w-52 inline cursor-pointer"
              onClick={() => window.open(animal.image_url2)}
            />
            <img
              src={animal.image_url3}
              alt=""
              className="w-52 inline cursor-pointer"
              onClick={() => window.open(animal.image_url3)}
            />
            <h2 className="">공고번호 : {animal.announce_no}</h2>
            <h2 className="">
              품종 : {animal.kind_of_animal} &gt; {animal.breed}
            </h2>
            <h2 className="">털색 : {animal.color}</h2>
            <h2 className="">성별 : {animal.sex}</h2>
            <h2 className="">나이 : {animal.age}</h2>
            <h2 className="">체중 : {animal.weight} kg</h2>
            <h2 className="">발견 장소 : {animal.place_of_discovery}</h2>
            <h2 className="">접수 일자 : {animal.date_time_of_receipt}</h2>
            <h2 className="">중성화 여부 : {animal.neutering}</h2>
            <h2 className="">특징 : {animal.info}</h2>
            <h2 className="">관할 : {animal.competent_organization}</h2>
            <h2 className="">보호 상태 : {animal.protect_status}</h2>
            <h2 className="">
              보호 중인 센터 : {animal.center_name.center_name}
            </h2>
            <h2 className="">
              센터 전화 번호 : {animal.center_name.center_call}
            </h2>
          </div>
        )}
      </div>
      <button
        onClick={() => window.history.back()}
        className="bg-green-300 hover:bg-green-900 hover:text-white p-2 rounded-lg ml-4"
      >
        돌아가기
      </button>
      <button
        onClick={() => navigate(`/assignment/check/${animal?.announce_no}/`)}
        className="bg-green-300 hover:bg-green-900 hover:text-white p-2 rounded-lg ml-4"
      >
        입양 신청하기
      </button>
    </>
  );
}
export default AssignAnimalCheck;
