import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'

import {AiFillStar} from 'react-icons/ai'
import {MdLocationOn} from 'react-icons/md'
import {BsBriefcaseFill} from 'react-icons/bs'
import {BiLinkExternal} from 'react-icons/bi'

import Header from '../Header'
import SimilarJobs from '../SimilarJobs'

import './index.css'

const apiStatusConstant = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  progress: 'PROGRESS',
}

class JobItemDetails extends Component {
  state = {
    apiStatus: apiStatusConstant.initial,
    jobDetailsData: [],
    similarJobsData: [],
  }

  componentDidMount() {
    this.getJobData()
  }

  getJobData = async () => {
    const {match} = this.props
    const {params} = match
    const {id} = params

    this.setState({apiStatus: apiStatusConstant.progress})
    const jwtToken = Cookies.get('jwt_token')

    const url = `https://apis.ccbp.in/jobs/${id}`
    const options = {
      method: 'GET',
      headers: {Authorization: `Bearer ${jwtToken}`},
    }
    const response = await fetch(url, options)
    const data = await response.json()
    console.log(data)

    if (response.ok === true) {
      const updatedJobData = [data.job_details].map(details => ({
        id: details.id,
        logUrl: details.company_logo_url,
        websiteUrl: details.company_website_url,
        type: details.employment_type,
        description: details.job_description,
        location: details.location,
        rating: details.rating,
        title: details.title,
        packagePerAnnum: details.package_per_annum,
        lifeAtCompany: {
          description: details.life_at_company.description,
          imgUrl: details.life_at_company.image_url,
        },
        skills: details.skills.map(skill => ({
          imgUrl: skill.image_url,
          name: skill.name,
        })),
      }))

      const updatedSimilarJobs = data.similar_jobs.map(jobs => ({
        logoUrl: jobs.company_logo_url,
        type: jobs.employment_type,
        id: jobs.id,
        description: jobs.job_description,
        location: jobs.location,
        rating: jobs.rating,
        title: jobs.title,
      }))

      this.setState({
        apiStatus: apiStatusConstant.success,
        jobDetailsData: updatedJobData,
        similarJobsData: updatedSimilarJobs,
      })
    } else {
      this.setState({apiStatus: apiStatusConstant.failure})
    }
  }

  renderSuccessjobDetails = () => {
    const {jobDetailsData, similarJobsData} = this.state
    const dataLength = jobDetailsData.length >= 1
    const {
      logUrl,
      websiteUrl,
      type,
      packagePerAnnum,
      description,
      location,
      rating,
      title,
      skills,
      lifeAtCompany,
    } = jobDetailsData[0]

    return dataLength ? (
      <div className="similar-job-details-container">
        <div className="job-details-container">
          <div className="image-container">
            <img
              className="company-img"
              src={logUrl}
              alt="job details company logo"
            />
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
                <p className="employement">{type}</p>
              </div>
            </div>
            <p className="salary">{packagePerAnnum}</p>
          </div>
          <hr />
          <div className="company-url">
            <h1 className="desc-heading">Description</h1>
            <a className="anchor" href={websiteUrl}>
              Visit
              <BiLinkExternal className="url-icon" />
            </a>
          </div>
          <p className="desc-para">{description}</p>
          <div>
            <h1 className="desc-heading">Skills</h1>
            <ul className="skill-list-container">
              {skills.map(item => (
                <li key={item.name} className="skill-item-container">
                  <img
                    className="skill-img"
                    src={item.imgUrl}
                    alt={item.name}
                  />
                  <p className="skill-para">{item.name}</p>
                </li>
              ))}
            </ul>
            <div className="company-details">
              <div className="company-content">
                <h1 className="desc-heading">Life at Company</h1>
                <p className="desc-para">{lifeAtCompany.description}</p>
              </div>
              <img
                className="life-img"
                src={lifeAtCompany.imgUrl}
                alt="Life at company"
              />
            </div>
          </div>
        </div>
        <div className="similar-job-container">
          <h1>Similar Jobs</h1>
          <ul className="similar-job-list-container">
            {similarJobsData.map(item => (
              <SimilarJobs key={item.id} similarJobsDetails={item} />
            ))}
          </ul>
        </div>
      </div>
    ) : null
  }

  onRetryJob = () => {
    this.getJobData()
  }

  renderFailureJob = () => (
    <>
      <div className="failure-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
          alt="failure view"
          className="failure-img"
        />
        <h1>Oops! Something Went Wrong</h1>
        <p>we cannot seem to find the page you are looking for</p>
        <div className="btn-container">
          <button
            className="retry-button"
            type="button"
            onClick={this.onRetryJob}
          >
            Retry
          </button>
        </div>
      </div>
    </>
  )

  renderLoader = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  renderJobsData = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstant.progress:
        return this.renderLoader()
      case apiStatusConstant.success:
        return this.renderSuccessjobDetails()
      case apiStatusConstant.failure:
        return this.renderFailureJob()
      default:
        return null
    }
  }

  render() {
    return (
      <>
        <Header />
        {this.renderJobsData()}
      </>
    )
  }
}

export default JobItemDetails
