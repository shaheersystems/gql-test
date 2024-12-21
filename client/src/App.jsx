import { Route, Routes } from "react-router";
import "./App.css";
import Users from "./pages/users";
import User from "./pages/user";

// const GET_USER_BY_ID = gql`
//   query GetUserById($id: ID!) {
//     getUserById(id: $id) {
//       id
//       name
//       email
//       isAdmin
//     }
//   }
// `;

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Users />} />
        <Route path="/users/:id" element={<User />} />
      </Routes>
    </div>
  );
}

export default App;
