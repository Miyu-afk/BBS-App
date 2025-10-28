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

  const companyBbsLength = alreadyBbs?.filter((i) => i.affiliation_id === Number(companyIdData))

  return (
    <>
      <div className="h-dvh">
        <div className="flex justify-center mt-5">
          <p>{companyData ? companyData.company_name : null}</p>
        </div>
        <div className="flex justify-center">
          <p>社内BBS</p>
        </div>
          <p className="absolute top-8 right-5">全{companyBbsLength?.length}件</p>
        <div className="pb-24">
          <BBSContent
            alreadyBbs={alreadyBbs}
            updateBbs={updateBbs}
            deleteBbs={deleteBbs}
          />
        </div>
        <div className="fixed bottom-30 flex justify-center w-full bg-white">
          <BBSUploader addBbs={addBbs} companyIdData={companyIdData} />
        </div>
      </div>
    </>
  );
};

export default BBSBody;
