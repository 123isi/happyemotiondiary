import React, { useState, useContext, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import Header from '../../compoment/header/header.jsx'
import { DiaryContext } from '../../main.jsx'

import img1 from '../../assets/emotion1.png'
import img2 from '../../assets/emotion2.png'
import img3 from '../../assets/emotion3.png'
import img4 from '../../assets/emotion4.png'
import img5 from '../../assets/emotion5.png'

export default function Home() {
  const nav = useNavigate()
  const { diaries } = useContext(DiaryContext)
  const [sortOrder, setSortOrder] = useState('latest')
  const now = new Date()
  const [year, setYear]   = useState(now.getFullYear())
  const [month, setMonth] = useState(now.getMonth() + 1)

  const prevMonth = () => {
    if (month > 1) setMonth(m => m - 1)
    else { setYear(y => y - 1); setMonth(12) }
  }
  const nextMonth = () => {
    if (month < 12) setMonth(m => m + 1)
    else { setYear(y => y + 1); setMonth(1) }
  }

  const sorted = useMemo(() => {
    const a = [...diaries]
    return a.sort((a, b) => {
      const da = new Date(a.date), db = new Date(b.date)
      return sortOrder === 'latest' ? db - da : da - db
    })
  }, [diaries, sortOrder])

  const pad = n => String(n).padStart(2, '0')
  const ym = `${year}-${pad(month)}`

  const filtered = useMemo(
    () => sorted.filter(e => e.date.startsWith(ym)),
    [sorted, ym]
  )

  const emotions = { '1': img1, '2': img2, '3': img3, '4': img4, '5': img5 }

  return (
    <div>
      <Header
        title={`${year}년 ${month}월`}
        leftChild={<button onClick={prevMonth}>&lt;</button>}
        rightChild={<button onClick={nextMonth}>&gt;</button>}
      />

      <div>
        <select value={sortOrder} onChange={e => setSortOrder(e.target.value)}>
          <option value="latest">최신순</option>
          <option value="oldest">오래된순</option>
        </select>
        <button onClick={() => nav('/new')}>새 일기 쓰기</button>
      </div>

      {filtered.map(entry => (
        <div key={entry.id}>
          <img src={emotions[entry.emotion]} alt="" />
          <div>
            <div>{entry.date}</div>
            <div>{entry.text}</div>
          </div>
          <button onClick={() => nav(`/edit/${entry.id}`)}>
            수정하기
          </button>
        </div>
      ))}

      {filtered.length === 0 && <div>작성된 일기가 없습니다.</div>}
    </div>
  )
}
