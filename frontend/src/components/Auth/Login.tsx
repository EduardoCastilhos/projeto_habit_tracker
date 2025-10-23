import { useAuth } from '../../context/AuthContext'

export default function Login(){
  const {login} = useAuth()
  return(
    <div className='p-4 border rounded bg-white'>
      <h3 className='font-semibold mb-2'>Login(dev)</h3>
      <div className='flex gap-2'>
        <button onClick={()=> login(1)}>Entrar</button>
      </div>
    </div>
  )
}