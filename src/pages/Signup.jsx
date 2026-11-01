import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

function Signup() {
    const navigate = useNavigate()
    const { signup } = useAuth()

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
    })

    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setError('')
        setLoading(true)

        try {
            await signup(formData)
            navigate('/login', {
                state: { message: 'Account created successfully. Please log in.' },
            })
        } catch (err) {
            const errors = err.response?.data?.errors
            setError(
                Array.isArray(errors)
                    ? errors.join(', ')
                    : err.response?.data?.message || 'Signup failed. Please try again.'
            )
        } finally {
            setLoading(false)
        }
    }

    return (
        <main className="flex min-h-screen items-center justify-center bg-[#F5F0E8] px-4 py-12">
            <div className="w-full max-w-md rounded-sm bg-white p-8 shadow-sm sm:p-10">
                <Link
                    to="/"
                    className="mb-8 block text-center font-serif text-3xl tracking-wide"
                >
                    ShopSphere
                </Link>

                <h1 className="text-center font-serif text-3xl">
                    Create Account
                </h1>

                <p className="mt-2 text-center text-sm text-stone-500">
                    Join us and discover something exceptional
                </p>

                {error && (
                    <p className="mt-6 rounded bg-red-50 p-3 text-sm text-red-600">
                        {error}
                    </p>
                )}

                <form onSubmit={handleSubmit} className="mt-8 space-y-5">
                    <div>
                        <label className="mb-2 block text-sm">Full Name</label>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            placeholder="Enter your name"
                            required
                            className="w-full border border-stone-300 bg-transparent px-4 py-3 text-sm outline-none focus:border-[#9A7747]"
                        />
                    </div>

                    <div>
                        <label className="mb-2 block text-sm">Email Address</label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="Enter your email"
                            required
                            className="w-full border border-stone-300 bg-transparent px-4 py-3 text-sm outline-none focus:border-[#9A7747]"
                        />
                    </div>

                    <div>
                        <label className="mb-2 block text-sm">Password</label>
                        <input
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            placeholder="Minimum 8 characters"
                            minLength={8}
                            required
                            className="w-full border border-stone-300 bg-transparent px-4 py-3 text-sm outline-none focus:border-[#9A7747]"
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-black py-3 text-sm uppercase tracking-widest text-white transition hover:bg-[#9A7747] disabled:opacity-60"
                    >
                        {loading ? 'Creating Account...' : 'Create Account'}
                    </button>
                </form>

                <p className="mt-7 text-center text-sm text-stone-600">
                    Already have an account?{' '}
                    <Link
                        to="/login"
                        className="font-medium text-[#9A7747] hover:underline"
                    >
                        Sign In
                    </Link>
                </p>
            </div>
        </main>
    )
}

export default Signup