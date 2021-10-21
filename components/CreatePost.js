import React, { useState } from 'react';
import 'firebase/storage'
import fire from '../config/fire-config';
import LoadCategories from './LoadCategories';
import TestQuery from './Test';
import firebase from 'firebase/app';
import 'firebase/firestore';
import { writeBatch, doc } from "firebase/firestore"; 
import moment from 'moment';



const CreatePost = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [text, setText] = useState([]);
  const [notification, setNotification] = useState('');
  const [tag, setTag] = useState('');
  const [dateE, setDate] = useState(moment(dateE, "DD MMM,YYYY"));
  const [category, setCat] = useState('');  
  const [musicians, setMusicians] = useState([]);
  const [count, setCount] = useState(0);
  const [countContent, setCountContent] = useState(0);
  const [countMusic, setCountMusic] = useState(0);
  const [intro, setIntro] = useState(0);
  const [video, setVideo] = useState('');
  const [imgType, setImgType] = useState('');
  const [imgTitle, setImgTitle] = useState('');
  const [imgFeature, setImgFeature] = useState(false);
  const [imgOrder, setImgOrder] = useState('');
  const [paragraph, setParagraph] = useState(1);
  moment.locale('en-gb');                  


  const [docID, setDocID] = useState('');

const [children, setChildren] =useState([]);
const allInputs = {imgUrl: ''}
    const [imageAsFile, setImageAsFile] = useState('')
    const [imageAsUrl, setImageAsUrl] = useState(allInputs)
    const [Images, setImages] = useState([]);
    const storage = fire.storage();

  const handleSubmit = (event) => {
    event.preventDefault();

    //children.splice(count,1,{key:count, name:tag});
    const db = fire.firestore();
    const docRef1 = db.collection('blog');
    const docRef2 = db.collection('Category');
    const docRef3 = db.collection('Tag');
    const docRef4 = db.collection('Musicians');


    docRef1.add({
        title: title,
        intro:intro,
        content: text,
        tag: children,
        category:category,
        Images:Images,
        video:video,
        musician:musicians,
        date:moment(dateE, "DD MMM,YYYY")
      })
      .then(function(docRef) {
        setDocID(docRef.id);
        console.log("Document written with ID: ", docRef.id);
        var batch = db.batch();


        batch.set(docRef2.doc(category), {
          postID:firebase.firestore.FieldValue.arrayUnion({id:docRef.id,title:title, tag:children }), category:category
    
        }, {merge: true});
    
        children.map((child,index) => {
    docRef3.doc(child.name) ? (batch.set(docRef3.doc(child.name), {postID:firebase.firestore.FieldValue.arrayUnion({id:docRef.id,category:category, title:title, tag:child.name},
    ), tag:child.name }, {merge: true})) : (batch.set(docRef3.doc(child.name), {name:child.name, title:title}));
    console.log('tag done'+index);
         
        });

        musicians.map((child,index) => {
          docRef4.doc(child.name) ? (batch.set(docRef4.doc(child.name), {postID:firebase.firestore.FieldValue.arrayUnion({id:docRef.id,category:category, title:title, tag:children}
          ), musician:child.name }, {merge: true})) : (batch.set(docRef4.doc(child.name), {name:child.name}));
          console.log('musicians'+index); 
        });
    
        batch.commit()
        .then(() => console.log('Success!'))
        .catch(err => console.error('Failed!', err));
      
    
    
    })
    .catch(function(error) {
        console.error("Error adding document: ", error);
    });




    setTitle('');
    setContent('');
    setTag('');
    setChildren([]);
    setMusicians([]);
    setText([]);
    setImages('');
    setParagraph(1);
    setCat('');
    setImgType('');
    setImgTitle('');
    setIntro('');
    setImgOrder('');
    setDate('');


    setNotification('Blogpost created');
    setTimeout(() => {
      setNotification('') 
    }, 2000)
  }

  const handleImageAsFile = (e) => {
    const image = e.target.files[0]
    setImageAsFile(imageFile => (image))
}


const handleFireBaseUpload = e => {
  e.preventDefault()
console.log('start of upload')
// async magic goes here...
if(imageAsFile === '') {
  console.error(`not an image, the image file is a ${typeof(imageAsFile)}`)
}
const uploadTask = storage.ref(`/images/${count}/${imageAsFile.name}`).put(imageAsFile)
//initiates the firebase side uploading 
uploadTask.on('state_changed', 
(snapShot) => {
  //takes a snap shot of the process as it is happening
  console.log(snapShot)
}, (err) => {
  //catches the errors
  console.log(err)
}, () => {
  // gets the functions from storage refences the image storage in firebase by the children
  // gets the download url then sets the image from firebase as the value for the imgUrl key:
  storage.ref(`/images/${count}/`).child(imageAsFile.name).getDownloadURL()
   .then(fireBaseUrl => {
     setImageAsUrl(prevObject => ({...prevObject, imgUrl: fireBaseUrl}))
     Images.push({key:count, url:fireBaseUrl, title:imgTitle, type:imgType, feature:imgFeature, order:imgOrder, paragraph:paragraph});
     setImgFeature(false);

   });
  })



console.log(Images);

}



  const handleClick = (e) => {
    count == 0 ? (setChildren([...children, {key:1, name:''}]),    console.log('children')
    ) :  
    (children.splice(count,1,{key:count, name:children[count].name}),setChildren([...children, {key:count+1, name:''}]) )
    setCount(count => count +1);
    console.log(children);

  }

  const componentWillUnmount = () => {
    // fix Warning: Can't perform a React state update on an unmounted component
    this.setState = (state,callback)=>{
        return;
    };
}



  const handleClickContent = (e) => {
    countContent == 0 ? (setText([...text, {key:1, text:''}]),    console.log('children')
    ) :  
    (text.splice(countContent,1,{key:countContent, text:text[countContent].text, paragraph:paragraph}),setText([...text, {key:countContent+1, text:'', paragraph:paragraph}]) )
    setCountContent(countContent => countContent +1);

  }


  const handleClickMusic = (e) => {
    countMusic == 0 ? (setMusicians([...musicians, {key:1, name:''}]), console.log('children')) :  
    (musicians.splice(countMusic,1,{key:countMusic, name:musicians[countMusic].name}),setMusicians([...musicians, {key:countMusic+1, name:''}]) )
    setCountMusic(countMusic => countMusic +1);

  }


