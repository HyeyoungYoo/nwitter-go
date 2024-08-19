import { useState } from "react";
import { styled } from "styled-components";
import { auth, db, storage } from "../routes/firebase";
import { addDoc, collection, updateDoc } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

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

const AttachFileButton = styled.label`
  padding: 10px 0px;
  color: #1d9bf0;
  text-align: center;
  border-radius: 20px;
  border: 1px solid #1d9bf0;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
`;

const AttachFileInput = styled.input`
  display: none;
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
`;

export default function PostTweetForm(){
    const [isLoading, setLoading] = useState(false);
    const [tweet, setTweet] = useState("");
    const [file, setFile] = useState<File | null>(null);
    const onChange = (e:React.ChangeEvent<HTMLTextAreaElement>) => {
        setTweet(e.target.value);
    };
    const onFileChange = (e:React.ChangeEvent<HTMLInputElement>) => {
        const { files } = e.target;
        if (files && files.length === 1) {
            setFile(files[0]);
        }
    }
    const onSubmit = async (e:React.FormEvent<HTMLFormElement>) => { // 왜 onSubmit만 비동기로 만들어야 하는가?
        e.preventDefault(); //onSubmit이 일어나면 비동기 처리 동안에 들어오는 Form칸의 입력 방지
        const user = auth.currentUser;
        if (!user || isLoading || tweet === "" || tweet.length>180) return; //submit 거부 조건
        try {
            setLoading(true); //submit 처리 중에는 isLoading 값이 true.
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
            setTweet(""); //tweet 초기화
            setFile(null); //file 초기화
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
            onChange={onChange}
            value={tweet} 
            placeholder="What is happening?!"
            defaultValue="hello"
        />
        <AttachFileButton htmlFor="file">
            {file ? "Photo added ✅" : "Add Photo"}
        </AttachFileButton>
        <AttachFileInput 
            onChange={onFileChange}
            type="file"
            id="file"
            accept="image/*"
        />
        <SubmitBtn 
            type="submit"
            value={isLoading ? "Posting..." : "Post Tweet"}
        />
    </Form>
    );
}