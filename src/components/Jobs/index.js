import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'

import {BsSearch} from 'react-icons/bs'

import Header from '../Header'
import JobCards from '../JobCards'
import './index.css'

const employmentTypesList = [
  {
    label: 'Full Time',
    employmentTypeId: 'FULLTIME',
  },
  {
    label: 'Part Time',
    employmentTypeId: 'PARTTIME',
  },
  {
    label: 'Freelance',
    employmentTypeId: 'FREELANCE',
  },
  {
    label: 'Internship',
    employmentTypeId: 'INTERNSHIP',
  },
]

const salaryRangesList = [
  {
    salaryRangeId: '1000000',
    label: '10 LPA and above',
  },
  {
    salaryRangeId: '2000000',
    label: '20 LPA and above',
  },
  {
    salaryRangeId: '3000000',
    label: '30 LPA and above',
  },
  {
    salaryRangeId: '4000000',
    label: '40 LPA and above',
  },
]

const apiStatusConstant = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  progress: 'PROGRESS',
}

class Jobs extends Component {
  state = {
    apiStatusProfile: apiStatusConstant.initial,
    profileData: [],
    apiStatusJob: apiStatusConstant.initial,
    jobsData: [],
    activeEmploymentType: [],
    activeSalaryRangeId: '',
    searchInput: '',
  }

  componentDidMount() {
    this.getProfileData()
    this.getJobsData()
  }

  getProfileData = async () => {
    this.setState({apiStatusProfile: apiStatusConstant.progress})
    const jwtToken = Cookies.get('jwt_token')
    const url = 'https://apis.ccbp.in/profile'
    const options = {
      method: 'GET',
      headers: {Authorization: `Bearer ${jwtToken}`},
    }
    const response = await fetch(url, options)
    const data = await response.json()
    if (response.ok === true) {
      const profileData = data.profile_details
      const updatedData = {
        name: profileData.name,
        imgUrl: profileData.profile_image_url,
        bio: profileData.short_bio,
      }
      this.setState({
        profileData: updatedData,
        apiStatusProfile: apiStatusConstant.success,
      })
    } else {
      this.setState({apiStatusProfile: apiStatusConstant.failure})
    }
  }

  renderSuccessProfileData = () => {
    const {profileData} = this.state
    const {name, imgUrl, bio} = profileData
    return (
      <div className="profile-container">
        <img className="profile-img" src={imgUrl} alt="profile" />
        <h1 className="profile-name">{name}</h1>
        <p className="profile-bio">{bio}</p>
      </div>
    )
  }

  onRetryProfile = () => this.getProfileData()

  renderFailureProfileData = () => (
    <div className="btn-container">
      <button
        className="retry-button"
        type="button"
        onClick={this.onRetryProfile}
      >
        Retry
      </button>
    </div>
  )

  getJobsData = async () => {
    this.setState({apiStatusJob: apiStatusConstant.progress})
    const {activeEmploymentType, activeSalaryRangeId, searchInput} = this.state
    const type = activeEmploymentType.join(',')
    const jwtToken = Cookies.get('jwt_token')
    const url = `https://apis.ccbp.in/jobs?employment_type=${type}&minimum_package=${activeSalaryRangeId}&search=${searchInput}`
    const options = {
      method: 'GET',
      headers: {Authorization: `Bearer ${jwtToken}`},
    }
    const response = await fetch(url, options)
    const data = await response.json()
    if (response.ok === true) {
      const updatedData = data.jobs.map(job => ({
        id: job.id,
        companyLogo: job.company_logo_url,
        employementType: job.employment_type,
        description: job.job_description,
        location: job.location,
        packagePerAnnum: job.package_per_annum,
        rating: job.rating,
        title: job.title,
      }))
      this.setState({
        jobsData: updatedData,
        apiStatusJob: apiStatusConstant.success,
      })
    } else {
      this.setState({apiStatusJob: apiStatusConstant.failure})
    }
  }

