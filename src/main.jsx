// src/main.jsx
import React, { useState, createContext } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import Home  from './page/home/home.jsx'
import New1  from './page/new/new.jsx'
import Edit  from './page/edit/edit.jsx'
import Diary from './page/diary/diary.jsx'
import Not   from './page/notfound.jsx'

export const DiaryContext = createContext({
  diaries: [], addDiary: () => {}, updateDiary: () => {}
})

function App() {
  const [diaries, setDiaries] = useState([])
  const addDiary    = entry   => setDiaries(prev => [...prev, entry])
  const updateDiary = entry   => setDiaries(prev => prev.map(d => d.id === entry.id ? entry : d))
  const deleteDiary = id    => setDiaries(prev => prev.filter(d => d.id !== id))

  return (
    <DiaryContext.Provider value={{ diaries, addDiary, updateDiary,deleteDiary}}>
      <BrowserRouter>
        <Routes>
          <Route path="/"        element={<Home />} />
          <Route path="/new"     element={<New1 />} />
          <Route path="/edit/:id" element={<Edit />} />
          <Route path="/diary/:id" element={<Diary />} />
          <Route path="*"        element={<Not />} />
        </Routes>
      </BrowserRouter>
    </DiaryContext.Provider>
  )
}

createRoot(document.getElementById('root')).render(<App />)
