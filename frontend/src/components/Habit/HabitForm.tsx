import {useState} from 'react'
import { HabitService } from '../../services/HabitService'
import { useAuth } from '../../context/AuthContext'

export default function HabitForm(){
  const {user} = useAuth()
  const [title, setTitle] = useState('')
  const [difficulty, setDifficulty] = useState<'easy'|'medium'|'hard'>('easy')

  async function subimt(){
    if(!user) return;
    await HabitService.create({
      userId: user.id,
      title,
      frequency: 'daily',
      difficulty,
      createdAt:new Date().toISOString(),
      completedCount:0,
      currentStreak:0
    })
    setTitle('')
    setDifficulty('easy')
  }

  return(
    <div className='p-4 border rounded bg-white'>
      <input value={title} onChange={e=>setTitle(e.target.value)}/>
      <select value={difficulty} onChange={e=>setDifficulty(e.target.value as any)}>
        <option value="easy">Fácil</option>
        <option value="medium">Médio</option>
        <option value="hard">Difícil</option>
      </select>

    </div>
  )
}