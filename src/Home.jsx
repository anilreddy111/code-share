import { useNavigate } from "react-router-dom";

export default function Home() {
    const navigater = useNavigate();
    const onHandleClick = () => {
        const roomId = Math.random().toString(36).substring(2, 10);
        navigater(`/${roomId}`);
    }

    return (
        <div style={{ padding: '20px' }}>
            <div style={{ height: '50px', backgroundColor: '#282c34', color: 'white', display: 'flex', alignItems: 'center', paddingLeft: '20px' }}>
                <h1>Share your Code</h1>
            </div>
            <button onClick={onHandleClick} style={{ margin: '20px', padding: '10px 20px', fontSize: '16px' }}>
                Share Your Code
            </button>
        </div>
    );
}