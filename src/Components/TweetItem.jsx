export default function TweetItem({ tweet }) {
  const date = new Date(tweet.date);
  const pretty = isNaN(date) ? tweet.date : date.toLocaleString();
  return (
    <div className="tweet">
      <div className="meta"><strong>@{tweet.userName}</strong> · {pretty}</div>
      <div>{tweet.content}</div>
    </div>
  );
}
