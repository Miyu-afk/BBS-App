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
  const companyBbsLength = alreadyBbs?.filter(
    (i) => i.affiliation_id === Number(companyIdData)
  );

  const handleTop = () => {
    document.getElementById("scrollButton")?.addEventListener("click", function(){
      window.scrollTo({ top: 0, behavior: "smooth"});
    });
  }

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

        <p className="absolute top-8 right-5 md:text-lg">
          全{companyBbsLength?.length}件
        </p>
        <div className="overflow-y-auto pb-80">
          <BBSContent
            alreadyBbs={alreadyBbs}
            updateBbs={updateBbs}
            deleteBbs={deleteBbs}
          />
        </div>
        <div className="fixed bottom-20 flex justify-center w-full bg-white">
          <BBSUploader addBbs={addBbs} companyIdData={companyIdData} />
        </div>
        <div className="fixed bottom-10 right-10 flex justify-end  w-full bg-white">
          <button id="scrollButton" onClick={handleTop}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              className="size-6"
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
