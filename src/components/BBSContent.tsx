const BBSContent = () => {
  return (
    <>
      <div className="flex justify-center mt-5">
        <div className="shadow w-5/6 rounded">
          <div className="flex justify-center items-center">
            <h1 className="inline-block font-bold text-lg">title</h1>
          </div>
          <div className="flex justify-end">
            <p className="inline-block mr-5">name</p>
          </div>
          <div className="mb-5 ml-5">
            <p>本文</p>
          </div>
          <div className="flex justify-between mb-5">
          <button className="btn ml-5 p-0.5 border rounded">編集</button>
          <button className="btn mr-5 p-0.5 border rounded">削除</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default BBSContent;
