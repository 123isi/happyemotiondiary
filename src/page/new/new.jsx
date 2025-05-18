// src/pages/new/new.jsx
import React, { useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import Header from '../../compoment/header/header.jsx'
import { DiaryContext } from '../../main.jsx'    // ← 동일한 파일에서 import

import img1 from '../../assets/emotion1.png'
import img2 from '../../assets/emotion2.png'
import img3 from '../../assets/emotion3.png'
import img4 from '../../assets/emotion4.png'
import img5 from '../../assets/emotion5.png'

export default function New1() {
  const nav = useNavigate()
  const { addDiary } = useContext(DiaryContext)

  const [date,    setDate]    = useState('')
  const [emotion, setEmotion] = useState(null)
  const [text,    setText]    = useState('')

  const rollback = () => nav('/')
  const success  = () => {
    addDiary({ id: Date.now(), date, emotion, text })
    nav('/')
  }

  return (
    <>
      <Header title="새 일기 쓰기"
              leftChild={<button onClick={rollback}>&lt; 뒤로가기</button>} />

      <p>오늘의 날짜</p>
      <input type="date"
             value={date}
             onChange={e => setDate(e.target.value)} />

      <p>오늘의 감정</p>
      <div style={{ display: 'flex', gap: 8 }}>
        {[img1,img2,img3,img4,img5].map((src,i) => {
          const val = String(i+1)
          return (
            <label key={val}>
              <input type="radio" name="emotion" value={val}
                     checked={emotion===val}
                     onChange={()=>setEmotion(val)} />
              <img src={src} alt={val} width={40}/>
            </label>
          )
        })}
      </div>

      <p>오늘의 일기</p>
      <textarea rows={5}
                style={{ width:'100%', boxSizing:'border-box' }}
                value={text}
                onChange={e=>setText(e.target.value)} />

      <div style={{ marginTop:16, display:'flex', gap:8 }}>
        <button onClick={rollback}>취소</button>
        <button onClick={success}>작성 완료</button>
      </div>
    </>
  )
}
