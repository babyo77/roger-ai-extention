import { createRoot } from "react-dom/client";
import "./style.css";
import { useEffect, useState } from "react";
const div = document.createElement("div");
div.id = "__root";
document.body.appendChild(div);

const rootContainer = document.querySelector("#__root");
if (!rootContainer) throw new Error("Can't find Content root element");
const root = createRoot(rootContainer);

function App() {
  const [li_at, setLiAt] = useState("");

  useEffect(() => {
    chrome.runtime.sendMessage({ action: "getLinkedInCookie" }, (response) => {
      if (!response.success) return;
      setLiAt(response);
    });
  }, []);

  return (
    <div
      id="linkedin-cookie"
      className="absolute rounded-lg p-2 bottom-0 left-0 text-[0px] text-black bg-amber-400 z-50"
    >
      {JSON.stringify(li_at)}
    </div>
  );
}

root.render(<App />);

try {
  console.log("content script loaded");
} catch (e) {
  console.error(e);
}
