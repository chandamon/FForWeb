import React, { useEffect, useState } from 'react';
import 'firebase/storage'
import fire from '../config/fire-config';

const LoadCategories = () => {
  const [META, setMeta] = useState([]);
  const [categoryVal, setValue] = useState("");

  useEffect(() => {
    fire.firestore()
      .collection('Category')
      .onSnapshot(snap => {
        const blogs = snap.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setMeta(blogs);
      });
  }, [])


  return (
    <div>

<select name="category" id="category" 

onChange={(e) => {
          setValue(e.target.value); console.log(categoryVal);
        }} value={categoryVal} 
        
        >

{META.map((blog,index) =>

        <option key={index} value={blog.name}>{blog.name}</option>
      
  )}
            </select>

    </div>
  )
}
export default LoadCategories;
