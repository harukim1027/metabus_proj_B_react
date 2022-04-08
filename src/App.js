import './App.css';
import { Route, Routes } from 'react-router-dom';
import { useAuth } from 'contexts/AuthContext';
// main
import PageMainScreen from 'Pages/PageMainScreen';
// accounts
import PageLoginForm from 'Pages/PageAccounts/PageLoginForm';
import PageSignupForm from 'Pages/PageAccounts/PageSignupForm';
import PageCheckSignup from 'Pages/PageAccounts/PageCheckSignup';
// admin
import PageAdminMain from 'Pages/PageAdmin/PageAdminMain';
// admin/Animal
import PageAnimalList from 'Pages/PageStreetanimal/PageAnimalList';
import PageAnimalDetail from 'Pages/PageStreetanimal/PageAnimalDetail';
import PageAnimalForm from 'Pages/PageStreetanimal/PageAnimalForm';
// admin/UserManagement
import PageUserManagementIndex from 'Pages/PageUserManagement/PageUserManagementIndex';
import PageUserManagementDetail from 'Pages/PageUserManagement/PageUserManagementDetail';
import PageUserAssignList from 'Pages/PageUserManagement/PageUserAssignList';
import PageUserReviewList from 'Pages/PageUserManagement/PageUserReviewList';
import PageUserInquiryList from 'Pages/PageUserManagement/PageUserInquiryList';
import PageUserFindOwnerBoardList from 'Pages/PageUserManagement/PageUserFindOwnerBoardList';
import PageUserLostPetBoardList from 'Pages/PageUserManagement/PageUserLostPetBoardList';
// admin/assignment
import PageAssignList from 'Pages/PageAssignManagement/PageAssignList';
import PageAssignDetail from 'Pages/PageAssignManagement/PageAssignDetail';
// user/Assignment
import PageAssignCheck from 'Pages/PageAssignment/PageAssignCheck';
import PageAssignmentform from 'Pages/PageAssignment/PageAssignmentForm';
import PageAssignComp from 'Pages/PageAssignment/PageAssignComp';
// inquiry
import PageInquiryIndex from 'Pages/PageInquiry/PageInquiryIndex';
import PageInquiryDetail from 'Pages/PageInquiry/PageInquiryDetail';
import PageInquiryForm from 'Pages/PageInquiry/PageInquiryForm';
// notice
import PageNoticeList from 'Pages/PageNotice/PageNoticeList';
import PageNoticeDetail from 'Pages/PageNotice/PageNoticeDetail';
import PageNoticeForm from 'Pages/PageNotice/PageNoticeForm';
// review
import PageReviewIndex from 'Pages/PageReview/PageReviewIndex';
import PageReviewDetail from 'Pages/PageReview/PageReviewDetail';
import PageReviewForm from 'Pages/PageReview/PageReviewForm';
// mypage
import PageMyinfo from 'Pages/PageMypage/PageMyinfo';
import PageMyAssignInfo from 'Pages/PageMypage/PageMyAssignInfo';
import PageMyReview from 'Pages/PageMypage/PageMyReview';
import PageMyInquiry from 'Pages/PageMypage/PageMyInquiry';
import PageFindId from 'Pages/PageAccounts/PageFindId';
import PageChangePassword from 'Pages/PageAccounts/PageChangePassword';
import PageIntroduceMain from 'Pages/PageIntroduce/PageIntroduceMain';
import PageMyComments from 'Pages/PageMypage/PageMyComments';

// errorpage
import NotFound from 'Components/ErrorPage/NotFound404';
import Forbidden from 'Components/ErrorPage/Forbidden403';
// map
import PageFindOwnerBoardForm from 'Pages/PageFindOwnerBoard/PageFindOwnerBoardForm';
// FindOwnerBoard
// LostPetBoard
import PageLostPetBoardList from 'Pages/PageLostPetBoard/PageLostPetBoardList';
import PageLostPetBoardForm from 'Pages/PageLostPetBoard/PageLostPetBoardForm';
import PageLostPetBoardDetail from 'Pages/PageLostPetBoard/PageLostPetBoardDetail';
import PageFindOwnerBoardDetail from 'Pages/PageFindOwnerBoard/PageFindOwnerBoardDetail';
import PageFindOwnerBoardList from 'Pages/PageFindOwnerBoard/PageFindOwnerBoardList';
import PageTopNav from 'Pages/PageMainMenu';
import PageMyinfoForm from 'Pages/PageMypage/PageMyinfoForm';
import PageAllCenterMap from 'Pages/PageMap/PageAllCenterMap';
import PageMyLocationMap from 'Pages/PageMap/PageMyLocationMap';
import PageSearchInfraMap from 'Pages/PageMap/PageSearchInfraMap';
import CentersAnimals from 'Components/Assignment/CentersAnimals';
import AssignAnimalCheck from 'Components/Assignment/AssignAnimalCheck';

