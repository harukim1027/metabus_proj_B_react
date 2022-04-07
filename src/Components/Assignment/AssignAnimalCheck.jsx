import { useApiAxios } from 'api/base';
import { useAuth } from 'contexts/AuthContext';
import { useEffect } from 'react';
import AwesomeSlider from 'react-awesome-slider';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

function AssignAnimalCheck() {
  const { animalId } = useParams();
  const { auth } = useAuth();
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

  const checkLogin = () => {
    if (auth.isLoggedIn) {
      navigate(`/assignment/check/${animal?.announce_no}/`);
    } else {
      toast.info('크루원 신청을 위해서는 로그인이 필요합니다! 😓 ', {
        position: 'top-center',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        bodyClassName: 'font-bold text-2xl p-5',
      });
      navigate('/accounts/login/');
    }
  };

  return (
    <>
      <div className="m-5 rounded-lg shadow-md mt-20 w-fit p-10">
        <div className="text-base text-blue-900 my-auto">
          <br />

          <h2 className="text-center font-semibold">
            {' '}
            🐶&nbsp; 동물의 상세 정보를 확인하시고 입양 의사를
            결정해주세요.&nbsp; 🐱{' '}
          </h2>
          <br />
        </div>

        {animal && (
          <div>
            <>
              {animal && (
                <>
                  {animal.image_url3 &&
                  animal.image_url2 &&
                  animal.image_url1 ? (
                    <AwesomeSlider
                      className="Container"
                      mobileTouch={true}
                      organicArrows={true}
                      bullets={false}
                    >
                      <span className="content-center h-full w-full">
                        {animal.image_url1 && (
                          <img
                            src={animal.image_url1}
                            alt="동물 이미지1"
                            className="content-center xs:h-full xs:w-full md:w-3/4 md:h-3/4 cursor-pointer"
                            onClick={() => window.open(animal.image_url1)}
                          />
                        )}
                      </span>
                      <span className="content-center h-full w-full">
                        {animal.image_url2 && (
                          <img
                            src={animal.image_url2}
                            alt="동물 이미지2"
                            className="content-center  xs:h-full xs:w-full md:w-3/4 md:h-3/4 cursor-pointer"
                            onClick={() => window.open(animal.image_url2)}
                          />
                        )}
                      </span>
                      <span className="content-center h-full w-full">
                        {animal.image_url3 && (
                          <img
                            src={animal.image_url3}
                            alt="동물 이미지3"
                            className="content-center  xs:h-full xs:w-full md:w-3/4 md:h-3/4 cursor-pointer"
                            onClick={() => window.open(animal.image_url3)}
                          />
                        )}
                      </span>
                    </AwesomeSlider>
                  ) : (
                    <>
                      {animal.image_url1 && animal.image_url2 ? (
                        <AwesomeSlider
                          className="Container"
                          mobileTouch={true}
                          organicArrows={true}
                          bullets={false}
                        >
                          <span className="content-center h-full w-full">
                            {animal.image_url1 && (
                              <img
                                src={animal.image_url1}
                                alt="동물 이미지1"
                                className="content-center  xs:h-full xs:w-full md:w-3/4 md:h-3/4 cursor-pointer"
                                onClick={() => window.open(animal.image_url1)}
                              />
                            )}
                          </span>
                          <span className="content-center h-full w-full">
                            {animal.image_url2 && (
                              <img
                                src={animal.image_url2}
                                alt="동물 이미지2"
                                className="content-center  xs:h-full xs:w-full md:w-3/4 md:h-3/4 cursor-pointer"
                                onClick={() => window.open(animal.image_url2)}
                              />
                            )}
                          </span>
                        </AwesomeSlider>
                      ) : (
                        <>
                          {animal.image_url1 && (
                            <span className="h-full w-full">
                              {animal.image_url1 && (
                                <img
                                  src={animal.image_url1}
                                  alt="동물 이미지1"
                                  className="content-center  md:mx-20  xs:h-full xs:w-full md:w-3/4 md:h-3/4 cursor-pointer"
                                  onClick={() => window.open(animal.image_url3)}
                                />
                              )}
                            </span>
                          )}
                        </>
                      )}
                    </>
                  )}
                </>
              )}
            </>

            <table className="mb-5 mr-5 mt-6 border text-center min-w-full divide-y divide-gray-200">
              <tr className="sm:w-full">
                <th className="border border-slate-200 bg-gray-50 px-3 py-3 text-center xs:text-base sm:text-xl font-bold text-gray-500 tracking-wider">
                  공고번호
                </th>
                <td className="text-left">&nbsp;&nbsp;{animal.announce_no}</td>
              </tr>
              <tr className="sm:w-full">
                <th className="border border-slate-200 bg-gray-50 px-3 py-3 text-center xs:text-base sm:text-xl font-bold text-gray-500 tracking-wider">
                  축종
                </th>
                <td className="text-left">
                  &nbsp;&nbsp;{animal.kind_of_animal}
                </td>
              </tr>
              <tr className="sm:w-full">
                <th className="border border-slate-200 bg-gray-50 px-3 py-3 text-center xs:text-base sm:text-xl font-bold text-gray-500 tracking-wider">
                  품종
                </th>
                <td className="text-left">&nbsp;&nbsp;{animal.breed}</td>
              </tr>
              <tr className="sm:w-full">
                <th className="border border-slate-200 bg-gray-50 px-3 py-3 text-center xs:text-base sm:text-xl font-bold text-gray-500 tracking-wider">
                  털색
                </th>
                <td className="text-left">&nbsp;&nbsp;{animal.color}</td>
              </tr>

              <tr className="sm:w-full">
                <th className="border border-slate-200 bg-gray-50 px-3 py-3 text-center xs:text-base sm:text-xl font-bold text-gray-500 tracking-wider">
                  성별
                </th>
                <td className="text-left">&nbsp;&nbsp;{animal.sex}</td>
              </tr>

              <tr className="sm:w-full">
                <th className="border border-slate-200 bg-gray-50 px-3 py-3 text-center xs:text-base sm:text-xl font-bold text-gray-500 tracking-wider">
                  나이
                </th>
                <td className="text-left">&nbsp;&nbsp;{animal.age}</td>
              </tr>
              <tr className="sm:w-full">
                <th className="border border-slate-200 bg-gray-50 px-3 py-3 text-center xs:text-base sm:text-xl font-bold text-gray-500 tracking-wider">
                  체중
                </th>
                <td className="text-left">&nbsp;&nbsp;{animal.weight} kg</td>
              </tr>
              <tr className="sm:w-full">
                <th className="border border-slate-200 bg-gray-50 px-3 py-3 text-center xs:text-base sm:text-xl font-bold text-gray-500 tracking-wider">
                  발견 장소
                </th>
                <td className="text-left">
                  &nbsp;&nbsp;{animal.place_of_discovery}
                </td>
              </tr>
              <tr className="sm:w-full">
                <th className="border border-slate-200 bg-gray-50 px-3 py-3 text-center xs:text-base sm:text-xl font-bold text-gray-500 tracking-wider">
                  접수 일자
                </th>
                <td className="text-left">
                  &nbsp;&nbsp;{animal.date_time_of_receipt}
                </td>
              </tr>
              <tr className="sm:w-full">
                <th className="border border-slate-200 bg-gray-50 px-3 py-3 text-center xs:text-base sm:text-xl font-bold text-gray-500 tracking-wider">
                  중성화 여부
                </th>
                <td className="text-left">&nbsp;&nbsp;{animal.neutering}</td>
              </tr>
              <tr className="sm:w-full">
                <th className="border border-slate-200 bg-gray-50 px-3 py-3 text-center xs:text-base sm:text-xl font-bold text-gray-500 tracking-wider">
                  중성화 여부
                </th>
                <td className="text-left">&nbsp;&nbsp;{animal.neutering}</td>
              </tr>
              <tr className="sm:w-full">
                <th className="border border-slate-200 bg-gray-50 px-3 py-3 text-center xs:text-base sm:text-xl font-bold text-gray-500 tracking-wider">
                  특징
                </th>
                <td className="text-left">&nbsp;&nbsp;{animal.info}</td>
              </tr>
              <tr className="sm:w-full">
                <th className="border border-slate-200 bg-gray-50 px-3 py-3 text-center xs:text-base sm:text-xl font-bold text-gray-500 tracking-wider">
                  관할 지역
                </th>
                <td className="text-left">
                  &nbsp;&nbsp;{animal.competent_organization}
                </td>
              </tr>
              <tr className="sm:w-full">
                <th className="border border-slate-200 bg-gray-50 px-3 py-3 text-center xs:text-base sm:text-xl font-bold text-gray-500 tracking-wider">
                  보호 상태
                </th>
                <td className="text-left">
                  &nbsp;&nbsp;{animal.protect_status}
                </td>
              </tr>
              <tr className="sm:w-full">
                <th className="border border-slate-200 bg-gray-50 px-3 py-3 text-center xs:text-base sm:text-xl font-bold text-gray-500 tracking-wider">
                  보호중 센터
                </th>
                <td className="text-left">
                  &nbsp;&nbsp;{animal.center_name.center_name}
                </td>
              </tr>
              <tr className="sm:w-full">
                <th className="border border-slate-200 bg-gray-50 px-3 py-3 text-center xs:text-base sm:text-xl font-bold text-gray-500 tracking-wider">
                  보호 센터 전화번호
                </th>
                <td className="text-left">
                  &nbsp;&nbsp;{animal.center_name.center_call}
                </td>
              </tr>
            </table>
          </div>
        )}
        <div className="text-right">
          <button
            onClick={() => checkLogin()}
            className="text-xl font-bold text-white  hover:bg-blue-300 bg-blue-900 hover:text-white p-2 rounded-lg "
          >
            입양 신청하기
          </button>
        </div>
      </div>
      <button
        onClick={() => navigate('/')}
        className="font-bold bg-green-300 hover:bg-green-900 text-white p-2 rounded-lg ml-4 mb-5"
      >
        Home
      </button>
    </>
  );
}
export default AssignAnimalCheck;
