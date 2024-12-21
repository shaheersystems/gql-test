import { gql, useQuery } from "@apollo/client";
import { useParams } from "react-router";

const GET_USER_BY_ID = gql`
  query GetUserById($id: ID!) {
    getUserById(id: $id) {
      id
      name
      email
      isAdmin
    }
  }
`;
const User = () => {
  const { id } = useParams();

  const { data, error, loading } = useQuery(GET_USER_BY_ID, {
    variables: { id },
  });
  console.log("this is id: ", id);

  if (loading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>Error: {error.message}</div>;
  }
  if (!data || !data.getUserById) {
    return <div>No user found</div>;
  }

  return (
    <div>
      <h1>User</h1>
      <div>
        <h2>{data.getUserById.name}</h2>
        <p>{data.getUserById.email}</p>
        <p>{data.getUserById.isAdmin ? "Admin" : "User"}</p>
      </div>
    </div>
  );
};

export default User;
