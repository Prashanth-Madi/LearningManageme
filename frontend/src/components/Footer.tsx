import facebook from '../assets/facebook-logo.svg'
import twitter from '../assets/twitterx.svg'
import linkedin from '../assets/linkedin-logo.svg'
import instagram from '../assets/instagram.svg'
import '../styles/Footer.css'


const Footer = () => {
  return (
    <div className='footer'>
        <div className="description">
          <h2>School Vibes</h2>
          <p>
            School Vibes is a Online Learning Management Platform designed for students to 
            keep track of the progress of their learning and to quiz them in regular intervals
            of time for better memorizing the subject.
            </p>
            
            <div className='contact'>
              <button>Contact Us</button>
              <p><a href=""><a href="">Our Offices</a></a></p>
            </div>
            
            <div className="icons">
              <img src={facebook}/>
              <img src={twitter}/>
              <img src={linkedin}/>
              <img src={instagram}/>
            </div>
        </div>    

        <div className='first-col'>
          <p><a href=""><a href=''>About Us</a></a></p>
          <p><a href="">Solutions</a></p>
          <p><a href="">Success Stories</a></p>
          <p><a href="">Resources</a></p>
          <p><a href="">Integration Partnerships</a></p>
          <p><a href="">Channel Partnerships</a></p>
          <p><a href="">Investor Relations</a></p>
          <p><a href="">Our Commitment to Accessibilty</a></p>
        </div>  

        <div className='second-col'>
          <p><a href="">School Vibes Trust Center</a></p>
          <p><a href="">Privacy Statement</a></p>
          <p><a href="">US State Privacy Notice</a></p>
          <p><a href="">Modern Slavery Act Statement</a></p>
          <p><a href="">Security</a></p>
          <p><a href="">Terms of Use</a></p>
          <p><a href="">Cookie Preferences</a></p>
          <p><a href="">Your Privacy Choices</a></p>
        </div>

        <div className='third-col'>
          <p><a href="">School Vibes Community</a></p>
          <p><a href="">Get Support</a></p>
          <p><a href="">Brande Guidance</a></p>
          <h4>We're Hiring!</h4>
          <p><a href="">Join our Team</a></p>
        </div>


    </div>
  )
}

export default Footer
