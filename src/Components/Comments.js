import React, { useState } from 'react';
// import postData from 'somewhere';
function Comments (props) {
    let postData = props.data;

    const [displayedComments, setDisplayedComments] = useState(false);

    function toggleComments () {
        if(displayedComments) {
            setDisplayedComments(false);
        }
        else {
            setDisplayedComments(true);
        }
    }

    let commentData = postData.map(post => {
        return post.comments;
    })

    let formattedComments = [];

    if (displayedComments) {
        for(let i = 0; i < commentData.length; i++) {
            formattedComments.push(commentData[i].map(comment => {
                return (
                    <div>
                        <h3>{comment.name}</h3>
                        <p>{comment.text}</p>
                    </div>
                );
            }))
        }    
    }


    return (
        <div key={props.id} className="comments">
            <button onClick={toggleComments}>Comments Coming Soon...</button>
            {formattedComments[props.id]}
        </div>
    );
}

export default Comments;