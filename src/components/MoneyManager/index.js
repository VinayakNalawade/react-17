import './index.css'

import {Component} from 'react'

import {v4 as uuidv4} from 'uuid'

import TransactionItem from '../TransactionItem'

import MoneyDetails from '../MoneyDetails'

const transactionTypeOptions = [
  {
    optionId: 'INCOME',
    displayText: 'Income',
  },
  {
    optionId: 'EXPENSES',
    displayText: 'Expenses',
  },
]

class MoneyManager extends Component {
  state = {
    transactions: [],
    title: '',
    amount: '',
    type: transactionTypeOptions[0],
    income: 0,
    expense: 0,
  }

  changeTitle = event => {
    this.setState({title: event.target.value})
  }

  changeAmount = event => {
    this.setState({amount: event.target.value})
  }

  changeType = event => {
    this.setState({
      type: transactionTypeOptions.filter(
        each => each.optionId === event.target.value,
      )[0],
    })
  }

  submit = event => {
    event.preventDefault()

    const {title, amount, type} = this.state

    const transaction = {
      id: uuidv4(),
      title,
      amount,
      type,
    }

    this.setState(prevState => ({
      income:
        prevState.income +
        parseInt(type === transactionTypeOptions[0] ? amount : 0),
      expense:
        prevState.expense +
        parseInt(type === transactionTypeOptions[1] ? amount : 0),
      transactions: [...prevState.transactions, transaction],
      title: '',
      amount: '',
      type: transactionTypeOptions[0],
    }))
  }

  onDelete = object => {
    const {transactions} = this.state

    const index = transactions.findIndex(each => each.id === object.id)

    const newlist = [...transactions]

    newlist.splice(index, 1)

    this.setState(prevState => ({
      transactions: newlist,
      income:
        prevState.income -
        parseInt(object.type === transactionTypeOptions[0] ? object.amount : 0),
      expense:
        prevState.expense -
        parseInt(object.type === transactionTypeOptions[1] ? object.amount : 0),
    }))
  }

  render() {
    const {transactions, title, amount, type, expense, income} = this.state

    return (
      <div className="mainContainer">
        <div className="detailsSection">
          <div className="profileContainer">
            <h1 className="profileHeading">Hi, Richard</h1>
            <p className="profilepara">
              Welcome back to your{' '}
              <span className="profileparaspan">Money Manager</span>
            </p>
          </div>
          <MoneyDetails income={income} expense={expense} />
        </div>
        <div className="inputSection">
          <form className="inputForm" onSubmit={this.submit}>
            <h1 className="formHeading">Add Transaction</h1>
            <label htmlFor="title" className="label">
              TITLE
            </label>
            <input
              placeholder="TITLE"
              className="input"
              type="text"
              id="title"
              value={title}
              onChange={this.changeTitle}
            />
            <label htmlFor="amount" className="label">
              AMOUNT
            </label>
            <input
              placeholder="AMOUNT"
              className="input"
              type="text"
              id="amount"
              value={amount}
              onChange={this.changeAmount}
            />
            <label htmlFor="type" className="label">
              TYPE
            </label>
            <select
              onChange={this.changeType}
              className="input"
              id="type"
              value={type.optionId}
            >
              <option
                value={transactionTypeOptions[0].optionId}
                className="option"
              >
                {transactionTypeOptions[0].displayText}
              </option>
              <option
                value={transactionTypeOptions[1].optionId}
                className="option"
              >
                {transactionTypeOptions[1].displayText}
              </option>
            </select>
            <button className="submitbutton" type="submit">
              Add
            </button>
          </form>
          <div className="historyContainer">
            <h1 className="formHeading">History</h1>
            <li className="transactionItemhead">
              <p className="historytabsheads">Title</p>
              <p className="historytabsheads">Amount</p>
              <p className="historytabsheads">Type</p>
            </li>
            <ul className="historylistContainer">
              {transactions.map(each => (
                <TransactionItem
                  object={each}
                  key={each.id}
                  onDelete={this.onDelete}
                />
              ))}
            </ul>
          </div>
        </div>
      </div>
    )
  }
}

export default MoneyManager
