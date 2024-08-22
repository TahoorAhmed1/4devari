import axios from "axios";
import { BASE_URL } from "../../redux/request";
import { message } from "antd";

const signIn = async (email, password) => {
  const data = await axios.post(
    `${BASE_URL}/auth/signInByEmail?email=${email}&password=${password}`,
    {
      email: email,
      password: password,
    },
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
};

const signInByEmail = async (email, password) => {
  const data = await axios.get(
    `${BASE_URL}/auth/signInByEmail?email=${email}&password=${password}`,
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  return data?.data;
};

const signInByUsername = async (email, password) => {
  const data = await axios.post(
    `${BASE_URL}/auth/signInByUsername?email=${email}&password=${password}`,
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
};

const signUpAsEndUser = async (username, email, password) => {
  const data = await axios.post(`${BASE_URL}/auth/signUp`, {
    username: username,
    email: email,
    password: password,
    type: "enduser",
  });
};

const signUpAsStaffUser = async ({
  username,
  email,
  password,
  agency,
  mobileNumbers,
}) => {
  message.open({
    type: "loading",
    content: "Adding agent",
    duration: 0,
  });
  try {
    await axios.post(`${BASE_URL}/auth/signUp`, {
      agency: agency,
      username: username,
      email: email,
      password: password,
      mobileNumbers: mobileNumbers,
      type: "staff",
    });

    message.destroy();
    message.success(
      `Agent added successfully and verification sent to his email`
    );
    return true;
  } catch (error) {
    message.destroy();
    message.error("Invalid request");
    return false;
  }
};

const signUpAsBuilder = async (
  username,
  email,
  password,
  mobileNumber,
  builderName,
  builderAddress,
  builderEmail,
  builderMobile,
  builderWhatsappNumber,
  builderCity
) => {
  const data = await axios.post(`${BASE_URL}/auth/signUp`, {
    username: username,
    email: email,
    password: password,
    type: "builder",
    builderName: builderName,
    mobileNumber: mobileNumber,
    city: builderCity,
    address: builderAddress,
    additionalEmail: builderEmail,
    additionalMobileNumber: builderMobile,
    whatsappNumber: builderWhatsappNumber,
  });
};

const signUpAsAgency = async (
  username,
  email,
  password,
  mobileNumber,
  agencyName,
  agencyCity,
  agencyEmail,
  agencyMobileNumber,
  agencyWhatsappNumber
) => {
  const data = await axios.post(`${BASE_URL}/auth/signUp`, {
    username: username,
    email: email,
    password: password,
    mobileNumber: mobileNumber,
    type: "agency",
    agencyName: agencyName,
    agencyCity: agencyCity,
    agencyEmail: agencyEmail,
    agencyMobileNumber: agencyMobileNumber,
    agencyWhatsappNumber: agencyWhatsappNumber,
  });
};

const googleSignIn = async () => {
  window.open(`${BASE_URL}/auth/google`, "_self");
};

const facebookSignIn = async () => {
  window.open(`${BASE_URL}/auth/facebook`, "_self");
};

const getAllUser = async () => {
  const data = await axios.get(`${BASE_URL}/user/getAllUser`);
  return data?.data;
};
const getAllAgent = async () => {
  const data = await axios.get(`${BASE_URL}/user/getAllAgent`);
  return data?.data;
};

export {
  signIn,
  signInByEmail,
  signUpAsEndUser,
  signUpAsStaffUser,
  signInByUsername,
  signUpAsBuilder,
  signUpAsAgency,
  googleSignIn,
  facebookSignIn,
  getAllUser,
  getAllAgent,
};
