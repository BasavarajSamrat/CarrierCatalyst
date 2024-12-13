// import React from "react";
// import PageTitle from "../../../components/PageTitle";
// import { message, Modal, Table } from "antd";
// import { useDispatch } from "react-redux";
// import { HideLoading, ShowLoading } from "../../../redux/loaderSlice";
// import { getAllReportsByUser } from "../../../apicalls/reports";
// import { useEffect } from "react";
// import moment from "moment";

// function UserReports() {
//   const [reportsData, setReportsData] = React.useState([]);
//   const dispatch = useDispatch();
//   const columns = [
//     {
//       title: "Exam Name",
//       dataIndex: "examName",
//       render: (text, record) => <>{record.exam.name}</>,
//     },
//     {
//       title: "Date",
//       dataIndex: "date",
//       render: (text, record) => (
//         <>{moment(record.createdAt).format("DD-MM-YYYY hh:mm:ss")}</>
//       ),
//     },
//     {
//       title: "Total Marks",
//       dataIndex: "totalQuestions",
//       render: (text, record) => <>{record.exam.totalMarks}</>,
//     },
//     {
//       title: "Passing Marks",
//       dataIndex: "correctAnswers",
//       render: (text, record) => <>{record.exam.passingMarks}</>,
//     },
//     {
//       title: "Obtained Marks",
//       dataIndex: "correctAnswers",
//       render: (text, record) => <>{record.result.correctAnswers.length}</>,
//     },
//     {
//       title: "Verdict",
//       dataIndex: "verdict",
//       render: (text, record) => <>{record.result.verdict}</>,
//     },
//   ];

//   const getData = async () => {
//     try {
//       dispatch(ShowLoading());
//       const response = await getAllReportsByUser();
//       if (response.success) {
//         setReportsData(response.data);
//       } else {
//         message.error(response.message);
//       }
//       dispatch(HideLoading());
//     } catch (error) {
//       dispatch(HideLoading());
//       message.error(error.message);
//     }
//   };

//   useEffect(() => {
//     getData();
//   }, []);

//   return (
//     <div className="">
//       <PageTitle title="Reports" />
//       <div className="divider text-white bg-first"></div>
//       <Table  style={{ backgroundColor: "black", color: "white" }} columns={columns} dataSource={reportsData} />
//     </div>
//   );
// }

// export default UserReports;

import React, { useEffect, useState } from "react";
import PageTitle from "../../../components/PageTitle";
import { message, Table } from "antd";
import { useDispatch } from "react-redux";
import { HideLoading, ShowLoading } from "../../../redux/loaderSlice";
import { getAllReportsByUser } from "../../../apicalls/reports";
import moment from "moment";

function UserReports() {
  const [reportsData, setReportsData] = useState([]);
  const dispatch = useDispatch();

  const columns = [
    {
      title: "Exam Name",
      dataIndex: "examName",
      render: (text, record) => <>{record?.exam?.name || "N/A"}</>,
    },
    {
      title: "Date",
      dataIndex: "date",
      render: (text, record) =>
        record?.createdAt ? (
          <>{moment(record.createdAt).format("DD-MM-YYYY hh:mm:ss")}</>
        ) : (
          "N/A"
        ),
    },
    {
      title: "Total Marks",
      dataIndex: "totalQuestions",
      render: (text, record) => <>{record?.exam?.totalMarks || "N/A"}</>,
    },
    {
      title: "Passing Marks",
      dataIndex: "correctAnswers",
      render: (text, record) => <>{record?.exam?.passingMarks || "N/A"}</>,
    },
    {
      title: "Obtained Marks",
      dataIndex: "correctAnswers",
      render: (text, record) =>
        record?.result?.correctAnswers?.length ?? "N/A",
    },
    {
      title: "Verdict",
      dataIndex: "verdict",
      render: (text, record) => <>{record?.result?.verdict || "N/A"}</>,
    },
  ];

  const getData = async () => {
    try {
      dispatch(ShowLoading());
      const response = await getAllReportsByUser();
      if (response.success) {
        setReportsData(response.data);
      } else {
        message.error(response.message);
      }
    } catch (error) {
      message.error(error.message);
    } finally {
      dispatch(HideLoading());
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div>
      <PageTitle title="Reports" />
      <div className="divider"></div>
      <Table
        columns={columns}
        dataSource={reportsData}
        rowKey={(record) => record?._id || Math.random()}
      />
    </div>
  );
}

export default UserReports;
