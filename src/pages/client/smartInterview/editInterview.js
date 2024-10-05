import React from "react";
import { useParams, useLocation } from "react-router-dom";
import EditInterviewNotActivated from "./editInterviewNotActivated";
import EditInterviewActivated from "./editInterviewActivated";

export default function EditInterview(props) {
  const { id } = useParams();
  const location = useLocation();

  return id === "1" ? (
    <EditInterviewActivated />
  ) : (
    <EditInterviewNotActivated id={id} slate={location.state} />
  );
}