const handleChange = (e) => {
  // 1. Make a shallow copy of the items
  let items = e.target.getAttribute('type') == "tag" ?  [...children] :  e.target.getAttribute('type') == "text" ? [...text] : [...musicians] ;
  // 2. Make a shallow copy of the item you want to mutate
  let item = {...items[e.target.getAttribute('data')]};
  // 3. Replace the property you're intested in
//    item.text = e.target.value;
  // 4. Put it back into our array. N.B. we *are* mutating the array here, but that's why we made a copy first

  items[e.target.getAttribute('data')] = e.target.getAttribute('type') == "tag" ?  {...item, name:e.target.value, key:e.target.getAttribute('data'), } : e.target.getAttribute('type') == "text" ? {...item, text:e.target.value, key:e.target.getAttribute('data') , paragraph:paragraph } : {...item, name:e.target.value, key:e.target.getAttribute('data'), };
  // 5. Set the state to our new copy
  let action = e.target.getAttribute('type') == "tag" ?  setChildren(items) : e.target.getAttribute('type') == "text" ? setText(items) : setMusicians(items);
  action;
  console.log(items)
}


  const listChildren = children.map((child,index) => {
    return (
      <input id={"tag-"+child.key} data={child.key} type="tag" key={child.key} placeholder={child.name=='' ? 'tag ' +child.key : child.name} onChange={handleChange} ></input>
      
    )
    
  });

  const listMusic = musicians.map((child,index) => {
    return (
      <input id={"musician-"+child.key} data={child.key} type="musician" key={child.key} placeholder={child.name=='' ? 'musician ' +child.key : child.name} onChange={handleChange} ></input>
      
    )
    
  });

  const listText = text.map((child,index) => {
    return (
      <textarea id={"text-"+child.key} type="text" key={child.key} placeholder={child.name=='' ? 'pargraph- ' +child.key : child.text} data={child.key} id={"text-"+child.key} 
          onChange={handleChange} />  
    
    )
  });

  

  

  return (  
    <div>
      <h2>Add Blog</h2>
      {notification}
      <form onSubmit={handleSubmit}>
        <div>
          Title<br />
          <input type="text" value={title} 
           onChange={({target}) => setTitle(target.value)} />
        </div>
        <div>
          Introduction<br />
          <textarea value={intro} 
           onChange={({target}) => setIntro(target.value)} />
        </div>
        <div>
          Content<br />

        </div>
        {!countContent==0 ? listText  
          :
          <textarea  id={countContent} data={countContent} type="text" key="0" onChange={handleChange}/>
          } 
         <p>Current paragraph: {paragraph}</p>
                  <button type="button" className="px-4 py-1 text-sm text-purple-600 font-semibold rounded-full border border-purple-200 hover:text-white hover:bg-purple-600 hover:border-transparent focus:outline-none focus:ring-2 focus:ring-purple-600 focus:ring-offset-2" id="paragraph-add" onClick={() => setParagraph(paragraph+1) }>Add pargaraph Counter</button>
<br />
        <button type="button" onClick={handleClickContent}>Add pargaraph</button>
        <div>
          Tag <br />
          {!count==0 ? listChildren
          :
          <input id={"tag-0"} placeholder="tag" key="0" type="tag" data="0" onChange={handleChange} ></input>

          }  <button type="button" onClick={handleClick}>add</button> 
        </div>
        <div>
          Musician <br />
          {!countMusic==0 ? listMusic
          :
          <input id={"music-0"} placeholder="musician" key="0" type="music" data="0" onChange={handleChange} ></input>

          }  <button type="button" onClick={handleClickMusic}>add</button> 
        </div>
        <div>
          Categories<br />
          <textarea value={category} 
           onChange={({target}) => setCat(target.value)} />
        </div>

        <div>
          Date<br />
          <input value={moment().format("D MMM, YYYY")} 
           onChange={({target}) => setDate(target.value)} ></input>
        </div>
        <LoadCategories />

        <div>
          Video<br />
          <textarea value={video} 
           onChange={({target}) => setVideo(target.value)} />
        </div>

        <button type="submit">Save</button>
      </form>
      <form onSubmit={handleFireBaseUpload}>
        <input 
          type="file"
          onChange={handleImageAsFile}
        />
                <div>
          Type<br />
          <input type="text" value={imgType} 
           onChange={({target}) => setImgType(target.value)} />
        </div>
        <div>
          Title<br />
          <input type="text" value={imgTitle} 
           onChange={({target}) => setImgTitle(target.value)} />        </div>
    <div>
          Order<br />
          <input type="text" value={imgOrder} 
           onChange={({target}) => setImgOrder(target.value)} />        </div>

           <br />
           <div><label>Feature</label><br />
             <input type="checkbox" id="feature" name="featurebox" defaultChecked={imgFeature}  onClick={() => setImgFeature(!imgFeature)}  />
             </div>
        <button>upload to firebase</button>
      </form>
      <img src={imageAsUrl.imgUrl} alt="image tag" />
  


    </div>
       
  )
}


export default CreatePost;
