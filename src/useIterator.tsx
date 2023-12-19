import { useState } from "react";
import { User } from "./types";
import { getName } from "./utils/functions";

const useIterator = (
  url: string
): [User[], User | null, boolean, () => void, () => void] => {
  const [userList, setUserList] = useState<User[]>([]);
  const [current, setCurrent] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  async function fetchUser() {
    setIsLoading(true);
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        const { name, login, picture } = data.results[0];

        const newUser = {
          name: getName(name),
          user: login.username,
          picture: picture.thumbnail,
        };

        setUserList((prevUsers) => [...prevUsers, newUser]);
        setCurrent(newUser);
      })
      .catch((error) => {
        setIsLoading(false);
        console.log("Error to search users", error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  async function next() {
    if (
      userList.length === 0 ||
      current?.name === userList[userList.length - 1].name
    ) {
      await fetchUser();
    } else {
      const indexOfCurrentUser = userList.findIndex(
        (user) => current?.name === user.name
      );

      setCurrent(userList[indexOfCurrentUser + 1]);
    }
  }

  function previous() {
    const indexOfCurrentUser = userList.findIndex(
      (user) => current?.name === user.name
    );

    if (userList.length > 0 && userList[indexOfCurrentUser - 1]) {
      setCurrent(userList[indexOfCurrentUser - 1]);
    }
  }

  return [userList, current, isLoading, next, previous];
};

export default useIterator;
