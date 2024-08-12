import React, { useEffect, useState } from 'react';
import './App.css';
import Logo from './Components/Logo';
import Posts from './Components/Posts';
import subredditList from './subredditList';
import About from './Components/About';
import Contact from './Components/Contact';

function App() {
  const [tab, setTab] = useState("home");
  const [subreddit, setSubreddit] = useState("cybersecurity");
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState(null);

  // Fetch posts based on the selected subreddit
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch(`https://www.reddit.com/r/${subreddit}.json`, { cache: "no-cache" });
        if (!response.ok) {
          throw new Error("Network Error.");
        }
        const data = await response.json();
        const transformedPosts = data.data.children.map((item, index) => {
          let actualComments = [];
          return {
            id: index,
            user: `u/${item.data.author}`,
            image: item.data.thumbnail,
            text: item.data.selftext || "",
            caption: item.data.title,
            score: item.data.ups - item.data.downs,
            createdTime: item.data.created_utc,
            fullURL: `https://www.reddit.com${item.data.permalink}`,
            isUpvoted: false,
            isDownVoted: false,
            comments: actualComments
          };
        });
        setPosts(transformedPosts);
      } catch (error) {
        console.error("Error fetching data:", error);
        setError(true);
      }
    };

    fetchPosts();
  }, [subreddit]);

  // Handle subreddit button click
  const handleSubredditChange = (item) => {
    setSubreddit(item);
    document.querySelector(".allPosts")?.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  // Generate the list of subreddit buttons
  const formattedList = subredditList.map(item => {
    const isSelected = subreddit === item;
    return (
      <div className="subreddit" key={item}>
        <button
          onClick={() => handleSubredditChange(item)}
          className={`subreddit-button ${isSelected ? 'selected' : ''}`}
        >
          r/{item}
        </button>
      </div>
    );
  });

  const shrinkedList = subredditList.map(item => {
    return (
      <li className="subList" onClick={() => handleSubredditChange(item)}>r/{item}</li>
    );
  });

  function handleTabChangeHome (e) {
    setTab("home");
    document.querySelectorAll(".menu li").forEach(nav => {
      nav.style.borderBottom = "none";
    });
    e.target.style.borderBottom = "2px solid orangered";
  }

  function handleTabChangeAbout (e) {
    setTab("about");
    document.querySelectorAll(".menu li").forEach(nav => {
      nav.style.borderBottom = "none";
    });
    e.target.style.borderBottom = "2px solid orangered";
  }

  function handleTabChangeContact (e) {
    setTab("contact");
    document.querySelectorAll(".menu li").forEach(nav => {
      nav.style.borderBottom = "none";
    });
    e.target.style.borderBottom = "2px solid orangered";
  }

  switch (tab) {
    case "home":
      return (
        <div className="App">
          <div className='header'>
            <Logo />
            
            <section class="top-nav">
              <input id="menu-toggle" type="checkbox" />
              <label class='menu-button-container' for="menu-toggle">
                  <div class='menu-button'></div>
              </label>
              <ul class="menu">
                  <li onClick={handleTabChangeHome}>Home</li>
                  <li onClick={handleTabChangeAbout}>About</li>
                  <li onClick={handleTabChangeContact}>Contact</li>
                  {shrinkedList}
              </ul>
            </section>
          </div>
          <Posts data={posts} subreddit={subreddit} error={error} />
          <div className="allSubreddits">
            <h2 className="heading">Communities</h2>
            {formattedList}
            <div className="subreddit" key="saved">
              <button>Saved</button>
            </div>
          </div>
        </div>
      );
    case "about":
      return (
        <div className="App">
          <div className='header'>
            <Logo />
            
            <section class="top-nav">
              <input id="menu-toggle" type="checkbox" />
              <label class='menu-button-container' for="menu-toggle">
                  <div class='menu-button'></div>
              </label>
              <ul class="menu">
                  <li onClick={handleTabChangeHome}>Home</li>
                  <li onClick={handleTabChangeAbout}>About</li>
                  <li onClick={handleTabChangeContact}>Contact</li>
                  {shrinkedList}
              </ul>
            </section>
          </div>
          <div>
            <About />
          </div>
        </div>
      );
    case "contact":
      return (
        <div className="App">
          <div className='header'>
            <Logo />
            
            <section class="top-nav">
              <input id="menu-toggle" type="checkbox" />
              <label class='menu-button-container' for="menu-toggle">
                  <div class='menu-button'></div>
              </label>
              <ul class="menu">
                  <li onClick={handleTabChangeHome}>Home</li>
                  <li onClick={handleTabChangeAbout}>About</li>
                  <li onClick={handleTabChangeContact}>Contact</li>
                  {shrinkedList}
              </ul>
            </section>
          </div>
          <div>
            <Contact />
          </div>
        </div>
      );
    default:
      return (
        <div className="App">
          <div className='header'>
            <Logo />
            
            <section class="top-nav">
              <input id="menu-toggle" type="checkbox" />
              <label class='menu-button-container' for="menu-toggle">
                  <div class='menu-button'></div>
              </label>
              <ul class="menu">
                  <li onClick={handleTabChangeHome}>Home</li>
                  <li onClick={handleTabChangeAbout}>About</li>
                  <li onClick={handleTabChangeContact}>Contact</li>
                  {shrinkedList}
              </ul>
            </section>
          </div>
          <Posts data={posts} subreddit={subreddit} error={error} />
          <div className="allSubreddits">
            <h2 className="heading">Communities</h2>
            {formattedList}
            <div className="subreddit" key="saved">
              <button>Saved</button>
            </div>
          </div>
        </div>
      );
  }
}

export default App;