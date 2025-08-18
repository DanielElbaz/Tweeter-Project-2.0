import TweetItem from "./TweetItem.jsx";

export default function TweetList({ tweets }) {
  if (!tweets.length) return <div className="card">No tweets yet.</div>;

  return (
    <div className="card">
      {tweets.map((t) => (
        <TweetItem key={t.id || t.date} tweet={t} /> 
      ))}
    </div>
  );
}
