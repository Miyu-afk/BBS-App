import { useState } from "react";
import BBSContent from "./BBSContent";
import BBSUploader from "./BBSUploader";

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

interface BBSBodyProps {
  addBbs: (data: NewBBSProps) => void;
  alreadyBbs: BBSProps[] | undefined;
  companyIdData: string | null | undefined;
  updateBbs: (
    id: number,
    data: { title: string; text: string }
  ) => Promise<void>;
  deleteBbs: (id: number) => void;
  companyData: COMPANYProps | undefined;
}

const BBSBody = ({
  addBbs,
  alreadyBbs,
  companyIdData,
  deleteBbs,
  updateBbs,
  companyData,
}: BBSBodyProps) => {
  const [dateValue, setDateValue] = useState<string | null>("");

  const companyBbsLength = alreadyBbs?.filter(
    (i) => i.affiliation_id === Number(companyIdData)
  );

  const handleTop = () => {
    document
      .getElementById("scrollButton")
      ?.addEventListener("click", function () {
        window.scrollTo({ top: 0, behavior: "smooth" });
      });
  };

  const handleClear = () => {
    setDateValue("");
  };

  const filteredBbs = alreadyBbs?.filter((bbs) => {
    if (!dateValue) return true;
    const bbsDate = new Date(bbs.date).toISOString().split("T")[0];
    return bbsDate === dateValue;
  });

  return (
    <>
      <div className="h-dvh">
        <div>
          <div className="flex justify-center mt-5">
            <p className="text-lg md:text-2xl">
              {companyData ? companyData.company_name : null}
            </p>
          </div>
          <div className="flex justify-center">
            <p className="md:text-xl">社内BBS</p>
          </div>
        </div>
        <div className="flex justify-center items-center">
          <p className="items-center mr-2 mt-1">日付で検索 : </p>
          <input
            type="date"
            id="date"
            value={dateValue ?? ""}
            onChange={(e) => setDateValue(e.target.value)}
          ></input>
          <button className="border rounded p-1 ml-2" onClick={handleClear}>
            クリア
          </button>
        </div>

        <p className="absolute top-8 right-5 md:text-lg">
          全{companyBbsLength?.length}件
        </p>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 px-4 lg:px-10 lg:mt-15">
          <div className="overflow-y-auto pb-80">
            <BBSContent
              alreadyBbs={alreadyBbs}
              updateBbs={updateBbs}
              deleteBbs={deleteBbs}
              filteredBbs={filteredBbs}
            />
          </div>
          <div className="lg:sticky h-fit top-10">
            <div className="fixed bottom-20 lg:top-20 lg:sticky flex justify-center w-full bg-white">
              <BBSUploader addBbs={addBbs} companyIdData={companyIdData} />
            </div>
          </div>
        </div>
        <div className="fixed bottom-10 right-10 flex justify-end  w-full">
          <button id="scrollButton" onClick={handleTop}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              className="size-6 bg-white"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="m4.5 15.75 7.5-7.5 7.5 7.5"
              />
            </svg>
          </button>
        </div>
      </div>
    </>
  );
};

export default BBSBody;
