'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { 
  FaStar, 
  FaStarHalfAlt, 
  FaRegStar,
  FaCheck,
  FaTimes,
  FaTrash,
  FaReply,
  FaFilter,
  FaSearch,
  FaChevronDown
} from 'react-icons/fa'
import { FiTrash2, FiCheck, FiEye, FiMail } from 'react-icons/fi'

// Sample reviews data
const reviewsData = [
  { 
    id: 1, 
    product: 'Velocity Jacket', 
    customer: 'John Doe', 
    email: 'john@email.com',
    rating: 5, 
    comment: 'Amazing quality! The fit is perfect and the material feels premium. Highly recommend!',
    date: '2024-01-15', 
    status: 'Approved',
    helpful: 12,
    images: 2
  },
  { 
    id: 2, 
    product: 'Aura Dress', 
    customer: 'Jane Smith', 
    email: 'jane@email.com',
    rating: 4, 
    comment: 'Beautiful dress, fits perfectly. The color is exactly as shown. Would buy again.',
    date: '2024-01-14', 
    status: 'Approved',
    helpful: 8,
    images: 1
  },
  { 
    id: 3, 
    product: 'Nova Sneakers', 
    customer: 'Mike Johnson', 
    email: 'mike@email.com',
    rating: 3, 
    comment: 'Good but size runs small. I would recommend ordering a size up.',
    date: '2024-01-13', 
    status: 'Pending',
    helpful: 5,
    images: 0
  },
  { 
    id: 4, 
    product: 'Cargo Pants', 
    customer: 'Sarah Wilson', 
    email: 'sarah@email.com',
    rating: 5, 
    comment: 'Best pants ever! Comfortable, stylish, and great quality. Love them!',
    date: '2024-01-12', 
    status: 'Approved',
    helpful: 15,
    images: 3
  },
  { 
    id: 5, 
    product: 'Silk Blouse', 
    customer: 'Emily Davis', 
    email: 'emily@email.com',
    rating: 2, 
    comment: 'Not what I expected. The material feels cheap and the fit is off.',
    date: '2024-01-11', 
    status: 'Pending',
    helpful: 3,
    images: 1
  },
  { 
    id: 6, 
    product: 'Leather Belt', 
    customer: 'David Wilson', 
    email: 'david@email.com',
    rating: 4, 
    comment: 'Great quality leather. The buckle is solid and looks premium.',
    date: '2024-01-10', 
    status: 'Approved',
    helpful: 6,
    images: 0
  },
]

