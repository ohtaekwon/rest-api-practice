import { readDB, writeDB } from "../databaseController.js";

const getUsers = () => readDB("users");
const setUsers = (data) => writeDB("users", data);

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
    handler: ({ body, params: { id } }, res) => {
      try {
        const users = getUsers();
        const user = users[id];
        if (!user) throw Error("Not Found User Information");
        res.send(user);
      } catch (err) {
        res.status(404).send({ error: err });
      }
    },
  },
];
export default usersRoute;
