import Logo from '/logo.svg'
import '../styles/Header.css'

const Header = () => {
  return (
    <div className='header'>
      <ul>
      <li><a href=''>Explore</a></li>
      <input placeholder="Search"></input>
      <div className='logo'>
        <img src={Logo}/>
        <p><a>School Vibes</a></p>
      </div>
      <li><a href=''>Donate</a></li>
      <li><a href=''>Log in</a></li>
      <li><a href=''>Signup</a></li>

      </ul>
      
    </div>
  )
}

export default Header
