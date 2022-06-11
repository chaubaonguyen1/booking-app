import './maillist.css';

export default function MailList() {
  return (
    <div className="mail">
      <h1 className="mailTitle">Save time, save money!</h1>
      <span className="mailDescription">
        Sign up and we'll send the best deals to you
      </span>
      <div className="mailInputContainer">
        <input className='emailInput' type="text" placeholder="Your email" />
        <button>Subscribe</button>
      </div>
    </div>
  )
}
