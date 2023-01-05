import './index.css'

const TransactionItem = props => {
  const {object, onDelete} = props

  const deleteItem = () => {
    onDelete(object)
  }

  return (
    <li className="transactionItem">
      <p className="historytabs">{object.title}</p>
      <p className="historytabs">{object.amount}</p>
      <p className="historytabs">{object.type.displayText}</p>
      <button
        data-testid="delete"
        className="deletebutton"
        type="button"
        onClick={deleteItem}
      >
        <img
          alt="delete"
          className="deleteicon"
          src="https://assets.ccbp.in/frontend/react-js/money-manager/delete.png"
        />
      </button>
    </li>
  )
}

export default TransactionItem
