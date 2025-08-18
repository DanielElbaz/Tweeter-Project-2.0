import { useEffect, useState } from "react";
import TweetForm from "../Components/TweetForm.jsx";
import TweetList from "../Components/TweetList.jsx";
import Loader from "../Components/Loader.jsx";
import ErrorBanner from "../Components/ErrorBanner.jsx";
import { fetchTweets, createTweet } from "../lib/api.js";
import { useUser } from "../lib/user.jsx";

export default function Home() {
  const { userName } = useUser();
  const [tweets, setTweets] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isPosting, setIsPosting] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    let mounted = true;
    (async () => {
      setError("");
      try {
        const data = await fetchTweets(); 
        if (mounted) setTweets(data);
      } catch (e) {
        if (mounted) setError(`Failed to load tweets: ${e.message}`);
      } finally {
        if (mounted) setIsLoading(false);
      }
    })();
    return () => { mounted = false; };
  }, []);

  async function addTweet(content) {
    setError("");
    setIsPosting(true);
    try {
      const safeName = (userName || "").trim() || "Sparky";
      const newTweet = await createTweet({
        content,
        userName: safeName,
        date: new Date().toISOString(),
      });
      setTweets((prev) => [newTweet, ...prev].slice(0, 10));
    } catch (e) {
      setError(`Tweet not added: ${e.message}`);
    } finally {
      setIsPosting(false);
    }
  }

  return (
    <div className="container" style={{marginTop: 76}}>
      <ErrorBanner message={error} />
      <TweetForm onAdd={addTweet} disabled={isPosting} />
      <div style={{height:12}} />
      {isLoading ? <Loader /> : <TweetList tweets={tweets} />}
      
    </div>
  );
}
