import React from 'react'

const Pagination = ({ current, total, onPageChange }) => {
  const pages = []
  const start = Math.max(1, current - 2)
  const end = Math.min(total, current + 2)

  for (let p = start; p <= end; p++) pages.push(p)

  return (
    <div className="flex items-center justify-center gap-2 mt-4">
      <button disabled={current === 1} onClick={() => onPageChange(current - 1)}>Prev</button>
      {pages.map(p => (
        <button
          key={p}
          onClick={() => onPageChange(p)}
          className={p === current ? 'font-bold underline' : ''}
        >
          {p}
        </button>
      ))}
      <button disabled={current === total} onClick={() => onPageChange(current + 1)}>Next</button>
    </div>
  )
}

export default Pagination
