import Auth from '../components/Auth'
import Quotes from '../components/Quotes'
function Signin() {
  return (
    <>
     <div className='h-screen grid grid-cols-1 lg:grid-cols-2'>
        <div><Auth type='signin'></Auth></div>
        <div className='hidden lg:block'><Quotes></Quotes></div>
     </div>
    </>
  )
}

export default Signin