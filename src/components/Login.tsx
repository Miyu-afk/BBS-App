import { useState, type FormEvent } from "react";

const Login = () => {
  const [userId, setUserId] = useState("");
  const [companyId, setCompanyId] = useState("");
  const [showLoginForm, setShowLoginForm] = useState("true");
  const [password, setPassword] = useState("");
  const [error, setError] =useState("");

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setError("");
  }


  return (
    <>
      {showLoginForm && (
        <div className="loginForm">
          <form onSubmit={handleSubmit} className="flex flex-col gap-3 justify-center items-center">
          <input
            value={companyId}
            type="text"
            placeholder="企業ID"
            onChange={(e) => setCompanyId(e.target.value)}
            className="input border rounded mt-15 h-7 "
          />
          <input
            value={password}
            type="text"
            onChange={(e) => setPassword(e.target.value)}
            placeholder="PASSWORD"
            className="input border rounded mt-5 h-7 "
          />
          </form>
        <div className="flex items-canter justify-center mt-5">

          <button type="submit" className="btn border rounded p-1 bg-emerald-400">ログイン</button>
        </div>
        </div>
      )}
      
    </>
  );
};

export default Login;
