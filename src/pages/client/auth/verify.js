import React, { useState, useEffect } from "react";
import styled from "styled-components";
import loginLogo from "./../../../assets/images/logo1.svg";
import logo from "./../../../assets/images/Perceptive_Panda_Logo_light.png";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams, useNavigate } from "react-router-dom";

import Button from "../../../components/basics/button";
import { resendVerifyEmail } from "../../../action/api";
import useToken from "./useToken";
import VerifiedSignin from "./verifiedSignin";
import {
  globalColor,
  center_pos,
  font_dispaly_xs_Semibold,
  font_text_sm_Regular,
  font_text_sm_Semibold,
  font_text_md_Regular,
} from "../../../assets/variable/global";

export default function Verify(props) {
  const [searchParams] = useSearchParams();
  let navigate = useNavigate();
  // Extract the parameters
  const authCode = searchParams.get("auth-code");
  const email = searchParams.get("email") || "olivia@aceme.com";
  const isExpired = searchParams.get("bool");
  const [state, setState] = useState(isExpired ? isExpired : "0");
  const [step, setStep] = useState(
    isExpired == 0 ? 2 : isExpired ? isExpired : 0
  );
  const dispatch = useDispatch();
  useEffect(() => {
    if (step === 2) {
      if (state === "0") {
        navigate("/creator-dashboard/verify-signin");
      }
    }
  }, [state, step]);
  function resendVerifyEmailBtn() {
    if (authCode) {
      resendVerifyEmail(authCode)(dispatch)
        .then((res) => {
          window.location.href = "/creator-dashboard/verify?email=" + email;
        })
        .catch((error) => {
          alert("Error");
        });
    }
  }

  return step === 2 ? (
    <VerifiedSignin />
  ) : (
    <VerifyWrapper>
      <LeftSide>
        <img src={logo} alt="Sign Logo Img" style={center_pos} />
      </LeftSide>
      <RightSide>
        <div style={center_pos}>
          <h2 style={font_dispaly_xs_Semibold}>
            {state == 0
              ? "Verify your email address"
              : "Your verification link has expired"}
          </h2>
          {state == 0 ? (
            <p style={font_text_md_Regular}>
              To confirm your email address we've sent a verification link to{" "}
              <span style={{ fontWeight: "bold" }}>{email}</span>
            </p>
          ) : (
            <p>
              To complete your account creation, please request a new
              verification email to{" "}
              <span style={{ fontWeight: "bold" }}>{email}</span>
            </p>
          )}
          {state == 0 ? (
            <div style={font_text_sm_Regular}>
              Didn't receive a confirmation link? &nbsp;
              <a
                href="/creator-dashboard/create-account"
                style={font_text_sm_Semibold}
              >
                Resend it
              </a>
            </div>
          ) : (
            <div style={{ marginBottom: "20px" }}>
              <Button
                title={"Resend Verification Email"}
                width="full"
                onClickBtn={() => {
                  resendVerifyEmailBtn();
                }}
              />
            </div>
          )}
          <div>
            <a
              href="/creator-dashboard/create-account/"
              style={font_text_sm_Semibold}
            >
              <i className="fas fa-arrow-left"></i> &nbsp; Back
            </a>
          </div>
        </div>
      </RightSide>
    </VerifyWrapper>
  );
}

const VerifyWrapper = styled.div`
  display: flex;
  width: 100%;
  div {
    width: 100%;
  }
`;
const LeftSide = styled.div`
  position: relative;
  display: flex;
  width: 50%;
  background-color: ${globalColor.primary_800};
  min-height: 100vh;
  height: 100%;
  img {
    display: block;
    max-width: 400px;
  }
`;
const RightSide = styled.div`
  position: relative;
  display: flex;
  width: 50%;
  background-color: ${globalColor.gray_200};
  min-height: 100vh;
  height: 100%;
  text-align: center;
  > div {
    max-width: 420px;
    padding: 20px;
    width: 100%;
  }
`;
