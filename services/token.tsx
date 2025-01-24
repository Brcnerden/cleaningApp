import { getAuth } from "firebase/auth";

const getToken = async () => {
  const auth = getAuth();
  const user = auth.currentUser;

  if (user) {
    const token = await user.getIdToken();
    console.log("User Token:", token);
    return token;
  } else {
    throw new Error("Kullanıcı oturum açmamış!");
  }
};

export default getToken;
