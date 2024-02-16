import {useEffect, useState } from 'react';
import styled from 'styled-components';
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
    height: 400px;
    background-color: #ffffff;
    font-family: 'bookkB';
    color: black; // 원하는 색상 코드로 변경하세요.
      >div.desc {
        margin: 50px;
        font-size: 20px;
        color: var(--coz-purple-600);
      }
  `;

export const RequestModal = ({ 
    isOpen, setIsOpen
}) => {

    // 모달 상태를 내부에서 관리하는 대신 props로 받음
  useEffect(() => {
      setIsOpen(isOpen); // 외부 상태에 따라 모달 상태 설정
  }, [isOpen, setIsOpen]);

  const handleCloseModal = () => {
    setIsOpen(false); // 모달을 닫는 함수입니다.
  }
  const [inputTitle, setInputTitle] = useState("")
  const [inputArtist, setInputArtist] = useState("")
  const [inputYoutubeLink, setInputYoutubeLink] = useState("")

  const RequestSong = () => {
    const songRequest = { title: inputTitle, artist: inputArtist, youtubeLink: inputYoutubeLink}; // 신청할 노래 정보
  
    axios.post(`http://localhost:3001/Request`, songRequest)
      .then(response => {
        console.log(response.data); // 서버에서 받은 응답을 출력
        setInputTitle(''); // 노래 제목 필드를 초기화
        setInputArtist(''); // 아티스트 필드를 초기화
        setInputYoutubeLink('');
      })
      .catch(error => console.error(`Error: ${error}`));
  }

    return (
        <>
            {isOpen && 
            <ModalContainer>
                <ModalBackdrop onClick={handleCloseModal}>
                <ModalView onClick={(e) => e.stopPropagation()}>
                <p style={{
                        marginTop:'30px',
                        fontSize:'35px',
                        textAlign:'center'
                    }}>곡 신청서</p>
                <div
                    style={{
                        display:'flex',
                        justifyContent:'center', 
                        alignItems: 'center',
                        marginTop:'40px',
                        fontSize:'20px'
                    }}
                    >곡 제목
                <input
                    type="title"
                    value={inputTitle}
                    onChange={(e) => setInputTitle(e.target.value)}
                    style={{width: '120px', height:'20px', marginLeft:'10px'}}
                    placeholder='곡 제목'
                    />
                </div>
                <div
                    style={{
                        display:'flex',
                        justifyContent:'center', 
                        alignItems: 'center',
                        marginTop:'20px',
                        fontSize:'20px'
                    }}
                    >아티스트 이름
                <input
                    type="artist"
                    value={inputArtist}
                    onChange={(e) => setInputArtist(e.target.value)}
                    style={{width: '120px', height:'20px', marginLeft:'10px'}}
                    placeholder='아티스트 이름'
                    />
                </div>
                <div
                    style={{
                        display:'flex',
                        justifyContent:'center', 
                        alignItems: 'center',
                        marginTop:'20px',
                        fontSize:'20px'
                    }}
                    >유튜브 링크
                <input
                    type="youtubelink"
                    value={inputYoutubeLink}
                    onChange={(e) => setInputYoutubeLink(e.target.value)}
                    style={{width: '250px', height:'20px', marginLeft:'10px'}}
                    placeholder='유튜브 링크'
                    />
                </div>
                <div
                    style={{
                        display: 'flex', // flexbox를 사용하도록 설정
                        justifyContent: 'center', // 수포 방향 중앙 정렬
                        alignItems: 'center', // 수직 방향 중앙 정렬
                        height: '100vh' // 부모 요소의 높이를 화면 전체 높이로 설정
                    }}
                    >
                    <button
                        style={{
                        width: '80px',
                        height: '30px',
                        marginTop: '20px'
                        }}
                        onClick={RequestSong}
                    >
                        신청하기
                    </button>
                    </div>
                </ModalView>
                </ModalBackdrop>
            </ModalContainer>
            }
        </>
    );
};

export default RequestModal;