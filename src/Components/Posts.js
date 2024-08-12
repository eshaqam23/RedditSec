import React, { useState, useEffect } from 'react';
import Scores from './Scores';
import Comments from './Comments';

function Posts(props) {
    const [userInput, setUserInput] = useState("");
    const [posts, setPosts] = useState(props.data);
    const [sortOption, setSortOption] = useState("");

    useEffect(() => {
        // Filter posts based on user input
        let filteredPosts = props.data.filter(post => {
            return (
                post.caption.toLowerCase().includes(userInput) ||
                post.text.toLowerCase().includes(userInput) ||
                post.user.toLowerCase().includes(userInput)
            );
        });

        // Sort posts based on selected option
        switch (sortOption) {
            case "new":
                filteredPosts = filteredPosts.sort((a, b) => b.createdTime - a.createdTime);
                break;
            case "old":
                filteredPosts = filteredPosts.sort((a, b) => a.createdTime - b.createdTime);
                break;
            case "top":
                filteredPosts = filteredPosts.sort((a, b) => b.score - a.score);
                break;
            default:
                break;
        }

        setPosts(filteredPosts);
    }, [userInput, sortOption, props.data]);

    function getUserInput(e) {
        setUserInput(e.target.value.toLowerCase());
    }

    function handleSortChange(e) {
        setSortOption(e.target.value);
    }

    function timeElapsed(timeCreated) {
        const now = Date.now() / 1000;
        const timeElapsed = now - timeCreated;
        let output = "0s ago";
        if (timeElapsed < 60) {
            output = `${Math.floor(timeElapsed)} seconds ago`;
        } else if (timeElapsed < 3600) {
            output = `${Math.floor(timeElapsed / 60)} minutes ago`;
        } else if (timeElapsed < 86400) {
            output = `${Math.floor(timeElapsed / 3600)} hours ago`;
        } else if (timeElapsed < 604800) {
            output = `${Math.floor(timeElapsed / 86400)} days ago`;
        } else {
            output = `over a week ago`;
        }
        return output;
    }

    let formattedPosts = posts.map(post => {
        // Check if post.image is defined and a non-empty string
        const hasImage = post.image.includes("http");
    
        return (
            <div className="post" key={post.id}>
                <div className="content">
                    <p className="user">Posted by {post.user} - {timeElapsed(post.createdTime)}</p>
                    <h3 className="caption">{post.caption}</h3>
                    {hasImage && <img className="image" src={post.image} alt="Post" />}
                    <p className="text">{post.text}</p>
                </div>
                <div className="reactions">
                    <Scores identification={post.id} data={props.data} />
                    <a href={post.fullURL} target="_blank"><i class="material-icons">link</i></a>
                </div>
                <Comments id={post.id} data={props.data} />
            </div>
        );
    });
    

    if (props.error) {
        return (
            <div className="allPosts">
                <h2 className="heading">Posts - r/{props.subreddit}</h2>
                <h3 className="error">Error Loading Data.</h3>
                <button className="error" onClick={() => window.location.reload()}>Try Again</button>
            </div>
        );
    }

    return (
        <div className="allPosts">
            <h2 className="heading">Posts - r/{props.subreddit}</h2>
            <div className="modifications">
                <div className="searchBar">
                    <input id="input" type="search" placeholder="Search..." spellCheck="true" onChange={getUserInput} />
                </div>
                <div className="sort-by">
                    <label htmlFor="sort-options">Sort by:</label>
                    <select id="sort-options" name="sort-options" value={sortOption} onChange={handleSortChange}>
                        <option value="new">Newest</option>
                        <option value="old">Oldest</option>
                        <option value="top">Score</option>
                    </select>
                </div>
            </div>
            {formattedPosts}
        </div>
    );
}

export default Posts;