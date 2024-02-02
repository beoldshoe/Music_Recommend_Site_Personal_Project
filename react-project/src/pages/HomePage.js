import React, { useState, useEffect } from "react";

const HomePage = () => {
  const [quote, setQuote] = useState("");
  const [selectedItem, setSelectedItem] = useState('Google');

  const handleSelection = (item) => {
    setSelectedItem(item);
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
      <div style={{color: '#ffffff', fontFamily: 'bookkB', display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize:'30px'}}>
        <div style={{marginTop:'20px'}}>음악을 사랑하시나요?</div>
      </div>
      <div style={{color:'white', fontFamily:'bookkB', fontSize:'20px'}}>
        <div style={{marginLeft:'80px',marginTop:'80px'}}>
          {quote}
        </div>
      </div>
      <div style={{color:'white', fontFamiliy:'bookkB', fontSize:'20px'}}>
      <div style={{marginLeft:'120px',marginTop:'50px', marginRight:'500px', display: 'flex', justifyContent: 'space-between'}}>
        <div onClick={() => handleSelection('Google')} style={selectedItem === 'Google' ? {fontWeight: 'bold'} : {}}>Google</div>
        <div onClick={() => handleSelection('Naver')} style={selectedItem === 'Naver' ? {fontWeight: 'bold'} : {}}>Naver</div>
        <div onClick={() => handleSelection('Youtube')} style={selectedItem === 'Youtube' ? {fontWeight: 'bold'} : {}}>Youtube</div>
          현재 선택된 항목: {selectedItem}
      </div>
      </div>
    </div>
  );
};

export default HomePage;