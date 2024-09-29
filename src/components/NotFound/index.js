import './index.css'

const NotFound = () => (
  <>
    <div className="notfound-container">
      <div className="image-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/jobby-app-not-found-img.png"
          alt="not found"
          className="notfound-img"
        />
      </div>
      <h1 className="heading">Page Not Found</h1>
      <p className="para">
        We are sorry, the page you requested could not be found
      </p>
    </div>
  </>
)

export default NotFound
