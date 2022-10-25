import { readDB, writeDB } from "../dbController.js";

const getUsers = () => readDB("users");
// const setUsers = (data) => writeDB("users", data);

const usersRoute = [
  {
    // Get Users
    method: "get",
    route: "/users",
    handler: (req, res) => {
      const users = getUsers();
      res.send(users);
    },
  },
  {
    // Get User
    method: "get",
    route: "/users/:id",
    handler: ({ params: { id } }, res) => {
      try {
        const users = getUsers();
        const user = users[id];
        if (!user) throw Error("사용자가 없습니다.");
        res.send(user);
      } catch (error) {
        res.status(404).send({ error: error });
      }
    },
  },
  {
    method: "post",
    route: "/users/:id",
    handler: ({ body, params: { id } }, res) => {
      const users = getUsers();
      res.send(users);
    },
  },
  {
    method: "put",
    route: "/users/:id",
    handler: ({ body, params: { id } }, res) => {
      const users = getUsers();
      res.send(users);
    },
  },
  {
    method: "delete",
    route: "/users/:id",
    handler: ({ body, params: { id } }, res) => {
      const users = getUsers();
      res.send(users);
    },
  },
];
export default usersRoute;
