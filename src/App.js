import {Component} from 'react'
import Loader from 'react-loader-spinner'
import TravelPlaceList from './components/TravelPlaceList'
import './App.css'

// Replace your code here
const apiStatusContraine = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  Failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class App extends Component {
  state = {
    placeList: [],
    apiStatus: apiStatusContraine.initial,
  }

  componentDidMount() {
    this.getTravelPlace()
  }

  renderData = data => ({
    id: data.id,
    name: data.name,
    imageUrl: data.image_url,
    description: data.description,
  })

  getTravelPlace = async () => {
    this.setState({apiStatus: apiStatusContraine.inProgress})
    const apiUrl = 'https://apis.ccbp.in/tg/packages'
    const response = await fetch(apiUrl)
    if (response.ok === true) {
      const data = await response.json()
      const updatedList = data.packages.map(eachPackage =>
        this.renderData(eachPackage),
      )
      console.log(updatedList)
      this.setState({
        placeList: updatedList,
        apiStatus: apiStatusContraine.success,
      })
    }
  }

  renderLoader = () => (
    <div data-testid="loader" className="loader">
      <Loader type="TailSpin" color="#00BFFF" height={50} width={50} />
    </div>
  )

  renderPlaceView = () => {
    const {placeList} = this.state
    return (
      <ul className="unList">
        {placeList.map(eachPlace => (
          <TravelPlaceList eachPlace={eachPlace} key={eachPlace.id} />
        ))}
      </ul>
    )
  }

  renderViewTravelGuideList = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusContraine.success:
        return this.renderPlaceView()
      case apiStatusContraine.inProgress:
        return this.renderLoader()
      default:
        return null
    }
  }

  render() {
    return (
      <div className="bg-container">
        <h1 className="heading">Travel Guide</h1>
        <hr className="hr" />
        {this.renderViewTravelGuideList()}
      </div>
    )
  }
}

export default App
