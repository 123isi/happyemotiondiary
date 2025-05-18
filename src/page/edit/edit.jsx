// src/page/edit.jsx
import React, { useState, useContext, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Header from '../../compoment/header/header.jsx'
import img1 from '../../assets/emotion1.png'
import img2 from '../../assets/emotion2.png'
import img3 from '../../assets/emotion3.png'
import img4 from '../../assets/emotion4.png'
import img5 from '../../assets/emotion5.png'
import { DiaryContext } from '../../main.jsx'

export default function Edit() {
  const { id } = useParams()
  const nav = useNavigate()
  const { diaries, updateDiary, deleteDiary } = useContext(DiaryContext)
  const entry = diaries.find(d => String(d.id) === id) || {}
  const [date, setDate] = useState(entry.date || '')
  const [emotion, setEmotion] = useState(entry.emotion || '1')
  const [text, setText] = useState(entry.text || '')

  useEffect(() => {
    if (entry.date) {
      setDate(entry.date)
      setEmotion(entry.emotion)
      setText(entry.text)
    }
  }, [entry])

  const onCancel = () => nav(-1)
  const onSave = () => {
    updateDiary({ id: entry.id, date, emotion, text })
    nav('/')
  }
  const onDelete = () => {
    deleteDiary(entry.id)
    nav('/')
  }

  const emotions = { '1': img1, '2': img2, '3': img3, '4': img4, '5': img5 }

  return (
    <>
      <Header
        title="일기 수정하기"
        leftChild={<button onClick={onCancel}>&lt; 뒤로가기</button>}
        rightChild={<button style={{ background:'#e57373', color:'#fff' }} onClick={onDelete}>삭제하기</button>}
      />
      <p>오늘의 날짜</p>
      <input type="date" value={date} onChange={e => setDate(e.target.value)} />
      <p>오늘의 감정</p>
      <div style={{ display:'flex', gap:8 }}>
        {Object.entries(emotions).map(([val, src]) => (
          <label key={val} style={{ padding:8, background: emotion===val? '#ffe082':'#f5f5f5', borderRadius:4 }}>
            <input type="radio" name="emotion" value={val} checked={emotion===val} onChange={()=>setEmotion(val)} />
            <img src={src} alt={val} width={40} />
          </label>
        ))}
      </div>
      <p>오늘의 일기</p>
      <textarea rows={7} style={{ width:'100%', boxSizing:'border-box' }} value={text} onChange={e=>setText(e.target.value)} />
      <div style={{ marginTop:16, display:'flex', gap:8 }}>
        <button onClick={onCancel}>취소</button>
        <button style={{ background:'#81c784', color:'#fff' }} onClick={onSave}>작성 완료</button>
      </div>
    </>
  )
}
