import './index.css'

const TravelPlaceList = props => {
  const {eachPlace} = props
  const {name, description, imageUrl} = eachPlace

  return (
    <li className="list">
      <img className="image" key="image_url" src={imageUrl} alt="name" />
      <h1 className="country">{name}</h1>
      <p className="description">{description}</p>
    </li>
  )
}

export default TravelPlaceList