  onSelectEmployementType = event => {
    const {activeEmploymentType} = this.state
    if (activeEmploymentType.includes(event.target.id)) {
      const updatedType = activeEmploymentType.filter(
        type => type !== event.target.id,
      )
      this.setState({activeEmploymentType: updatedType}, this.getJobsData)
    } else {
      this.setState(
        prevState => ({
          activeEmploymentType: [
            ...prevState.activeEmploymentType,
            event.target.id,
          ],
        }),
        this.getJobsData,
      )
    }
  }

  renderEmploymentType = () => (
    <>
      <hr />
      <h1 className="employment-heading">Type of Employment</h1>
      <ul className="employment-list-container">
        {employmentTypesList.map(eachType => (
          <li
            className="employment-item-container"
            key={eachType.employmentTypeId}
          >
            <input
              type="checkbox"
              id={eachType.employmentTypeId}
              onClick={this.onSelectEmployementType}
            />
            <label className="label" htmlFor={eachType.employmentTypeId}>
              {eachType.label}
            </label>
          </li>
        ))}
      </ul>
    </>
  )

  onSelectSalaryRange = event => {
    this.setState({activeSalaryRangeId: event.target.id}, this.getJobsData)
  }

  renderSalaryRange = () => (
    <>
      <hr />
      <h1 className="salary-heading">Salary Range</h1>
      <ul className="salary-list-container">
        {salaryRangesList.map(salary => (
          <li className="salary-item-container" key={salary.salaryRangeId}>
            <input
              type="radio"
              id={salary.salaryRangeId}
              onChange={this.onSelectSalaryRange}
            />
            <label className="label" htmlFor={salary.salaryRangeId}>
              {salary.label}
            </label>
          </li>
        ))}
      </ul>
    </>
  )

  onRetryJob = () => this.getJobsData()

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

  onChangeSearchInput = event => {
    this.setState({searchInput: event.target.value})
  }

  onEnterSearchInput = event => {
    if (event.key === 'Enter') {
      this.getJobsData()
    }
  }

  onClickSearchIcon = () => {
    this.getJobsData()
  }

  renderSearchInput = () => {
    const {searchInput} = this.state
    return (
      <>
        <div className="search-input-container">
          <input
            className="search-input"
            type="search"
            placeholder="Search"
            value={searchInput}
            onChange={this.onChangeSearchInput}
            onKeyDown={this.onEnterSearchInput}
          />
          <button
            className="search-btn"
            type="button"
            data-testid="searchButton"
            onClick={this.onClickSearchIcon}
          >
            <BsSearch className="search-icon" />
          </button>
        </div>
      </>
    )
  }

  renderSuccessJobData = () => {
    const {jobsData} = this.state
    const totalJobs = jobsData.length > 0
    return totalJobs ? (
      <ul className="jobs-list-container">
        {jobsData.map(each => (
          <JobCards key={each.id} jobDetails={each} />
        ))}
      </ul>
    ) : (
      <div className="nojobs-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png"
          alt="no jobs"
          className="nojobs-img"
        />
        <h1>No Jobs found</h1>
        <p>We could not find any jobs. Try other filters.</p>
      </div>
    )
  }

  renderProfileData = () => {
    const {apiStatusProfile} = this.state
    switch (apiStatusProfile) {
      case apiStatusConstant.progress:
        return this.renderLoader()
      case apiStatusConstant.success:
        return this.renderSuccessProfileData()
      case apiStatusConstant.failure:
        return this.renderFailureProfileData()
      default:
        return null
    }
  }

  renderJobsData = () => {
    const {apiStatusJob} = this.state
    switch (apiStatusJob) {
      case apiStatusConstant.progress:
        return this.renderLoader()
      case apiStatusConstant.success:
        return this.renderSuccessJobData()
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
        <div className="jobs-container">
          <div className="search-sm-container">{this.renderSearchInput()}</div>
          <div className="sidebar-job-container">
            <div className="sidebar-container">
              {this.renderProfileData()}
              {this.renderEmploymentType()}
              {this.renderSalaryRange()}
            </div>
            <div className="search-joblist-container">
              <div className="search-lg-container">
                {this.renderSearchInput()}
              </div>
              {this.renderJobsData()}
            </div>
          </div>
        </div>
      </>
    )
  }
}

export default Jobs
