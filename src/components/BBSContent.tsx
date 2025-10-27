import { use, useState } from "react";

interface BBSProps {
  id: number;
  title: string;
  name: string;
  date: Date;
  text: string;
}

interface BBSContentProps {
  alreadyBbs: BBSProps[] | undefined;
  updateBbs: (
    id: number,
    data: { title: string; text: string }
  ) => Promise<void>;
  deleteBbs: (id: number) => void;
}

const BBSContent = ({ alreadyBbs, updateBbs, deleteBbs }: BBSContentProps) => {
  const [editingId, setEditingId] = useState<number | null>();
  const [editTitle, setEditTitle] = useState("");
  const [editText, setEditText] = useState("");

  const handleEdit = async () => {
    if (editingId === null) return;
    if (editingId) {
      await updateBbs(editingId, { title: editTitle, text: editText });
      setEditingId(null);
    }
  };

  const handleDelete = async () => {
    if (editingId === null) return;
    if (editingId) {
      await deleteBbs(editingId);
      setEditingId(null);
    }
  };

  return (
    <>
      {alreadyBbs
        ? alreadyBbs.map((bbs, index) => (
            <li key={index}>
              <div className="flex justify-center mt-5">
                <div className="shadow w-5/6 rounded">
                  <div className="flex justify-center items-center">
                    {editingId === bbs.id ? (
                      <input value={editTitle} />
                    ) : (
                      <h1 className="inline-block font-bold text-lg">
                        {bbs.title}
                      </h1>
                    )}
                  </div>
                  <div className="flex justify-end">
                    <p className="inline-block mr-5">{bbs.name}</p>
                  </div>
                  <div className="mb-5 ml-5">
                    {editingId === bbs.id ? (
                      <input value={editText} />
                    ) : (
                      <p>{bbs.text}</p>
                    )}
                  </div>
                  <div className="flex justify-between mb-5">
                    {editingId === bbs.id ? (
                      <div className="flex">
                        <button
                          className="btn ml-5 p-0.5 border rounded"
                          onClick={handleEdit}
                        >
                          OK
                        </button>
                        <button className="btn ml-5 p-0.5 border rounded">
                          キャンセル
                        </button>
                      </div>
                    ) : (
                      <button
                        className="btn ml-5 p-0.5 border rounded"
                        onClick={() => {
                          setEditingId(bbs.id);
                          setEditTitle(bbs.title);
                          setEditText(bbs.text);
                        }}
                      >
                        編集
                      </button>
                    )}
                    <button className="btn mr-5 p-0.5 border rounded">
                      削除
                    </button>
                  </div>
                </div>
              </div>
            </li>
          ))
        : null}
    </>
  );
};

export default BBSContent;
