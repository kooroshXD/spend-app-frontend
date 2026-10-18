
import './App.css'
import { useMemo, useState } from 'react'
import TransactionForm from './components/TransactionForm.jsx'

const initialTransactions = [
  { id: 1, name: 'Salary', category: 'Income', date: 'Oct 16, 2026', amount: 3200, type: 'income', icon: '↙' },
  { id: 2, name: 'Groceries', category: 'Food & Drinks', date: 'Oct 15, 2026', amount: 86.5, type: 'expense', icon: '🛒' },
  { id: 3, name: 'Netflix', category: 'Subscriptions', date: 'Oct 14, 2026', amount: 15.99, type: 'expense', icon: '▶' },
  { id: 4, name: 'Freelance Project', category: 'Income', date: 'Oct 13, 2026', amount: 450, type: 'income', icon: '↗' },
  { id: 5, name: 'Transportation', category: 'Travel', date: 'Oct 12, 2026', amount: 32, type: 'expense', icon: '🚆' },
]

function formatMoney(amount) {
  return amount.toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD',
  })
}

function App() {
  const [items, setItems] = useState(initialTransactions)
  const [showForm, setShowForm] = useState(false)

  const totals = useMemo(() => {
    const income = items
      .filter((item) => item.type === 'income')
      .reduce((sum, item) => sum + item.amount, 0)

    const expenses = items
      .filter((item) => item.type === 'expense')
      .reduce((sum, item) => sum + item.amount, 0)

    return {
      income,
      expenses,
      balance: income - expenses,
    }
  }, [items])

  const dynamicStats = [
    {
      title: 'Total Balance',
      amount: formatMoney(totals.balance),
      icon: '◈',
      tone: 'purple',
    },
    {
      title: 'Total Income',
      amount: formatMoney(totals.income),
      icon: '↙',
      tone: 'green',
    },
    {
      title: 'Total Expenses',
      amount: formatMoney(totals.expenses),
      icon: '↗',
      tone: 'orange',
    },
  ]

  function addTransaction(transaction) {
    setItems((current) => [transaction, ...current])
  }

  function deleteTransaction(id) {
    setItems((current) => current.filter((item) => item.id !== id))
  }

  return (
    <div className="app-shell">
      <aside className="sidebar">
        <div className="brand">
          <span className="brand-icon">S</span>
          <span>Spendly</span>
        </div>

        <p className="sidebar-label">MENU</p>

        <nav className="sidebar-nav">
          <a className="nav-item active" href="#dashboard">
            <span>▦</span>
            Dashboard
          </a>
          <a className="nav-item" href="#transactions">
            <span>↔</span>
            Transactions
          </a>
          <a className="nav-item" href="#budgets">
            <span>◷</span>
            Budgets
          </a>
        </nav>

        <div className="sidebar-footer">
          <div className="profile-avatar">U</div>
          <div>
            <strong>My Account</strong>
            <p>Personal account</p>
          </div>
        </div>
      </aside>

      <main className="main-content" id="dashboard">
        <header className="topbar">
          <div>
            <p className="eyebrow">PERSONAL FINANCE</p>
            <h1>Dashboard</h1>
          </div>

          <button
            className="primary-button"
            type="button"
            onClick={() => setShowForm(true)}
          >
            <span>＋</span> Add transaction
          </button>
        </header>

        <section className="welcome-section">
          <div>
            <p className="eyebrow">FRIDAY, OCTOBER 16, 2026</p>
            <h2>Welcome back!</h2>
            <p>Here is an overview of your finances.</p>
          </div>
        </section>

        <section className="stats-grid">
          {dynamicStats.map((stat) => (
            <article className={`stat-card ${stat.tone}`} key={stat.title}>
              <div className="stat-card-top">
                <span>{stat.title}</span>
                <span className="stat-icon">{stat.icon}</span>
              </div>
              <strong className="stat-amount">{stat.amount}</strong>
              <p>Based on your transactions</p>
            </article>
          ))}
        </section>

        <section className="dashboard-grid">
          <article className="panel spending-panel">
            <div className="panel-heading">
              <div>
                <h2>Spending overview</h2>
                <p>Your current income and expenses</p>
              </div>
              <span className="panel-badge">Overview</span>
            </div>

            <div className="spending-summary">
              <div>
                <span className="legend-dot income-dot" />
                <span>Total income</span>
                <strong>{formatMoney(totals.income)}</strong>
              </div>
              <div>
                <span className="legend-dot expense-dot" />
                <span>Total expenses</span>
                <strong>{formatMoney(totals.expenses)}</strong>
              </div>
            </div>

            <div className="spending-bar">
              <span
                className="income-bar"
                style={{
                  width: `${
                    totals.income + totals.expenses > 0
                      ? (totals.income / (totals.income + totals.expenses)) * 100
                      : 0
                  }%`,
                }}
              />
              <span
                className="expense-bar"
                style={{
                  width: `${
                    totals.income + totals.expenses > 0
                      ? (totals.expenses / (totals.income + totals.expenses)) * 100
                      : 0
                  }%`,
                }}
              />
            </div>

            <p className="spending-note">
              {totals.income >= totals.expenses
                ? 'Your income is higher than your expenses.'
                : 'Your expenses are higher than your income.'}
            </p>
          </article>

          <article className="panel" id="budgets">
            <div className="panel-heading">
              <div>
                <h2>Budget summary</h2>
                <p>Expense categories</p>
              </div>
            </div>

            <div className="budget-list">
              {[
                { name: 'Food & Drinks', icon: '🛒', category: 'Food & Drinks' },
                { name: 'Subscriptions', icon: '▶', category: 'Subscriptions' },
                { name: 'Transport', icon: '🚆', category: 'Transport' },
                { name: 'Other', icon: '◈', category: 'Other' },
              ].map((budget) => {
                const amount = items
                  .filter(
                    (item) =>
                      item.type === 'expense' &&
                      item.category === budget.category
                  )
                  .reduce((sum, item) => sum + item.amount, 0)

                return (
                  <div className="budget-item" key={budget.category}>
                    <span className="budget-icon">{budget.icon}</span>
                    <div className="budget-info">
                      <strong>{budget.name}</strong>
                      <span>{formatMoney(amount)}</span>
                    </div>
                  </div>
                )
              })}
            </div>
          </article>
        </section>

        <section className="panel transactions-panel" id="transactions">
          <div className="panel-heading">
            <div>
              <h2>Recent transactions</h2>
              <p>You have {items.length} transactions</p>
            </div>
            <button
              className="secondary-button"
              type="button"
              onClick={() => setShowForm(true)}
            >
              ＋ Add new
            </button>
          </div>

          {items.length === 0 ? (
            <div className="empty-state">
              <span>↔</span>
              <h3>No transactions yet</h3>
              <p>Add your first transaction to get started.</p>
              <button
                className="primary-button"
                type="button"
                onClick={() => setShowForm(true)}
              >
                Add transaction
              </button>
            </div>
          ) : (
            <div className="transaction-table">
              <div className="transaction-row table-header">
                <span>Transaction</span>
                <span>Category</span>
                <span>Date</span>
                <span>Amount</span>
                <span />
              </div>

              {items.map((transaction) => (
                <div className="transaction-row" key={transaction.id}>
                  <div className="transaction-name">
                    <span className={`transaction-icon ${transaction.type}`}>
                      {transaction.icon ||
                        (transaction.type === 'income' ? '↙' : '↗')}
                    </span>
                    <strong>{transaction.name}</strong>
                  </div>

                  <span className="transaction-category">
                    {transaction.category}
                  </span>

                  <span className="transaction-date">
                    {transaction.date}
                  </span>

                  <strong className={`transaction-amount ${transaction.type}`}>
                    {transaction.type === 'income' ? '+' : '−'}
                    {formatMoney(transaction.amount)}
                  </strong>

                  <button
                    type="button"
                    className="delete-transaction"
                    onClick={() => deleteTransaction(transaction.id)}
                    aria-label={`Delete ${transaction.name}`}
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          )}
        </section>

        <footer className="app-footer">
          Spendly · Personal finance dashboard
        </footer>
      </main>

      {showForm && (
        <TransactionForm
          onAdd={addTransaction}
          onClose={() => setShowForm(false)}
        />
      )}
    </div>
  )
}

export default App
