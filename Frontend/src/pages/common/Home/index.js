import { Col, message, Row } from "antd";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllExams } from "../../../apicalls/exams";
import { HideLoading, ShowLoading } from "../../../redux/loaderSlice";
import PageTitle from "../../../components/PageTitle";
import { useNavigate } from "react-router-dom";
function Home() {
  const [exams, setExams] = React.useState([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.users);
  const getExams = async () => {
    try {
      dispatch(ShowLoading());
      const response = await getAllExams();
      if (response.success) {
        setExams(response.data);
      } else {
        message.error(response.message);
      }
      dispatch(HideLoading());
    } catch (error) {
      dispatch(HideLoading());
      message.error(error.message);
    }
  };

  useEffect(() => {
    getExams();
  }, []);

  return (
    user && (
      <div className="mt-2">
        <PageTitle title={`Hi ${user.name},`} />
        <p className="text-purple text-xl ">Welcome to Quiz Section</p>

        <Row gutter={[16, 16]}>
          {exams.map((exam) => (
            <Col span={6} >
              <div className="card-lg flex flex-col gap-1 p-3 bd ">
                <h1 className="text-2xl text-white p-2">{exam?.name}</h1>

                <h1 className="text-md  text-white p-2">Category : {exam.category}</h1>

                <h1 className="text-md  text-white p-2">Total Marks : {exam.totalMarks}</h1>
                <h1 className="text-md  text-white p-2">Passing Marks : {exam.passingMarks}</h1>
                <h1 className="text-md  text-white p-2">Duration : {exam.duration}</h1>

                <button
                  className="primary-outlined-btn mft-20"
                  onClick={() => navigate(`/user/write-exam/${exam._id}`)}
                >
                  Start Quiz
                </button>
              </div>
            </Col>
          ))}
        </Row>
      </div>
    )
  );
}

export default Home;
