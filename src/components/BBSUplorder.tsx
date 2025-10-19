const BBSUploader = () => {
  return (
    <>
      <div className="flex justify-center mt-5">
        <div className="shadow w-5/6 rounded">
          <div className="flex justify-center items-center">
            <input 
            type="text"
            placeholder="title"
            className="inline-block font-bold text-lg"></input>
          </div>
          <div className="flex justify-end">
            <input 
            type="text"
            placeholder="name"
             className="inline-block mr-5"></input>
          </div>
          <div className="mb-5 ml-5">
            <input type="text" placeholder="本文"></input>
          </div>
        </div>
      </div>
    </>
  );
};

export default BBSUploader;
