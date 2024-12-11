import axios from "axios";

export default async function getUserInfo(tokenInfo) {
  const res = await axios.get(
    `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${tokenInfo?.access_token}`,
    {
      headers: {
        Authorization: `Bearer ${tokenInfo?.access_token}`,
        Accept: "Applicaiton/json",
      },
    }
  );
  const data = res.data;
  localStorage.setItem("user", JSON.stringify(data));
  return data;
}
