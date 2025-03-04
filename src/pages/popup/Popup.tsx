import { useEffect, useState } from "react";

export default function Popup() {
  const [data, setData] = useState<{
    image: string;
    name: string;
    token: string;
    error: string | null;
  }>({
    image: "/favicon.ico",
    name: "",
    token: "",
    error: null,
  });
  const handleSync = () => {
    chrome.runtime.sendMessage({ action: "getLinkedInCookie" }, (response) => {
      if (!response.success)
        return setData((prev) => ({
          ...prev,
          error: "No LinkedIn cookie found.",
        }));
      setData((prev) => ({
        ...prev,
        token: response.cookies.find((cookie: any) => cookie.name === "li_at")
          ?.value,
      }));
    });
  };
  useEffect(() => {}, []);

  return (
    <div className="absolute top-0 flex leading-tighter items-center justify-evenly flex-col left-0 right-0 bottom-0 text-center h-full p-3">
      <h1 className=" text-xl font-semibold leading-tighter">Roger AI</h1>
      <div className=" space-y-1">
        <div className="size-16 rounded-full  overflow-hidden">
          <img src={data.image} className=" h-full w-full" alt="profile" />
        </div>
        <p>{data.name}</p>
      </div>
      <button
        onClick={handleSync}
        className="text-sm cursor-pointer font-medium text-gray-400"
      >
        Sync ?
      </button>
      <div className=" w-full space-y-1 break-words text-center">
        {data.token && <p className=" text-xs">{data.token}</p>}
        {data.error && <p className="text-red-500 text-xs">{data.error}</p>}
      </div>
    </div>
  );
}
