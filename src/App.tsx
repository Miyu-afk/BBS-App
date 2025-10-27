import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import BBSBody from "./components/BBSBody";
import { supabase } from "./lib/supabaseClient";
import { useNavigate } from "react-router-dom";


interface BBSProps {
  title: string;
  name: string;
  date: Date;
  text: string;
}


interface COMPANYProps {
  id: number;
  name: string;
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

  const addBbs = async (newBbsData: BBSProps) => {
    const { error } = await supabase.from("AppContent").insert([newBbsData]);
    if (error) {
      console.error("Supabase Insert Error", error);
      alert("登録に失敗しました。");
    } else {
      await fetchBbs();
    }
  };
  

  return (
    <>
      <BBSBody addBbs={addBbs} alreadyBbs={alreadyBbs} companyIdData={companyIdData}/>
    </>
  );
}

export default App;