function App() {
  const { auth } = useAuth();
  return (
    <>
      <div className="app header">
        <div className="mainscreen_header">
          <p>
            Contact Us <strong>✉ metabusemail@gmail.com</strong>
          </p>
        </div>
        <Routes>
          <Route path="/" element={<PageMainScreen />} />
          <Route path="/menu/" element={<PageTopNav />} />
          {/* accounts */}
          <Route path="/accounts/login/" element={<PageLoginForm />} />
          <Route path="/accounts/signup/" element={<PageSignupForm />} />
          <Route path="/accounts/checksignup/" element={<PageCheckSignup />} />
          <Route path="/accounts/findid/" element={<PageFindId />} />
          <Route
            path="/accounts/changepassword/"
            element={<PageChangePassword />}
          />
          {/* introduce */}
          <Route path="/introduce/" element={<PageIntroduceMain />} />
          {/* notice */}
          <Route path="/notice/" element={<PageNoticeList />} />
          <Route path="/notice/:noticeId/" element={<PageNoticeDetail />} />
          {/* review */}
          <Route path="/review/" element={<PageReviewIndex />} />
          <Route path="/review/:reviewId/" element={<PageReviewDetail />} />
          {/* findOwnerBoard */}
          <Route path="/findboard/" element={<PageFindOwnerBoardList />} />
          <Route
            path="/findboard/:findboardId/"
            element={<PageFindOwnerBoardDetail />}
          />
          {/* lostPetBoard */}
          <Route path="/lostpetboard/" element={<PageLostPetBoardList />} />
          <Route
            path="/lostpetboard/:lostpetboardId/"
            element={<PageLostPetBoardDetail />}
          />
          {/* ------------admin------------ */}
          {auth?.isLoggedIn && auth?.is_staff && (
            <>
              <Route path="/admin/main/" element={<PageAdminMain />} />

              {/* admin/Animal */}
              <Route path="/admin/animal/" element={<PageAnimalList />} />
              <Route path="/admin/animal/new/" element={<PageAnimalForm />} />
              <Route
                path="/admin/animal/:animalId/edit/"
                element={<PageAnimalForm />}
              />

              {/* /admin/assignmanage/ */}
              <Route path="/admin/assignmanage/" element={<PageAssignList />} />
              <Route
                path="/admin/assignmanage/:assignId/"
                element={<PageAssignDetail />}
              />

              {/* admin/UserManagement */}
              <Route
                path="/admin/usermanage/"
                element={<PageUserManagementIndex />}
              />
              <Route
                path="/admin/usermanage/:userId/"
                element={<PageUserManagementDetail />}
              />
              <Route
                path="/admin/usermanage/:userId/userassign/"
                element={<PageUserAssignList />}
              />

              <Route
                path="/admin/usermanage/:userId/userreview/"
                element={<PageUserReviewList />}
              />

              <Route
                path="/admin/usermanage/:userId/userinquiry/"
                element={<PageUserInquiryList />}
              />

              <Route
                path="/admin/usermanage/:userId/userfindboard/"
                element={<PageUserFindOwnerBoardList />}
              />

              <Route
                path="/admin/usermanage/:userId/userlostpetboard/"
                element={<PageUserLostPetBoardList />}
              />

              {/* admin/inquiry */}
              <Route
                path="/admin/inquiry/:inquiryId/edit/"
                element={<PageInquiryForm />}
              />
              {/* admin/notice */}
              <Route path="/admin/notice/new/" element={<PageNoticeForm />} />
              <Route
                path="/admin/notice/:noticeId/edit/"
                element={<PageNoticeForm />}
              />
            </>
          )}
          {auth?.isLoggedIn && (
            <>
              {/* animalDetail */}
              <Route
                path="/admin/animal/:animalId/"
                element={<PageAnimalDetail />}
              />
              {/* Assignment */}
              <Route
                path="/assignment/check/:animalId/"
                element={<PageAssignCheck />}
              />
              <Route
                path="/assignment/new/:animalId/"
                element={<PageAssignmentform />}
              />
              <Route
                path="/assignment/complite/:assignId/"
                element={<PageAssignComp />}
              />
              <Route
                path="/assignment/:assignId/"
                element={<PageAssignDetail />}
              />

              {/* inquiry */}
              <Route path="/inquiry/" element={<PageInquiryIndex />} />
              <Route
                path="/inquiry/:inquiryId/"
                element={<PageInquiryDetail />}
              />
              <Route path="/inquiry/new/" element={<PageInquiryForm />} />

              {/* mypage */}
              <Route path="/mypage/userinfo/" element={<PageMyinfo />} />

              <Route
                path="/mypage/userinfo/edit"
                element={<PageMyinfoForm />}
              />
              <Route
                path="/mypage/assigninfo/"
                element={<PageMyAssignInfo />}
              />
              <Route path="/mypage/myposts/" element={<PageMyReview />} />
              <Route path="/mypage/mycomments/" element={<PageMyComments />} />
              <Route path="/mypage/myinquiry/" element={<PageMyInquiry />} />

              {/* review */}
              <Route path="/review/new/" element={<PageReviewForm />} />
              <Route
                path="/review/:reviewId/edit/"
                element={<PageReviewForm />}
              />

              {/* findOwnerBoard */}
              <Route
                path="/findboard/new/"
                element={<PageFindOwnerBoardForm />}
              />
              <Route
                path="/findboard/:findBoardId/edit/"
                element={<PageFindOwnerBoardForm />}
              />

              {/* LostPetBoard */}
              <Route
                path="/lostpetboard/new/"
                element={<PageLostPetBoardForm />}
              />
              <Route
                path="/lostpetboard/:lostpetboardId/edit/"
                element={<PageLostPetBoardForm />}
              />
            </>
          )}
          <Route
            path="/assignment/:centerId/centersanimals/"
            element={<CentersAnimals />}
          />
          <Route
            path="/assignment/checkanimal/:animalId/"
            element={<AssignAnimalCheck />}
          />
          <Route path="*" element={<NotFound />} />

          <Route path="/centermap/" element={<PageAllCenterMap />} />
          <Route path="/mylocationmap/" element={<PageMyLocationMap />} />
          <Route path="/searchinframap/" element={<PageSearchInfraMap />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
