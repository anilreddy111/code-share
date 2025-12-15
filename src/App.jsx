import './App.css';
import EditorComponent from './Editor';

function App() {
  return (
    <>
      <div>
        <div style={{ height: '50px', backgroundColor: '#282c34', color: 'white', display: 'flex', alignItems: 'center', paddingLeft: '20px' }}>
          <h1>Share your Code</h1>
        </div>
        <EditorComponent />
      </div>
    </>
  )
}

export default App
