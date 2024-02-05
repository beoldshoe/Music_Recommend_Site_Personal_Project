import React, { useState, useEffect } from "react";
import YouTube from 'react-youtube';
import OpenModal from "../components/OpenModal";

const HomePage = () => {
  const [quote, setQuote] = useState("");
  const [selectedItem, setSelectedItem] = useState('Google');
  const [searchTerm, setSearchTerm] = useState('');
  const [songs, setSongs] = useState([]);
  const [selectedSong, setSelectedSong] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false); 

  const handleOpenModal = () => {
    setIsModalOpen(true); 
  }

  const handleCloseModal = () => {
    setIsModalOpen(false); 
  }

  const handleRefresh = () => {
    window.location.reload();
  }  

  useEffect(() => {
    fetch(`${process.env.PUBLIC_URL}/Songs.json`)
      .then(response => response.json())
      .then(data => {
        setSongs(data);
        if (data.length > 0) {
          const randomIndex = Math.floor(Math.random() * data.length);
          setSelectedSong(data[randomIndex]);
        }
      });
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
        <div
          style={{ 
            marginTop:'30px',
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
              <div>
              <h2>{selectedSong.title}</h2>
              <h4>{selectedSong.artist}</h4>
            </div>
            )}
            {selectedSong && (
            <YouTube
              videoId = {selectedSong.youtubeid}
              opts={{
                width: "560",
                height: "315",
                playerVars: {
                  autoplay: 1, 
                  rel: 0, 
                  modestbranding: 1, 
                },
              }}
              onEnd={(e)=>{e.target.stopVideo(0);}}      
            />
            )}
        </div>
          </div>
            </div>
              </div>
            );
          };

export default HomePage;