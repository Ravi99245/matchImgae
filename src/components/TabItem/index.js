import './index.css'

const TabItem = props => {
  const {tabItem, isActive, changeActiveTabItem} = props
  const {tabId, displayText} = tabItem

  const className = isActive ? 'active-tab-btn' : ''

  const changeActiveTab = () => {
    changeActiveTabItem(tabId)
  }

  return (
    <li className="tabItem">
      <button
        className={`button ${className}`}
        type="button"
        onClick={changeActiveTab}
      >
        {displayText}
      </button>
    </li>
  )
}

export default TabItem
