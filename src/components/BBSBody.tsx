import BBSContent from "./BBSContent";
import BBSUploader from "./BBSUploader";

interface BBSProps {
  id: number
  title: string;
  name: string;
  date: Date;
  text: string;
}

interface NewBBSProps {
  title: string;
  name: string;
  date: Date;
  text: string;
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
}

const BBSBody = ({
  addBbs,
  alreadyBbs,
  companyIdData,
  deleteBbs,
  updateBbs,
}: BBSBodyProps) => {
  return (
    <>
      <div className="h-dvh">
        <div className="flex justify-center mt-5">
          <p>社内BBS</p>
        </div>
        <div className="pb-24">
          <BBSContent
            alreadyBbs={alreadyBbs}
            updateBbs={updateBbs}
            deleteBbs={deleteBbs}
          />
        </div>
        <div className="fixed bottom-30 flex justify-center w-full">
          <BBSUploader addBbs={addBbs} companyIdData={companyIdData} />
        </div>
      </div>
    </>
  );
};

export default BBSBody;
