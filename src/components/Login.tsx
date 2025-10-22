import { useState, type FormEvent } from "react";
import { supabase } from "../lib/supabaseClient";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [companyId, setCompanyId] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setError("");

    // 入力値を安全に変換
    const companyIdNumber = Number(companyId.trim());
    const passwordTrimmed = password.trim();

    if (isNaN(companyIdNumber)) {
      setError("企業IDは数字で入力してください");
      return;
    }

    try {
      const { data, error } = await supabase
        .from("company_data")  // 正しいテーブル名
        .select("*")
        .eq("company_id", companyIdNumber)
        .eq("pass", passwordTrimmed);

      console.log("Supabase RESULT:", { data, error });

      if (error) {
        setError("データベースの取得に失敗しました");
        console.error(error);
        return;
      }

      if (!data || data.length === 0) {
        setError("ユーザーIDまたはパスワードが間違っています");
        return;
      }

      // ログイン成功
      localStorage.setItem("company_id", String(data[0].company_id));
      navigate("/main");
    } catch (err) {
      console.error("予期せぬエラー:", err);
      setError("ログイン中にエラーが発生しました");
    }
  };

  return (
    <div className="loginForm flex flex-col gap-3 justify-center items-center mt-15">
      <form onSubmit={handleSubmit} className="flex flex-col gap-3 w-64">
        <input
          value={companyId}
          type="text"
          placeholder="企業ID"
          onChange={(e) => setCompanyId(e.target.value)}
          className="input border rounded h-7"
        />
        <input
          value={password}
          type="password"
          placeholder="PASSWORD"
          onChange={(e) => setPassword(e.target.value)}
          className="input border rounded h-7"
        />
        <button
          type="submit"
          className="btn border rounded p-1 bg-emerald-400 mt-2"
        >
          ログイン
        </button>
      </form>
      {error && <p className="text-red-500 mt-2">{error}</p>}
    </div>
  );
};

export default Login;
