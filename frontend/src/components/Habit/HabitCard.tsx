import type { Habit } from '../../types'
import { useAuth } from '../../context/AuthContext'
import { api } from '../../api/api'
import { pointsForCompletion, isConsecutive,evaluateBadges } from '../../utils/Gamification'

export default function HabitCard({habit, refresh}:{habit:Habit, refresh:()=>void}){
  const {user} = useAuth()
  
  async function handleComplete(){
    if(!user) return;
    const nowISO = new Date().toISOString()
    const pts = pointsForCompletion(habit)
    await api.post('/completions', {habitId:habit.id, userId:user.id, completedAt:nowISO, pointsEarned:pts})

    const consecutive = isConsecutive(habit.lastCompletedAt, nowISO)
    const newStreak = consecutive ? habit.currentStreak +1:1
    await api.patch(`/habits/${habit.id}`,{completedCount:habit.completedCount+1, lastCompletdAt:nowISO,currentStreak:newStreak})

    const {data:userServer} = await api.get(`/users/${user.id}`)
    let updated = {...userServer, points:userServer.points+pts}
    const {data:catolg} = await api.get('/badgesCatalog')
    const newBadges = evaluateBadges(updated, {...habit, currentStreak:newStreak}, catolg)
  }
}