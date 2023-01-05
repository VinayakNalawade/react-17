import './index.css'

const MoneyItem = props => {
  const {alt, className, heading, amount, src, testid} = props

  return (
    <li className={className}>
      <img className="moneyitemimg" alt={alt} src={src} />
      <div className="moneydetails">
        <p className="moneyItemHeading">{heading}</p>
        <p data-testid={testid} className="moneyItempara">
          Rs {amount}
        </p>
      </div>
    </li>
  )
}

const MoneyDetails = props => {
  const {income, expense} = props

  return (
    <ul className="moneyDetailsContainer">
      <MoneyItem
        key="1"
        className="balanceitem"
        alt="balance"
        heading="Your Balance"
        amount={income - expense}
        testid="balanceAmount"
        src="https://assets.ccbp.in/frontend/react-js/money-manager/balance-image.png"
      />
      <MoneyItem
        key="2"
        testid="incomeAmount"
        className="incomeitem"
        alt="income"
        heading="Your Income"
        amount={income}
        src="https://assets.ccbp.in/frontend/react-js/money-manager/income-image.png"
      />
      <MoneyItem
        key="3"
        testid="expensesAmount"
        className="expenseitem"
        alt="expenses"
        heading="Your Expenses"
        amount={expense}
        src="https://assets.ccbp.in/frontend/react-js/money-manager/expenses-image.png"
      />
    </ul>
  )
}

export default MoneyDetails
