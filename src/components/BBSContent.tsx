import { useState } from "react";

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
  filteredBbs: BBSProps[] | undefined;
}

const BBSContent = ({ filteredBbs, updateBbs, deleteBbs }: BBSContentProps) => {
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editTitle, setEditTitle] = useState("");
  const [editText, setEditText] = useState("");

  const handleEdit = async () => {
    if (editingId === null) return;
    await updateBbs(editingId, { title: editTitle, text: editText });
    setEditingId(null);
  };

  return (
    <>
      {filteredBbs && filteredBbs.length > 0 ? (
        filteredBbs.map((bbs) => (
          <li key={bbs.id} className="mt-5 flex justify-center">
            <div className="shadow w-5/6 rounded">
              <div className="flex justify-center items-center">
                {editingId === bbs.id ? (
                  <input
                    value={editTitle}
                    onChange={(e) => setEditTitle(e.target.value)}
                  />
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
                  <textarea
                    value={editText}
                    onChange={(e) => setEditText(e.target.value)}
                  />
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
                    <button
                      className="btn ml-5 p-0.5 border rounded"
                      onClick={() => {
                        setEditingId(null);
                        setEditTitle("");
                        setEditText("");
                      }}
                    >
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

                <button
                  className="btn mr-5 p-0.5 border rounded"
                  onClick={() => deleteBbs(bbs.id)}
                >
                  削除
                </button>
              </div>
            </div>
          </li>
        ))
      ) : (
        <p className="text-center mt-10 text-gray-500">投稿がありません</p>
      )}
    </>
  );
};

export default BBSContent;
