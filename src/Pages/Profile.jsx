// src/pages/Profile.jsx
import { useEffect, useState } from "react";
import { useUser } from "../lib/user.jsx";

export default function Profile() {
  const { userName, setUserName } = useUser();
  const [draft, setDraft] = useState(userName);
  const [status, setStatus] = useState(""); // '', 'saving', 'saved', 'error'

  // Si le contexte change ailleurs, resync le champ
  useEffect(() => setDraft(userName), [userName]);

  const trimmed = (draft || "").trim();
  const hasChanges = trimmed !== (userName || "");
  const canSave = trimmed.length > 0 && hasChanges && status !== "saving";

  function onSave(e) {
    e?.preventDefault?.();
    if (!canSave) return;
    try {
      setStatus("saving");
      setUserName(trimmed);          // => UserProvider persiste dans localStorage
      setStatus("saved");
      setTimeout(() => setStatus(""), 1500);
    } catch {
      setStatus("error");
    }
  }

  return (
    <div className="container" style={{ marginTop: 76 }}>
      <form className="card" onSubmit={onSave}>
        <h2 style={{ marginTop: 0 }}>Profile</h2>

        <label htmlFor="username">Username</label>
        <input
          id="username"
          className="input"
          type="text"
          placeholder="ex: Sparky"
          value={draft}
          onChange={(e) => { setDraft(e.target.value); setStatus(""); }}
          maxLength={24}
        />

        <div className="row" style={{ justifyContent: "space-between", marginTop: 12, alignItems: "center" }}>
          <div className="meta">
            {trimmed ? `Your name will be @${trimmed}` : "Fill it!"}
            {status === "saved" && <span style={{ marginLeft: 8 }}>✓ Saved</span>}
            {status === "error" && <span style={{ marginLeft: 8, color: "#b91c1c" }}>Error</span>}
          </div>
          <button type="submit" disabled={!canSave}>
            {status === "saving" ? "Saving..." : "Save"}
          </button>
        </div>
      </form>
    </div>
  );
}
