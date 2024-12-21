import { useQuery, useMutation, gql } from "@apollo/client";
import { Link } from "react-router";

const GET_USERS = gql`
  query GetUsers {
    getUsers {
      id
      name
      email
      isAdmin
    }
  }
`;
const Users = () => {
  const { data, error, loading } = useQuery(GET_USERS);
  if (loading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <>
      <h1>Users</h1>
      <div>
        {data.getUsers.map((item) => {
          return (
            <div key={item.id}>
              <Link to={`/users/${item.id}`}>{item.name}</Link>
              <p>{item.email}</p>
              <p>{item.isAdmin ? "Admin" : "User"}</p>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default Users;
