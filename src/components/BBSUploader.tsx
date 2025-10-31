import { useState } from "react";


interface NewBBSProps {
  title: string;
  name: string;
  date: Date;
  text: string;
  affiliation_id: number;
}

interface BBSUploaderProps {
  addBbs: (data: NewBBSProps) => void;
  companyIdData: string | null | undefined;
}

const BBSUploader = ({ addBbs, companyIdData }: BBSUploaderProps) => {
  const [title, setTitle] = useState("");
  const [name, setName] = useState("");
  const [content, setContent] = useState("");

  const allClean = () => {
    setTitle("");
    setName("");
    setContent("");
  };

  return (
    <>
      <div className="shadow rounded flex flex-col gap-4 w-5/6">
        <form className="shadow rounded flex flex-col gap-4 w-full">
          <input
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
            }}
            type="text"
            placeholder="title"
            className="inline-block font-bold text-lg text-center "
          ></input>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            type="text"
            placeholder="name"
            className="mr-5 text-right"
          ></input>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="本文"
            className="ml-5 h-15 align-top"
          ></textarea>
          <div className=" flex items-center justify-between ">
            <button
              onClick={(e) => {
                e.preventDefault();

                const hasInput =
                  title.trim() !== "" ||
                  name.trim() !== "" ||
                  content.trim() !== "";
                if (!hasInput) {
                  alert("入力してください");
                  return;
                }

                const dataToSave: NewBBSProps = {
                  name: name,
                  title: title,
                  text: content,
                  date: new Date(),
                  affiliation_id: Number(companyIdData),
                };

                addBbs(dataToSave);
                allClean();
              }}
              className="btn border rounded p-1 ml-2 mb-2 bg-green-500 w-20"
            >
              <p className="text-white">投稿</p>
            </button>
            <button
              onClick={() => {
                allClean();
              }}
              className="btn border rounded p-1 mr-2 mb-2 bg-red-400 w-20"
            >
              <p className="text-white">取り消し</p>
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default BBSUploader;
