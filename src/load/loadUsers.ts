import { session } from "./loadInstance";
import generator from "generate-password";

export default async (users: any[]) => {
  const cleanedUpUsers = users.map((user) => {
    delete user.last_page;
    delete user.token;
    user.password = getNewPassword();
    return user;
  });
  for (const user of cleanedUpUsers) {
    try {
      await session.post("users", user);
      console.log("Uploaded Users");
    } catch (error) {
      console.log("Error uploading user.", error.response.data.errors);
    }
  }
};

const getNewPassword = () => {
  return generator.generate({
    length: 12,
    numbers: true,
  });
};
