import BBSContent from "./BBSContent";
import BBSUploader from "./BBSUplorder";

interface BBSProps {
  title: string;
  name: string;
  date: Date;
  text: string;
}

interface BBSBodyProps{
  addBbs: (data:BBSProps) => void;
}

const BBSBody = ({addBbs}:BBSBodyProps) => {
  return (
    <>
    <div className="h-dvh">
      <div className="flex justify-center mt-5">
      <p>社内BBS</p>
      </div>
      <div className="pb-24">
      <BBSContent />
      </div>
      <div className="fixed bottom-30 flex justify-center w-full">
      <BBSUploader addBbs={addBbs}/>
      </div>
      </div>
    </>
  );
};

export default BBSBody;
