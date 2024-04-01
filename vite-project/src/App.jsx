import React from 'react'
import UploadWidget from './components/UploadWidget.jsx'

function App() {
    return (
        <div style={{width:"100vw", display: "flex", justifyContent: "center", alignItems: "center"}}>
            <div style={{ width: "fit-content"}}>
                <UploadWidget/>
            </div>
        </div>
    )
}

export default App
