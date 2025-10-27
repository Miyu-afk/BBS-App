import BBSContent from "./BBSContent";
import BBSUploader from "./BBSUploader";

interface BBSProps {
  title: string;
  name: string;
  date: Date;
  text: string;
}


interface BBSBodyProps{
  addBbs: (data:BBSProps) => void;
  alreadyBbs: BBSProps[] | undefined;
  companyIdData: string | null | undefined;
}

const BBSBody = ({addBbs, alreadyBbs, companyIdData}:BBSBodyProps) => {
  

  return (
    <>
    <div className="h-dvh">
      <div className="flex justify-center mt-5">
      <p>社内BBS</p>
      </div>
      <div className="pb-24">
      <BBSContent alreadyBbs={alreadyBbs}/>
      </div>
      <div className="fixed bottom-30 flex justify-center w-full">
      <BBSUploader addBbs={addBbs} companyIdData={companyIdData}/>
      </div>
      </div>
    </>
  );
};

export default BBSBody;
