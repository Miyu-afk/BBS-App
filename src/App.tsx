import { useEffect, useState } from "react";
import "./App.css";
import BBSBody from "./components/BBSBody";
import { supabase } from "./lib/supabaseClient";

interface BBSProps {
  id: number;
  title: string;
  name: string;
  date: Date;
  text: string;
  affiliation_id: number;
}

interface NewBBSProps {
  title: string;
  name: string;
  date: Date;
  text: string;
}

interface COMPANYProps {
  id: number;
  company_name: string;
  company_id: number;
}

function App() {
  const [alreadyBbs, setAlreadyBbs] = useState<BBSProps[]>();
  const [companyData, setCompanyData] = useState<COMPANYProps>();
  const [companyIdData, setCompanyIdData] = useState<string | null>();

  const fetchCompany = async () => {
    const companyId = localStorage.getItem("company_id");
    setCompanyIdData(companyId);

    const { data, error } = await supabase
      .from("company_data")
      .select("*")
      .eq("company_id", Number(companyId))
      .single();
    if (error) {
      console.error("Supabase Fetch Error:", error);
      alert("データ取得に失敗しました。");
      return;
    }
    setCompanyData(data as COMPANYProps);
  };

  useEffect(() => {
    fetchCompany();
  }, []);

  const fetchBbs = async () => {
    const { data, error } = await supabase
      .from("AppContent")
      .select("*")
      .eq("affiliation_id", companyIdData);
    if (error) {
      console.error("Supabase Fetch Error:", error);
      alert("データ取得に失敗しました。");
      return;
    }
    setAlreadyBbs(data as BBSProps[]);
  };

  useEffect(() => {
    if (companyIdData) {
      fetchBbs();
    }
  }, [companyIdData]);

  const addBbs = async (newBbsData: NewBBSProps) => {
    const { error } = await supabase.from("AppContent").insert([newBbsData]);
    if (error) {
      console.error("Supabase Insert Error", error);
      alert("登録に失敗しました。");
    } else {
      await fetchBbs();
    }
  };

  const updateBbs = async (
    id: number,
    data: { title: string; text: string }
  ) => {
    const { error } = await supabase
      .from("AppContent")
      .update({
        title: data.title,
        text: data.text,
        date: new Date(),
      })
      .eq("id", id);

    if (error) {
      console.error("Update Error:", error);
      alert("更新に失敗しました。");
    } else {
      await fetchBbs();
    }
  };

  const deleteBbs = async (id: number) => {
    if (!confirm("本当に削除しますか？")) return;

    const { error } = await supabase.from("AppContent").delete().eq("id", id);

    if (error) {
      console.error("Delete Error:", error);
      alert("削除に失敗しました。");
    } else {
      await fetchBbs();
    }
  };

  return (
    <>
      <BBSBody
        addBbs={addBbs}
        alreadyBbs={alreadyBbs}
        companyIdData={companyIdData}
        deleteBbs={deleteBbs}
        updateBbs={updateBbs}
        companyData={companyData}
      />
    </>
  );
}

export default App;
