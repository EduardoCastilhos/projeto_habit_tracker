import { api } from '../api/api'
import {Habit,Completion, User} from '../types'

export const HabitService = {
  listByUser:(userId:number)=> api.get<Habit[]>('/habits',{params:{userId}}).then(r => r.data),
  create:(h:Partial<Habit>) => api.post('/habits',h).then(r => r.data),
  update:(id:number, payload:Partial<Habit>) => api.patch(`/habits/${id}`,payload).then(r => r.data),
  complete:(completion:Partial<Completion>) => api.post('/completion',completion).then(r => r.data)

}
export const UserService = {
  list: () => api.get<User[]>('/users').then(r => r.data),
  get:(id:number) => api.get<User>(`/users/${id}`).then(r => r.data),
  update:(id:number, payload:Partial<User>) => api.patch(`/users/${id}`,payload).then(r => r.data)
}
