//WS第一層
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import WScontent from './WScontent';
const siteName = window.location.hostname;
const tokenString = localStorage.getItem('Admin');

//這一層只負責開SOCKET 資料由其他層呼叫 其他層傳SOCKET下去使用 登入判定可做在這
function WebsocketLink() {
  const navi = useNavigate();
  const socket = new WebSocket(`ws://${siteName}:3001`);

  useEffect(() => {
    return () => {
      socket.close();
      console.log('end');
    };
  }, []);
  function sendToken() {
    if (!tokenString) {
      navi('/Store/StoreLogin');
    }
    socket.send(JSON.stringify({ token: tokenString }));
  }
  socket.addEventListener('open', () => {
    sendToken();
    console.log('start');
  });
  return (
    <>
      <WScontent socket={socket} />
    </>
  );
}
export default WebsocketLink;
