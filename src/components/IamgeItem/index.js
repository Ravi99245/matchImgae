import './index.css'

const ImageItem = props => {
  const {thumbItem, onClickImageItem} = props
  const {thumbnailUrl, id} = thumbItem

  const checkTheImage = () => {
    onClickImageItem(id)
  }

  return (
    <li className="thumbNailImg">
      <button className="button1" type="button" onClick={checkTheImage}>
        <img src={thumbnailUrl} className="img1" alt="thumbnail" />
      </button>
    </li>
  )
}

export default ImageItem
