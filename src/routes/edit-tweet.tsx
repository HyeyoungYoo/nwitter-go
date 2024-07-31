 export default function EditTweet(){
    return <h1>EditTweet</h1>
 }
/* import { styled } from "styled-components";
import { auth, db, storage } from "../routes/firebase";
import { addDoc, collection, updateDoc } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { Tweet } from "../components/tweet";

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const TextArea = styled.textarea`
  border: 2px solid white;
  padding: 20px;
  border-radius: 20px;
  font-size: 16px;
  color: white;
  background-color: black;
  width: 100%;
  resize: none;
  font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
    Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
  &::placeholder {
    font-size: 16px;
  }
  &:focus {
    outline: none;
    border-color: #1d9bf0;
  }
`;

const SubmitBtn = styled.input`
  background-color: #1d9bf0;
  color: white;
  border: none;
  padding: 10px 0px;
  border-radius: 20px;
  font-size: 16px;
  cursor: pointer;
  &:hover,
  &:active {
    opacity: 0.9;
  }
`; */

/* if (!ok || user?.uid !== userId) return;
try{
  await deleteDoc(doc(db, "tweets", id));
  if(photo){
    const photoRef = ref(storage,`tweets/${user.uid}/${id}`);
    await deleteObject(photoRef);
  }
} catch(e){
  console.log(e); 
} finally {
  //
} */

/* export default function EditTweet(){
  const onSubmit = async (e:React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const user = auth.currentUser;
    if (!user || tweet.length>180) return;
    try {
        const doc = await addDoc(collection(db,"tweets"), {
            tweet,
            createdAt: Date.now(),
            username: user.displayName || "Anonymous",  //로그인했으나 타인에게 보이는 이름을 제공하지 않기도 하므로
            userId: user.uid, //트윗을 지울 때 작성자와 지우려는 자가 일치하는지 확인
        });
        if(file){
            const locationRef = ref(storage,`tweets/${user.uid}/${doc.id}`);
            const result = await uploadBytes(locationRef, file);
            const url =  await getDownloadURL(result.ref);
            await updateDoc(doc,{
                photo: url
            })
        }
        setTweet("");
        setFile(null);
    } catch(e){
        console.log(e);
    } finally {
        setLoading(false);
    }
};    
  return (
    <Form onSubmit={onSubmit}>
        <TextArea 
            required
            rows={5}
            maxLength={180}
            value={tweet} 
        />
        <SubmitBtn 
            type="submit"
            value={isLoading ? "Editing..." : "Edit Tweet"}
        />
    </Form>
  );
} */