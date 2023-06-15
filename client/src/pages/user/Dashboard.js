import { useAuth } from "../../context/auth";

export default function Dashboard() {
  // context
  const [auth, setAuth] = useAuth();

  return (
    <>
      <div className="container main-content mb-5">
        <h2>User dashboard</h2>
        <pre>{JSON.stringify(auth, null, 4)}</pre>
      </div>
    </>
  );
}
