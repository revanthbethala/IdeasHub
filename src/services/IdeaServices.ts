import axios from "axios";
import {
  AddVoteType,
  loginDataType,
  projectInfoDataType,
  signUpDataType,
} from "../types";
import Cookies from "js-cookie";
const BASE_URL = "http://localhost:3000/v1";
const token = Cookies.get("token");

export async function UserLogin(loginData: loginDataType) {
  try {
    const res = await axios.post(`${BASE_URL}/auth/login`, loginData, {
      headers: {
        "content-type": "application/json",
      },
    });
    return res.data;
  } catch (e) {
    console.log(e);
    throw e;
  }
}

export async function UserSignUp(signUpDetails: signUpDataType) {
  try {
    const res = await axios.post(`${BASE_URL}/auth/register`, signUpDetails, {
      headers: {
        "content-type": "application/json",
      },
    });
    console.log(res);
    return res.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function GetAllIdeas() {
  try {
    const res = await axios.get(`${BASE_URL}/ideas`);
    return res.data;
  } catch (error) {
    console.error("Error fetching ideas:", error);
    throw error;
  }
}
export async function GetIdeaById(ideaId: string) {
  try {
    const res = await axios.get(`${BASE_URL}/ideas/idea/${ideaId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data;
  } catch (error) {
    console.error("Error fetching ideas:", error);
    throw error;
  }
}

export async function PostUserIdea(projectInfo: projectInfoDataType) {
  try {
    const res = await axios.post(`${BASE_URL}/ideas/idea`, projectInfo, {
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function UpdateIdeaById(
  projectInfo: projectInfoDataType,
  ideaId: string
) {
  try {
    const res = await axios.post(`${BASE_URL}/ideas/idea/${ideaId}`, projectInfo, {
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function DeleteIdea(ideaId: string) {
  try {
    const res = await axios.delete(`${BASE_URL}/ideas/idea/${ideaId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function AddVote({ ideaId, vote }: AddVoteType) {
  try {
    const res = await axios.post(`${BASE_URL}/idea/${ideaId}/vote`, vote, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function removeVote({ ideaId }: AddVoteType) {
  try {
    const res = await axios.delete(`${BASE_URL}/idea/${ideaId}/vote`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
}
