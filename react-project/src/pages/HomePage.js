import React, { useState, useEffect } from "react";
import YouTube from 'react-youtube';
import OpenModal from "../components/OpenModal";
import axios from "axios";
import GuestBookModal from "../components/GuestBookModal";
import RequestModal from "../components/RequestModal";

const HomePage = () => {
  const [quote, setQuote] = useState("");
  const [selectedItem, setSelectedItem] = useState('Google');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSong, setSelectedSong] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false); 
  const [isGuestBookModalOpen, setIsGuestBookModalOpen] = useState(false);
  const [isRequstModalOpen, setIsRequestModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true); 
  }

  const handleCloseModal = () => {
    setIsModalOpen(false); 
  }

  const handleRefresh = () => {
    window.location.reload();
  }  

  const handleOpenGuestBookModal = () => {
    setIsGuestBookModalOpen(true);
  }

  const handleCloseGuestBookModal = () => {
    setIsGuestBookModalOpen(false);
  }

  const handleOpenRequestModal = () => {
    setIsRequestModalOpen(true);
  }
  
  const handleCloseRequestModal = () => {
    setIsRequestModalOpen(false);
  }

  useEffect(() => {
    axios.get(`http://localhost:3001/Songs`)
      .then(response => {
        const data = response.data;
        if (data.length > 0) {
          const randomIndex = Math.floor(Math.random() * data.length);
          setSelectedSong(data[randomIndex]);
        }
      })
      .catch(error => console.error(`Error: ${error}`));
    }, []);
  

  const handleSearch = () => {
    let url = '';
    switch(selectedItem) {
      case 'Google':
        url = `https://www.google.com/search?q=${searchTerm}`;
        break;
      case 'Naver':
        url = `https://search.naver.com/search.naver?where=nexearch&sm=top_hty&fbm=0&ie=utf8&query=${searchTerm}`;
        break;
      case 'Youtube':
        url = `https://www.youtube.com/results?search_query=${searchTerm}`;
        break;
      default:
        break;
    }
    window.open(url, '_blank');
  }

  useEffect(() => {
    fetch(`${process.env.PUBLIC_URL}/WiseSayings.txt`)
      .then(response => response.text())
      .then(data => {
        const lines = data.split('\n');
        const randomIndex = Math.floor(Math.random() * lines.length);
        const randomLine = lines[randomIndex];
        setQuote(randomLine);
      });
  }, []);

  const updateLikes = () => {
    if (selectedSong) {
      axios.get(`http://localhost:3001/Songs/${selectedSong.id}`)
        .then(response => {
          const updatedLikes = response.data.likes + 1;
          axios.put(`http://localhost:3001/Songs/${selectedSong.id}`, {
            ...response.data,
            likes: updatedLikes
          })
          .then(response => {
            setSelectedSong(response.data); 
          });
        })
        .catch(error => console.error(`Error: ${error}`));
    }
  }

  const handleEnd = (e) => {
    e.target.stopVideo(0);
    handleRefresh();
  };

  return (
      <div style={{ backgroundImage: `url(${process.env.PUBLIC_URL}/images/HomePage2.jpg)`, backgroundSize: 'cover', height: '100vh' }}>
        <div style={{color: '#ffffff', fontFamily: 'bookkB', display: 'flex', justifyContent: 'space-between', alignItems: 'center',  padding: '0 20px'}}>
          <div style={{marginLeft:'30px', marginTop:'50px', fontSize:'40px',}}>음악을 사랑하시나요?</div>
          <div
            style={{
              position: 'fixed', 
              top: '37px', 
              right: '600px', 
              marginRight:'100px'}}
            onClick={handleRefresh}>다른 노래 추천 받기(새로고침)
            </div>
          <div
              style={{
                position: 'fixed', 
                top: '37px', 
                right: '400px',
                marginLeft: '100px'
              }}
              onClick={handleOpenModal}
          >
              사용설명서(클릭해주세요)
          </div>
            <OpenModal 
            content={["",
            "사용설명서",
            "랜덤으로 듣기 좋은 노래를 추천해드립니다.", 
            "카페라 생각하고 공부할 때, 생각할 때,",
            "책 읽을 때, 커피 마실 때 이용해주세요.",
            "우측 상단에 검색창도 있으니, 필요하시면 사용하세요.",
            "노래가 마음에 든다면, 영상 하단에 있는 좋아요도 눌러주세요.",
            "방명록도 작성해주세요.",
            "방문해주셔서 감사합니다.",
            ""]}
            isOpen={isModalOpen}
            setIsOpen={setIsModalOpen}
            closeMethod={handleCloseModal}
          />
          <div style={{marginRight:'30px'}}>
            <select value={selectedItem} onChange={(e) => setSelectedItem(e.target.value)}>
              <option value="Google">Google</option>
              <option value="Naver">Naver</option>
              <option value="Youtube">Youtube</option>
            </select>
            <input 
              type="text" 
              onChange={(e) => setSearchTerm(e.target.value)} 
              placeholder="검색어를 입력하세요" 
              style={{marginLeft: '10px'}}
            />
            <button onClick={handleSearch} style={{marginLeft: '10px'}}>검색</button>
          </div>
        </div>
        <div style={{color:'white', fontFamily:'bookkB', fontSize:'20px'}}>
          <div style={{marginLeft:'50px',marginTop:'80px'}}>
            {quote}
          </div>
          <div style={{display:'flex', marginTop:'20px'}}>
            <div style={{marginLeft:'1200px'}}
            onClick={handleOpenGuestBookModal}>
              방명록
              </div>
              <GuestBookModal
              isOpen={isGuestBookModalOpen}
              setIsOpen={setIsGuestBookModalOpen}
              closeMethod={handleCloseGuestBookModal}
              />
              <div style={{marginLeft:'50px'}}
              onClick={handleOpenRequestModal}>
                곡 신청서
              </div>
              <RequestModal
              content={[""]}
              isOpen={isRequstModalOpen}
              setIsOpen={setIsRequestModalOpen}
              closeMethod={handleCloseRequestModal}
              />
          </div>
        </div>
        <div
          style={{ 
            marginTop:'0px',
            display: 'flex', 
            justifyContent: 'center', 
            alignItems: 'center', 
            width: '100vw' 
          }}>
        </div>
        <div style={{ 
            marginTop:'10px',
            display: 'flex', 
            justifyContent: 'center', 
            alignItems: 'center', 
            width: '100vw' 
          }}>
          <div>
          {selectedSong && (
            <>
              <div style={{
                fontFamily:'bookkB',
                fontSize:'20px',
                color:'white'
              }}>
                <h2>{selectedSong.title}</h2>
                <h4>{selectedSong.artist}</h4>
              </div>
              <YouTube
                videoId={selectedSong.youtubeid}
                opts={{
                  width: "560",
                  height: "315",
                  playerVars: {
                    autoplay: 1, 
                    rel: 0, 
                    modestbranding: 1, 
                  },
                }}
                onEnd={handleEnd}      
              />
              <div style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                marginTop:'10px',
                fontSize:'15px',
                fontFamily:'bookkB',
                color:'white'
              }}
              onClick={updateLikes}
              >좋아요 {selectedSong.likes}개</div>
            </>
          )}
            </div>
              </div>
                </div>
                  
            );
          };

export default HomePage;