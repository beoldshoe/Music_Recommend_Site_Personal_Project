import {useEffect } from 'react';
import styled from 'styled-components';
import { useState } from 'react';
import axios from 'axios';

export const ModalContainer = styled.div`
  // Modal을 구현하는데 전체적으로 필요한 CSS를 구현
  display : flex;
  justify-content : center;
  align-items : center;
  height : 100%;
`;

export const ModalBackdrop = styled.div`
  // Modal이 떴을 때의 배경을 깔아주는 CSS를 구현
  z-index: 1; //위치지정 요소
  position: fixed;
  display : flex;
  justify-content : center;
  align-items : center;
  background-color: rgba(0,0,0,0.4);
  border-radius: 10px;
  top : 0;
  left : 0;
  right : 0;
  bottom : 0;
`;

export const ModalBtn = styled.button`
  background-color: var(--coz-purple-600);
  text-decoration: none;
  border: none;
  padding: 20px;
  color: black;
  border-radius: 30px;
  cursor: grab;
`;

export const ExitBtn = styled(ModalBtn) `
    background-color : #4000c7;
    border-radius: 10px;
    text-decoration: none;
    margin: 10px;
    padding: 5px 10px;
    width: 40px;
    height: 40px;
    display : flex;
    justify-content : center;
    align-items : center;
`;

export const ModalView = styled.div.attrs((props) => ({
    // attrs 메소드를 이용해서 아래와 같이 div 엘리먼트에 속성을 추가할 수 있다.
    role: 'dialog',
    }))`
    // Modal창 CSS를 구현합니다.
    display: flex;
    flex-direction: column;
    border-radius: 20px;
    width: 500px;
    height: 600px;
    background-color: #ffffff;
    font-family: 'bookkB';
    color: black; // 원하는 색상 코드로 변경하세요.
      >div.desc {
        margin: 50px;
        font-size: 20px;
        color: var(--coz-purple-600);
      }
  `;

export const GuestBookModal = ({ 
    isOpen, setIsOpen
}) => {

    // 모달 상태를 내부에서 관리하는 대신 props로 받음
  useEffect(() => {
      setIsOpen(isOpen); // 외부 상태에 따라 모달 상태 설정
  }, [isOpen, setIsOpen]);

  const handleCloseModal = () => {
    setIsOpen(false); // 모달을 닫는 함수입니다.
  }

  const [inputValue, setInputValue] = useState("");
  const [guestBook, setGuestBook] = useState([]);
  const [inputName, setInputName] = useState("");

  const updateGuestBook = () => {
    const newEntry = { name: inputName, detail: inputValue }; // 새로운 방명록 내용
  
    axios.post(`http://localhost:3001/GuestBook`, newEntry)
      .then(response => {
        console.log(response.data); // 서버에서 받은 응답을 출력
        setGuestBook(prevGuestBook => [...prevGuestBook, newEntry]); // 상태를 업데이트
        setInputValue(''); // 입력 필드를 초기화
        setInputName('')
      })
      .catch(error => console.error(`Error: ${error}`));
  }

  useEffect(() => {
    axios.get(`http://localhost:3001/GuestBook`)
      .then(response => {
        setGuestBook(response.data); // 방명록 내용을 상태에 저장
      })
      .catch(error => console.error(`Error: ${error}`));
  }, [isOpen]);

        return (
            <>
            {isOpen && 
                <ModalContainer>
                <ModalBackdrop onClick={handleCloseModal}>
                    <ModalView onClick={(e) => e.stopPropagation()}>
                    <p style={{
                        fontSize:'20px',
                        textAlign:'center'
                    }}>방명록</p>
                    <div
                    style={{display:'flex', justifyContent:'center', alignItems: 'center'}}>
                    <input
                        type="name"
                        value={inputName}
                        onChange={(e) => setInputName(e.target.value)}
                        style={{width: '80px', height:'20px', marginRight:'10px'}}
                        placeholder='작성자'
                    />
                    <input
                        type="text"
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        style={{ width: '200px', height: '20px'}}
                        placeholder='내용'
                    />
                    <button
                        style={{
                        marginLeft:'10px'
                        }}
                        onClick={updateGuestBook}>등록</button>
                    </div>
                    <div
                        style={{
                            fontSize:'15px',
                            marginLeft:'70px',
                            marginRight:'70px',
                            marginTop:'10px',
                            overflow: 'auto', 
                            maxHeight: '490px'
                        }}>
                    {guestBook.map((entry, index) =>
                    <div>
                    <h2 key={index}>{entry.name}</h2>
                    <p key={index}>{entry.detail}</p>
                    </div>
                    )}
                    </div>
                    </ModalView>
                </ModalBackdrop>
                </ModalContainer>
            }
            </>
        );
};

export default GuestBookModal;