export default function AdminReviews() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(true)
  const [reviews, setReviews] = useState(reviewsData)
  const [searchTerm, setSearchTerm] = useState('')
  const [filterStatus, setFilterStatus] = useState('All')
  const [filterRating, setFilterRating] = useState('All')
  const [selectedReview, setSelectedReview] = useState<any>(null)
  const [showModal, setShowModal] = useState(false)

  useEffect(() => {
    // Check authentication
    const isAuthenticated = localStorage.getItem('adminAuth') === 'true'
    if (!isAuthenticated) {
      router.push('/admin-login')
    } else {
      setIsLoading(false)
    }
  }, [router])

  // Filter reviews
  const filteredReviews = reviews.filter(review => {
    const matchesSearch = review.product.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          review.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          review.comment.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = filterStatus === 'All' || review.status === filterStatus
    const matchesRating = filterRating === 'All' || review.rating === parseInt(filterRating)
    return matchesSearch && matchesStatus && matchesRating
  })

  // Get unique statuses for filter
  const statuses = ['All', ...new Set(reviews.map(r => r.status))]
  const ratings = ['All', '5', '4', '3', '2', '1']

  // Handle approve review
  const handleApprove = (id: number) => {
    setReviews(reviews.map(r => r.id === id ? { ...r, status: 'Approved' } : r))
  }

  // Handle reject review
  const handleReject = (id: number) => {
    if (confirm('Reject this review?')) {
      setReviews(reviews.filter(r => r.id !== id))
    }
  }

  // Handle delete review
  const handleDelete = (id: number) => {
    if (confirm('Are you sure you want to delete this review?')) {
      setReviews(reviews.filter(r => r.id !== id))
    }
  }

  // Handle view review
  const viewReview = (review: any) => {
    setSelectedReview(review)
    setShowModal(true)
  }

  // Get rating stars
  const renderStars = (rating: number) => {
    return (
      <div className="flex text-yellow-400">
        {[...Array(5)].map((_, i) => (
          <FaStar key={i} className={i < rating ? 'text-yellow-400' : 'text-white/20'} />
        ))}
      </div>
    )
  }

  // Get status badge
  const getStatusBadge = (status: string) => {
    switch(status) {
      case 'Approved':
        return 'bg-green-400/20 text-green-400'
      case 'Pending':
        return 'bg-yellow-400/20 text-yellow-400'
      default:
        return 'bg-red-400/20 text-red-400'
    }
  }

  // Calculate summary stats
  const totalReviews = reviews.length
  const approvedReviews = reviews.filter(r => r.status === 'Approved').length
  const pendingReviews = reviews.filter(r => r.status === 'Pending').length
  const averageRating = (reviews.reduce((sum, r) => sum + r.rating, 0) / totalReviews).toFixed(1)

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-white/50">Loading...</div>
      </div>
    )
  }

  return (
    <div>
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-light tracking-widest">REVIEWS</h1>
          <p className="text-white/50 text-sm mt-1">Manage customer reviews and ratings</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-white/70 hover:bg-white/10 transition text-sm">
          <FaReply />
          Export Reviews
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
          <p className="text-white/50 text-sm">Total Reviews</p>
          <p className="text-2xl font-bold text-white mt-2">{totalReviews}</p>
          <p className="text-white/30 text-sm mt-1">All time</p>
        </div>
        <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
          <p className="text-white/50 text-sm">Average Rating</p>
          <div className="flex items-center gap-2 mt-2">
            <p className="text-2xl font-bold text-gold-400">{averageRating}</p>
            <div className="flex text-yellow-400 text-sm">
              <FaStar />
              <FaStar />
              <FaStar />
              <FaStar />
              <FaStar />
            </div>
          </div>
          <p className="text-white/30 text-sm mt-1">Out of 5 stars</p>
        </div>
        <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
          <p className="text-white/50 text-sm">Approved</p>
          <p className="text-2xl font-bold text-green-400 mt-2">{approvedReviews}</p>
          <p className="text-white/30 text-sm mt-1">{Math.round((approvedReviews/totalReviews)*100)}% of total</p>
        </div>
        <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
          <p className="text-white/50 text-sm">Pending Review</p>
          <p className="text-2xl font-bold text-yellow-400 mt-2">{pendingReviews}</p>
          <p className="text-white/30 text-sm mt-1">Awaiting moderation</p>
        </div>
      </div>

      {/* Search and Filter */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30" />
          <input
            type="text"
            placeholder="Search reviews by product, customer, or comment..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-white/5 border border-white/10 rounded-xl px-12 py-3 text-white placeholder-white/30 focus:border-gold-400/50 outline-none transition"
          />
        </div>
        <div className="relative">
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="appearance-none bg-white/5 border border-white/10 rounded-xl px-6 py-3 pr-12 text-white focus:border-gold-400/50 outline-none transition cursor-pointer min-w-[140px]"
          >
            {statuses.map((status) => (
              <option key={status} value={status} className="bg-zinc-900">
                {status}
              </option>
            ))}
          </select>
          <FaChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-white/30 pointer-events-none" />
        </div>
        <div className="relative">
          <select
            value={filterRating}
            onChange={(e) => setFilterRating(e.target.value)}
            className="appearance-none bg-white/5 border border-white/10 rounded-xl px-6 py-3 pr-12 text-white focus:border-gold-400/50 outline-none transition cursor-pointer min-w-[120px]"
          >
            {ratings.map((rating) => (
              <option key={rating} value={rating} className="bg-zinc-900">
                {rating === 'All' ? 'All Ratings' : `${rating} Stars`}
              </option>
            ))}
          </select>
          <FaChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-white/30 pointer-events-none" />
        </div>
      </div>

      {/* Reviews Table */}
      <div className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-white/5">
              <tr>
                <th className="text-left p-4 text-white/50 text-sm font-medium">Product</th>
                <th className="text-left p-4 text-white/50 text-sm font-medium">Customer</th>
                <th className="text-left p-4 text-white/50 text-sm font-medium">Rating</th>
                <th className="text-left p-4 text-white/50 text-sm font-medium">Review</th>
                <th className="text-left p-4 text-white/50 text-sm font-medium">Status</th>
                <th className="text-left p-4 text-white/50 text-sm font-medium">Date</th>
                <th className="text-left p-4 text-white/50 text-sm font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredReviews.map((review, index) => (
                <motion.tr 
                  key={review.id} 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: index * 0.05 }}
                  className="border-t border-white/5 hover:bg-white/5 transition"
                >
                  <td className="p-4 text-white/80 font-medium">{review.product}</td>
                  <td className="p-4 text-white/80">{review.customer}</td>
                  <td className="p-4">
                    <div className="flex text-yellow-400">
                      {[...Array(5)].map((_, i) => (
                        <FaStar key={i} className={i < review.rating ? 'text-yellow-400' : 'text-white/20'} />
                      ))}
                    </div>
                  </td>
                  <td className="p-4 text-white/50 text-sm max-w-xs truncate">
                    {review.comment}
                  </td>
                  <td className="p-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusBadge(review.status)}`}>
                      {review.status}
                    </span>
                  </td>
                  <td className="p-4 text-white/50 text-sm">{review.date}</td>
                  <td className="p-4">
                    <div className="flex gap-2">
                      {review.status === 'Pending' && (
                        <>
                          <button 
                            onClick={() => handleApprove(review.id)}
                            className="p-2 rounded-lg bg-green-400/20 text-green-400 hover:bg-green-400/30 transition"
                            title="Approve"
                          >
                            <FiCheck />
                          </button>
                          <button 
                            onClick={() => handleReject(review.id)}
                            className="p-2 rounded-lg bg-red-400/20 text-red-400 hover:bg-red-400/30 transition"
                            title="Reject"
                          >
                            <FaTimes />
                          </button>
                        </>
                      )}
                      <button 
                        onClick={() => viewReview(review)}
                        className="p-2 rounded-lg bg-blue-400/20 text-blue-400 hover:bg-blue-400/30 transition"
                        title="View Details"
                      >
                        <FiEye />
                      </button>
                      <button 
                        onClick={() => handleDelete(review.id)}
                        className="p-2 rounded-lg bg-red-400/20 text-red-400 hover:bg-red-400/30 transition"
                        title="Delete"
                      >
                        <FiTrash2 />
                      </button>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Empty State */}
        {filteredReviews.length === 0 && (
          <div className="p-12 text-center text-white/30">
            <p className="text-lg">No reviews found</p>
            <p className="text-sm mt-1">Try adjusting your search or filter</p>
          </div>
        )}

        {/* Footer */}
        <div className="p-4 border-t border-white/10 flex justify-between items-center text-white/50 text-sm">
          <span>Showing {filteredReviews.length} of {reviews.length} reviews</span>
          <div className="flex gap-2">
            <button className="px-4 py-2 rounded-lg bg-white/5 hover:bg-white/10 transition disabled:opacity-30">
              Previous
            </button>
            <button className="px-4 py-2 rounded-lg bg-gold-400/20 text-gold-400 hover:bg-gold-400/30 transition">
              1
            </button>
            <button className="px-4 py-2 rounded-lg bg-white/5 hover:bg-white/10 transition">
              2
            </button>
            <button className="px-4 py-2 rounded-lg bg-white/5 hover:bg-white/10 transition">
              Next
            </button>
          </div>
        </div>
      </div>

      {/* Review Details Modal */}
      {showModal && selectedReview && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <motion.div 
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-zinc-900 rounded-3xl max-w-2xl w-full p-8 border border-gold-400/20 max-h-[90vh] overflow-y-auto"
          >
            <div className="flex justify-between items-start mb-6">
              <div>
                <h2 className="text-2xl font-light tracking-widest">Review Details</h2>
                <p className="text-white/50 text-sm mt-1">Full review information</p>
              </div>
              <button 
                onClick={() => setShowModal(false)}
                className="text-white/50 hover:text-white text-2xl"
              >
                ✕
              </button>
            </div>

            <div className="space-y-6">
              <div>
                <p className="text-white/50 text-sm">Product</p>
                <p className="text-white text-lg font-medium">{selectedReview.product}</p>
              </div>

              <div>
                <p className="text-white/50 text-sm">Customer</p>
                <p className="text-white font-medium">{selectedReview.customer}</p>
                <p className="text-white/40 text-sm">{selectedReview.email}</p>
              </div>

              <div>
                <p className="text-white/50 text-sm">Rating</p>
                <div className="flex text-yellow-400 text-2xl mt-1">
                  {[...Array(5)].map((_, i) => (
                    <FaStar key={i} className={i < selectedReview.rating ? 'text-yellow-400' : 'text-white/20'} />
                  ))}
                </div>
              </div>

              <div>
                <p className="text-white/50 text-sm">Review</p>
                <p className="text-white/80 bg-white/5 p-4 rounded-xl mt-1">
                  "{selectedReview.comment}"
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-white/50 text-sm">Status</p>
                  <span className={`inline-block mt-1 px-3 py-1 rounded-full text-xs font-medium ${getStatusBadge(selectedReview.status)}`}>
                    {selectedReview.status}
                  </span>
                </div>
                <div>
                  <p className="text-white/50 text-sm">Date</p>
                  <p className="text-white">{selectedReview.date}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-white/50 text-sm">Helpful</p>
                  <p className="text-white">{selectedReview.helpful} people found this helpful</p>
                </div>
                <div>
                  <p className="text-white/50 text-sm">Images</p>
                  <p className="text-white">{selectedReview.images} images attached</p>
                </div>
              </div>

              <div className="flex gap-4 pt-4">
                {selectedReview.status === 'Pending' && (
                  <>
                    <button 
                      onClick={() => {
                        handleApprove(selectedReview.id)
                        setShowModal(false)
                      }}
                      className="flex-1 py-3 rounded-xl bg-green-400/20 text-green-400 font-medium hover:bg-green-400/30 transition"
                    >
                      <FiCheck className="inline mr-2" />
                      Approve
                    </button>
                    <button 
                      onClick={() => {
                        handleReject(selectedReview.id)
                        setShowModal(false)
                      }}
                      className="flex-1 py-3 rounded-xl bg-red-400/20 text-red-400 font-medium hover:bg-red-400/30 transition"
                    >
                      <FaTimes className="inline mr-2" />
                      Reject
                    </button>
                  </>
                )}
                <button 
                  onClick={() => {
                    setShowModal(false)
                  }}
                  className="flex-1 py-3 rounded-xl bg-white/10 text-white hover:bg-white/20 transition"
                >
                  Close
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  )
}
