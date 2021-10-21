import fire from '../../config/fire-config';
import Link from 'next/link'
const Category = (props) => {
  const data = Array.from(props.content);


  return (
    <div>
      <ul>
       {data.map((item,i ) =>

      <li key={i}>  {item.title}</li>
    
)}

{console.log(Object.keys(data))}
    </ul>
    </div>
  )
}
export const getServerSideProps = async ({ query }) => {
  let content = {}
  await fire.firestore()
   .collection('blog').where('category', '==', query.category).get().then(querySnapshot => {
    content = querySnapshot.docs.map(doc => doc.data());

    });
return {
    props: {content}
  }
}
export default Category
