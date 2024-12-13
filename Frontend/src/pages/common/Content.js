

// Categories.js

import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';

function Categories() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('http://localhost:5000/api/categories') // Update with your API endpoint
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to fetch categories');
        }
        return response.json();
      })
      .then((data) => {
        setCategories(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className='bg-first'>
      <Navbar/>
    <div className='cat-outer bg-first'>
    <p className='text-center bg-first  hpx-100 text-2xl text-center justify-center p-2 text-white '>Categories</p>

 <div className="cat-menu mft-20">
 {categories.map((category) => {
   return(
     
     <div className="cat-item mt-3">
       <h2 className='text-xl text-white bd-bottom w-100% mt-3'>{category.name}</h2>
       {category.topics.map((topic) => {   
         return(<li  className="text-lg p-2 w-100% "key={topic._id}><Link to={`${category._id}/topics/${topic.name}`}>{topic.name}</Link></li>)
        })};
     </div>
    )})};
    </div>
</div>
<Footer/>
</div>

  );
}

export default Categories;
