import { use, useState } from "react";

interface BBSProps {
  title: string;
  name: string;
  date: Date;
  text: string;
}

interface BBSContentProps{
  alreadyBbs:BBSProps[] | undefined;
}

const BBSContent = ({alreadyBbs}:BBSContentProps) => {
  const [editingId, setEditingId] = useState<number | null>();
  const [editTitle, setEditTitle] = useState("");
  const [editText, setEditText] = useState("");

  return (
    <>
    {alreadyBbs ? alreadyBbs.map((bbs, index) => (
      <li key ={index}>
      <div className="flex justify-center mt-5">
        <div className="shadow w-5/6 rounded">
          <div className="flex justify-center items-center">
            <h1 className="inline-block font-bold text-lg">{bbs.title}</h1>
          </div>
          <div className="flex justify-end">
            <p className="inline-block mr-5">{bbs.name}</p>
          </div>
          <div className="mb-5 ml-5">
            <p>{bbs.text}</p>
          </div>
          <div className="flex justify-between mb-5">
          <button className="btn ml-5 p-0.5 border rounded">編集</button>
          <button className="btn mr-5 p-0.5 border rounded">削除</button>
          </div>
        </div>
      </div>
      </li>
    )) : null }
    </>
  );
};

export default BBSContent;
