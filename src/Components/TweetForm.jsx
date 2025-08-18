import React, { useState } from "react";

const MAX_LEN = 140;

export default function TweetForm({ onAdd, disabled }) {
    const [content, setContent] = useState("");
    const remaining = MAX_LEN - content.length;
    const over = remaining < 0;
    const canSubmit = !disabled && content.trim().length > 0 && !over;

    function submit(e) {
        e.preventDefault();
        if (!canSubmit) return;
        onAdd(content.trim());
        setContent("");
    }

    return (
        <form className="card" onSubmit={submit} aria-label="Create Tweet">
            <div className="row">
                <textarea
                    placeholder="What do you have in mind?"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    aria-invalid={over}
                    aria-describedby="charCounter"
                />
            </div>
            <div className="row" style={{ justifyContent: "space-between", marginTop: 8 }}>
                <span id="charCounter" className={`counter ${over ? "limit" : "ok"}`}>
                    {remaining} {over ? "You reach the limit" : ""}
                </span>
                <button type="submit" disabled={!canSubmit}>
                    Tweet
                </button>
            </div>
        </form>
    );
}
