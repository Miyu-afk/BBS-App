import BBSContent from "./BBSContent";
import BBSUploader from "./BBSUplorder";

const BBSBody = () => {
  return (
    <>
      <div className="flex justify-center mt-5">
      <p>社内BBS</p>
      </div>
      <div className="pb-24">
      <BBSContent />
      </div>
      <div className="fixed bottom-0 flex justify-center w-full">
      <BBSUploader />
      </div>
    </>
  );
};

export default BBSBody;
