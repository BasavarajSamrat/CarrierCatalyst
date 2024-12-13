// import './Topic.css'

import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import Navbar from '../../components/Navbar';
// import Footer from '../../components/Footer';

function Topic() {
  const { categoryId, topicName } = useParams(); // Get categoryId and topicName from the URL
  const [notes, setNotes] = useState([]); // Store notes as an array
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:5000/api/categories/${categoryId}/topics/${topicName}/notes`)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Failed to fetch notes for topic: ${topicName}`);
        }
        return response.json();
      })
      .then((data) => {
        setNotes(data); // Assuming `data` is an array of notes
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [categoryId, topicName]); // Re-run the effect if categoryId or topicName changes

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <Navbar />
      <div>
    <p className='text-center bg-first  hpx-100 text-2xl text-center justify-center p-2 text-white'>{topicName}</p> 
    <div  className='flex justify-center flex-wrap'><ul>
      {notes.length === 0 ? (
        <li>No notes found for this topic</li>
      ) : (
        notes.map((note) => (
          <li key={note.noteId} className='bd  text-lg  p-2 text-center mt-2'>
            <Link to={`/categories/${categoryId}/topics/${topicName}/notes/${note.title}`}>
              {note.title}
            </Link> {/* Adjust URL based on your routing structure */}
          </li>
        ))
      )}
    </ul></div>
  </div>
  
  </div>
  );
}

export default Topic;
