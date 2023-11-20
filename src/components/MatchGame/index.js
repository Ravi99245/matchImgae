import {Component} from 'react'
import TabItem from '../TabItem'
import ImageItem from '../IamgeItem'

import './index.css'

class MatchGame extends Component {
  constructor(props) {
    super(props)
    const {tabsList, imagesList} = this.props
    this.state = {
      score: 0,
      seconds: 60,
      defaultImage: imagesList[0].imageUrl,
      defaultId: imagesList[0].id,
      activeTabId: tabsList[0].tabId,
      isGameOver: false,
    }
  }

  componentDidMount() {
    this.timerId = setInterval(this.tick, 1000)
  }

  tick = () => {
    const {seconds} = this.state
    if (seconds === 0) {
      clearInterval(this.timerId)
      this.setState(prevState => ({
        isGameOver: !prevState.isGameOver,
      }))
    } else {
      this.setState(prevState => ({
        seconds: prevState.seconds - 1,
      }))
    }
  }

  changeActiveTabItem = tabId => {
    this.setState({activeTabId: tabId})
  }

  onClickImageItem = id => {
    const {defaultId} = this.state
    const {imagesList} = this.props
    const randomNumber = Math.floor(Math.random() * imagesList.length)
    if (id === defaultId) {
      this.setState(prevState => ({
        score: prevState.score + 1,
        defaultImage: imagesList[randomNumber].imageUrl,
        defaultId: imagesList[randomNumber].id,
      }))
    } else {
      clearInterval(this.timerId)
      this.setState(prevState => ({
        isGameOver: !prevState.isGameOver,
      }))
    }
  }

  restartGame = () => {
    const {imagesList, tabsList} = this.props
    this.setState({
      score: 0,
      seconds: 60,
      defaultImage: imagesList[0].imageUrl,
      defaultId: imagesList[0].id,
      activeTabId: tabsList[0].tabId,
      isGameOver: false,
    })
  }

  render() {
    const {score, seconds, defaultImage, activeTabId, isGameOver} = this.state
    const {tabsList, imagesList} = this.props
    const filteredImages = imagesList.filter(
      eachItem => eachItem.category === activeTabId,
    )

    return (
      <div className="game-container">
        <nav className="navbar">
          <ul className="navItems">
            <li>
              <img
                src="https://assets.ccbp.in/frontend/react-js/match-game-website-logo.png "
                className="logo"
                alt="website logo"
              />
            </li>
            <li className="scorecard-container">
              <p className="score">
                Score: <span className="totalScore">{score}</span>
              </p>
              <img
                src="https://assets.ccbp.in/frontend/react-js/match-game-timer-img.png "
                className="timer"
                alt="timer"
              />
              <p className="totalScore">{seconds} sec</p>
            </li>
          </ul>
        </nav>
        {isGameOver ? (
          <div className="card-container">
            <div className="score-card-container">
              <img
                src="https://assets.ccbp.in/frontend/react-js/match-game-trophy.png "
                className="trophy"
                alt="trophy"
              />
              <p className="score-heading">YOUR SCORE</p>
              <h1 className="total-score">{score}</h1>
              <button
                className="playAgain"
                type="button"
                onClick={this.restartGame}
              >
                <img
                  src="https://assets.ccbp.in/frontend/react-js/match-game-play-again-img.png"
                  className="reset"
                  alt="reset"
                />
                <p>PLAY AGAIN</p>
              </button>
            </div>
          </div>
        ) : (
          <div className="bg-container">
            <img src={defaultImage} alt="match" className="defaultImg" />
            <ul className="tabItems">
              {tabsList.map(eachItem => (
                <TabItem
                  key={eachItem.tabId}
                  tabItem={eachItem}
                  isActive={activeTabId === eachItem.tabId}
                  changeActiveTabItem={this.changeActiveTabItem}
                />
              ))}
            </ul>
            <ul className="thumbnail-container">
              {filteredImages.map(eachItem => (
                <ImageItem
                  thumbItem={eachItem}
                  key={eachItem.id}
                  onClickImageItem={this.onClickImageItem}
                />
              ))}
            </ul>
          </div>
        )}
      </div>
    )
  }
}

export default MatchGame
