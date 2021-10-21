import fire from '../../config/fire-config';
import Link from 'next/link'
const Blog = (props) => {
  const Images = props.Images.map(Image => {
    let rObj = {}
    rObj[Image.key] = Image.url
    return rObj
 
  })
  const jeepAutos = props.Images.filter( (auto) => auto.key == ("1"))

  return (
    <div>
      <h2>{props.title}</h2>
        {props.content.map(
         (para,i) => <p key={i}>{para.text}</p>
       )}



 <ul>
   
    {
       props.tag.map(
         (tag,i) => <li key={i}>{tag.name}</li>
       )
    }
{

      
props.Images.map(
  (Image,i) => <li key={i}>{Image.url}</li>
)
}

{

      
  jeepAutos.map(
    (Image,i) => <li key={i}><img src={Image.url}/></li>
  )
  }

  </ul>
      <Link href="/">
        <a>Back</a>
      </Link>
    </div>
  )
}
export const getServerSideProps = async ({ query }) => {
  const content = {}
  await fire.firestore()
    .collection('blog')
    .doc(query.id)
    .get()
    .then(result => {
      content['title'] = result.data().title;
      content['content'] = result.data().content;
      content['tag'] = result.data().tag;
      content['Images'] = result.data().Images;


    });
return {
    props: {
      title: content.title,
      content: content.content,
      tag:content.tag,
      Images: content.Images,
    }
  }
}
export default Blog
