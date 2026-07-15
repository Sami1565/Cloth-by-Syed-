'use client'

import { useState } from 'react'
import { FaStar, FaStarHalfAlt } from 'react-icons/fa'
import { FiTrash2, FiCheck } from 'react-icons/fi'

const reviews = [
  { id: 1, product: 'Velocity Jacket', customer: 'John Doe', rating: 5, comment: 'Amazing quality! Love it.', date: '2024-01-15', status: 'Approved' },
  { id: 2, product: 'Aura Dress', customer: 'Jane Smith', rating: 4, comment: 'Beautiful dress, fits perfectly.', date: '2024-01-14', status: 'Approved' },
  { id: 3, product: 'Nova Sneakers', customer: 'Mike Johnson', rating: 3, comment: 'Good but size runs small.', date: '2024-01-13', status: 'Pending' },
  { id: 4, product: 'Cargo Pants', customer: 'Sarah Wilson', rating: 5, comment: 'Best pants ever!', date: '2024-01-12', status: 'Approved' },
]

export default function AdminReviews() {
  const [reviewList, setReviewList] = useState(reviews)

  const handleDelete = (id: number) => {
    if (confirm('Delete this review?')) {
      setReviewList(reviewList.filter(r => r.id !== id))
    }
  }

  const handleApprove = (id: number) => {
    setReviewList(reviewList.map(r => 
      r.id === id ? { ...r, status: 'Approved' } : r
    ))
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-light tracking-widest">REVIEWS</h1>
          <p className="text-white/50 text-sm mt-1">Manage customer reviews</p>
        </div>
      </div>

      <div className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-white/5">
              <tr>
                <th className="text-left p-4 text-white/50 text-sm font-medium">Product</th>
                <th className="text-left p-4 text-white/50 text-sm font-medium">Customer</th>
                <th className="text-left p-4 text-white/50 text-sm font-medium">Rating</th>
                <th className="text-left p-4 text-white/50 text-sm font-medium">Review</th>
                <th className="text-left p-4 text-white/50 text-sm font-medium">Date</th>
                <th className="text-left p-4 text-white/50 text-sm font-medium">Status</th>
                <th className="text-left p-4 text-white/50 text-sm font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {reviewList.map((review) => (
                <tr key={review.id} className="border-t border-white/5 hover:bg-white/5 transition">
                  <td className="p-4 text-white/80">{review.product}</td>
                  <td className="p-4 text-white/80">{review.customer}</td>
                  <td className="p-4">
                    <div className="flex text-yellow-400">
                      {[...Array(5)].map((_, i) => (
                        <FaStar key={i} className={i < review.rating ? 'text-yellow-400' : 'text-white/20'} />
                      ))}
                    </div>
                  </td>
                  <td className="p-4 text-white/50 text-sm max-w-xs truncate">{review.comment}</td>
                  <td className="p-4 text-white/50 text-sm">{review.date}</td>
                  <td className="p-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium
                      ${review.status === 'Approved' ? 'bg-green-400/20 text-green-400' :
                        'bg-yellow-400/20 text-yellow-400'}`}
                    >
                      {review.status}
                    </span>
                  </td>
                  <td className="p-4">
                    <div className="flex gap-2">
                      {review.status === 'Pending' && (
                        <button 
                          onClick={() => handleApprove(review.id)}
                          className="p-2 rounded-lg bg-green-400/20 text-green-400 hover:bg-green-400/30 transition"
                        >
                          <FiCheck />
                        </button>
                      )}
                      <button 
                        onClick={() => handleDelete(review.id)}
                        className="p-2 rounded-lg bg-red-400/20 text-red-400 hover:bg-red-400/30 transition"
                      >
                        <FiTrash2 />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
