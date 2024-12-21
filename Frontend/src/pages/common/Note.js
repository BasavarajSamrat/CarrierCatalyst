

import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';

function Note() {
  const { categoryId, topicName, noteName } = useParams(); // Get note parameters from the URL
  const [note, setNote] = useState(null); // Use `null` to handle object structure
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    console.log(`Fetching note with categoryId=${categoryId}, topicName=${topicName}, noteName=${noteName}`);
    fetch(
      `https://carriercatalyst-7.onrender.com/api/categories/${categoryId}/topics/${topicName}/notes/${noteName}`
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch note");
        }
        return response.json();
      })
      .then((data) => {
        console.log("Fetched note data:", data); // Debugging
        setNote(data[0]); // Access the first element of the array
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching note:", err); // Debugging
        setError(err.message);
        setLoading(false);
      });
  }, [categoryId, topicName, noteName]); // Include all dependencies

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!note) {
    return <div>No note found</div>;
  }

  return (
    <div>
      <Navbar />
      <div className="mt-400">
        <h1 className="text-center bg-first hpx-100 text-2xl text-center justify-center p-2 text-white">
          {note.title}
        </h1>
        {note.contents && note.contents.length > 0 ? (
          note.contents.map((item, index) => (
            <div key={index} className=" bg-first   mft-50 justify-center text-white">
              <h3 className='text-white text-xl mft-20'>{item.contentTitle}</h3>
              <p  className='text-white text-lg mft-20'>{item.content}</p>
            </div>
          ))
        ) : (
          <p className="text-center text-white">No contents available</p>
        )}
      </div>
      <Footer/>
    </div>
  );
}

export default Note;
