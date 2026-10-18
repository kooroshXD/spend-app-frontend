
function TransactionForm({ onAdd, onClose }) {
  function handleSubmit(event) {
    event.preventDefault()

    const formData = new FormData(event.currentTarget)
    const name = String(formData.get('name') || '').trim()
    const amount = Number(formData.get('amount'))

    if (!name || !Number.isFinite(amount) || amount <= 0) {
      return
    }

    onAdd({
      id: `${Date.now()}-${Math.random().toString(36).slice(2)}`,
      name,
      category: formData.get('category'),
      date: new Date().toLocaleDateString('en-US', {
        month: 'short',
        day: '2-digit',
        year: 'numeric',
      }),
      amount,
      type: formData.get('type'),
    })

    onClose()
  }

  return (
    <div
      className="modal-overlay"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) {
          onClose()
        }
      }}
    >
      <form className="transaction-form" onSubmit={handleSubmit}>
        <div className="form-heading">
          <div>
            <h2>Add transaction</h2>
            <p>Enter the details of your transaction.</p>
          </div>
          <button
            type="button"
            className="form-close"
            onClick={onClose}
            aria-label="Close"
          >
            ×
          </button>
        </div>

        <label>
          Transaction name
          <input
            name="name"
            placeholder="e.g. Groceries"
            maxLength={80}
            required
          />
        </label>

        <label>
          Amount
          <input
            name="amount"
            type="number"
            min="0.01"
            step="0.01"
            placeholder="0.00"
            required
          />
        </label>

        <label>
          Type
          <select name="type" defaultValue="expense">
            <option value="expense">Expense</option>
            <option value="income">Income</option>
          </select>
        </label>

        <label>
          Category
          <select name="category" defaultValue="Other">
            <option value="Other">Other</option>
            <option value="Food & Drinks">Food & Drinks</option>
            <option value="Transport">Transport</option>
            <option value="Travel">Travel</option>
            <option value="Shopping">Shopping</option>
            <option value="Subscriptions">Subscriptions</option>
            <option value="Income">Income</option>
            <option value="Salary">Salary</option>
            <option value="Freelance">Freelance</option>
            <option value="Education">Education</option>
            <option value="Health">Health</option>
          </select>
        </label>

        <div className="form-actions">
          <button
            type="button"
            className="cancel-button"
            onClick={onClose}
          >
            Cancel
          </button>
          <button type="submit" className="primary-button">
            Save transaction
          </button>
        </div>
      </form>
    </div>
  )
}

export default TransactionForm
