import {Link} from 'react-router-dom'
import {AiFillStar} from 'react-icons/ai'
import {MdLocationOn} from 'react-icons/md'
import {BsBriefcaseFill} from 'react-icons/bs'
import './index.css'

const JobCards = props => {
  const {jobDetails} = props
  const {
    id,
    companyLogo,
    employementType,
    description,
    location,
    packagePerAnnum,
    rating,
    title,
  } = jobDetails
  return (
    <Link to={`/jobs/${id}`} className="nav-link">
      <li>
        <div className="job-details-container">
          <div className="image-container">
            <img className="company-img" src={companyLogo} alt="company logo" />
            <div className="title-container">
              <h1 className="title">{title}</h1>
              <div className="rating-container">
                <AiFillStar className="star-icon" />
                <p className="rating">{rating}</p>
              </div>
            </div>
          </div>
          <div className="package-container">
            <div className="location-employement-container">
              <div className="location-container">
                <MdLocationOn className="icon" />
                <p className="location">{location}</p>
              </div>
              <div className="employement-container">
                <BsBriefcaseFill className="case-icon" />
                <p className="employement">{employementType}</p>
              </div>
            </div>
            <p className="salary">{packagePerAnnum}</p>
          </div>
          <hr />
          <h1 className="desc-heading">Description</h1>
          <p className="desc-para">{description}</p>
        </div>
      </li>
    </Link>
  )
}

export default JobCards
