import React, { useState } from 'react';
import 'firebase/storage'
import fire from '../config/fire-config';

const TestQuery = (props) => {
  const [Test, setTest] = useState([]);

  fire.firestore().collection('Category').where('name', '==', 'main').get().then(querySnapshot => {
    const data = querySnapshot.docs.map(doc => doc.data());
    console.log(data); // array of cities objects
    setTest (data);
  })
  

  return (
    <div>
    {Test.map(blog =>

      <p value={blog.name}>{blog.name}</p>
    
)}    </div>

  )
}

export default TestQuery;
