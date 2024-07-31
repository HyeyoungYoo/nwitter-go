import styled from "styled-components";
import { ITweet } from "./timeline";
import { auth, db, storage } from "../routes/firebase";
import { deleteDoc, doc } from "firebase/firestore";
import { ref, deleteObject } from "firebase/storage";

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: 3fr 1fr;
  padding: 20px;
  border: 1px solid rgba(225, 255, 255, 0.5);
  border-radius: 15px;
`;

const Column =styled.div``;

const Photo =styled.img`
  width: 100px;
  height: 100px;
  border-radius: 15px;
`;

const Username = styled.span`
  font-weight: 600;
  font-size: 15px;
`;

const Payload = styled.p`
  margin: 10px 0px;
  font-size: 18px;
`;

const DeleteButton = styled.button`
  background-color: tomato;
  color: white;
  font-weight: 600;
  border: 0;
  font-size: 12px;
  paddintg: 5px 10px;
  text-transform: uppercase;
  border-radius: 5px;
  cursor: pointer;
`;

const EditButton = styled.button`
  background-color: green;
  color: black;
  font-weight: 600;
  border: 0;
  font-size: 12px;
  paddintg: 5px 10px;
  text-transform: uppercase;
  border-radius: 5px;
  cursor: pointer;
`;

export default function Tweet({username, photo, tweet, userId, id}:ITweet){
    const user = auth.currentUser;
    
    const onDelete = async () => {
      const ok = confirm("Are you sure you want to delete this tweet?");
      if (!ok || user?.uid !== userId) return;
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
      }
    };
    const onEdit = async () => {
      if (user?.uid !== userId) return;
      //let newWindow = null;
      try{
       // await updateDoc(doc(db, "tweets", id),{content : newContent});
       //./src/compnents/edit-tweet.tsx
       const newWindow = window.open("/edit-tweet", "editTweet", "width=800,height=300");
       if(newWindow){
        const checkWindowClosed = setInterval(() => {
          if (newWindow.closed) {
            clearInterval(checkWindowClosed);
            console.log("Window closed, updating content...");
            // 새 창이 닫힌 후 수행할 작업
            //setContent("New Content after window closed"); // 예시로 상태를 업데이트
            console.log("update is succeed");
          }
        }, 1000); // 1초 간격으로 창이 닫혔는지 확인
       }
        console.log("update is succeed");
      } catch(e){
        console.log(e);
      } finally {
        //
      }
    };

    return(
      <Wrapper>
        <Column>
          <Username>{username}</Username>
          <Payload>{tweet}</Payload>
          {user?.uid === userId ? (
            <DeleteButton onClick={onDelete} >Delete</DeleteButton>
          ) : null}
          {user?.uid === userId ? (
            <EditButton onClick={onEdit} >Edit</EditButton>
          ) : null}
          </Column>
        <Column> {photo ? <Photo src={photo} /> :null} </Column>
      </Wrapper>
    );
}