import { styled } from "styled-components";


const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;
const TextArea = styled.textarea`
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
`;

window.onload = function() {
  const ITWeet = window.opener.ITWeet;
  if (ITWeet) {
      receiveITWeet(ITWeet);
  } else {
      console.log('No ITWeet object found in parent window.');
  }
};

const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault(); // 폼 제출의 기본 동작(페이지 리로드)을 방지함
  try {
    console.log("나 여깃소");
  } catch(e) {
      console.log(e); // 오류 발생 시 콘솔에 오류 메시지 출력
  } finally {
      //setLoading(false); // 작업이 완료된 후 로딩 상태를 false로 설정
  }
};

export default function EditTweet(){ 
  return <Form onSubmit = {onSubmit}>
      <label htmlFor="edittweet">글 수정하기</label>
      <TextArea required
        rows={5}
        maxLength={180}
        placeholder="What is happening?!"
        defaultValue="고쳐줘"
      />
      <SubmitBtn type="submit" />
    </Form>
};
