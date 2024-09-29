import {AiFillStar} from 'react-icons/ai'
import {MdLocationOn} from 'react-icons/md'
import {BsBriefcaseFill} from 'react-icons/bs'

import './index.css'

const SimilarJobs = props => {
  const {similarJobsDetails} = props
  const {
    description,
    location,
    logoUrl,
    rating,
    title,
    type,
  } = similarJobsDetails
  return (
    <li className="similar-job-item-container">
      <div className="image-container">
        <img
          className="company-img"
          src={logoUrl}
          alt="similar job company logo"
        />
        <div className="title-container">
          <h1 className="title">{title}</h1>
          <div className="rating-container">
            <AiFillStar className="star-icon" />
            <p className="rating">{rating}</p>
          </div>
        </div>
      </div>
      <h1 className="desc-heading">Description</h1>
      <p className="desc-para">{description}</p>
      <div className="location-employement-container">
        <div className="location-container">
          <MdLocationOn className="icon" />
          <p className="location">{location}</p>
        </div>
        <div className="employement-container">
          <BsBriefcaseFill className="case-icon" />
          <p className="employement">{type}</p>
        </div>
      </div>
    </li>
  )
}

export default SimilarJobs
