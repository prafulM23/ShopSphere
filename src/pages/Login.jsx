
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import { useAuth } from '../context/AuthContext'

function Login() {
    const navigate = useNavigate()
    const { login, loading } = useAuth()

    const [formData, setFormData] = useState({
        email: '',
        password: '',
    })

    const [error, setError] = useState('')

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setError('')

        try {
            await login(formData)
            navigate('/')
        } catch (err) {
            setError(
                err.response?.data?.message ||
                'Login failed. Please try again.'
            )
        }
    }

    return (
        <main className="flex min-h-screen min-h-[100svh] items-center justify-center bg-[#F5F0E8] px-4 py-8 sm:px-6 sm:py-12">

            <div className="relative w-full max-w-md bg-white px-5 py-8 shadow-sm sm:px-10 sm:py-10">

                <Link
                    to="/"
                    className="absolute left-5 top-5 flex items-center gap-1 text-xs text-stone-500 transition hover:text-[#9A7747] sm:left-8 sm:top-7"
                >
                    <ArrowLeft size={15} />
                    Back to Home
                </Link>

                <div className="mb-8 mt-8 text-center sm:mb-10">
                    <Link
                        to="/"
                        className="font-serif text-3xl font-bold tracking-tight text-stone-900 sm:text-4xl"
                    >
                        ShopSphere<span className="text-[#B28A50]">.</span>
                    </Link>

                    <div className="mx-auto mb-5 mt-7 h-px w-12 bg-[#B28A50]" />

                    <h1 className="font-serif text-3xl text-stone-900 sm:text-4xl">
                        Welcome Back
                    </h1>

                    <p className="mt-2 text-sm leading-6 text-stone-500">
                        Sign in to discover timeless style.
                    </p>
                </div>

                {error && (
                    <p className="mb-5 rounded-sm bg-red-50 p-3 text-sm leading-5 text-red-600">
                        {error}
                    </p>
                )}

                <form onSubmit={handleSubmit} className="space-y-5">

                    <div>
                        <label
                            htmlFor="email"
                            className="mb-2 block text-sm font-medium text-stone-800"
                        >
                            Email Address
                        </label>

                        <input
                            id="email"
                            type="email"
                            name="email"
                            autoComplete="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="Enter your email"
                            required
                            className="w-full min-w-0 border border-stone-300 bg-[#FDFCF9] px-4 py-3.5 text-base text-stone-900 outline-none transition placeholder:text-stone-400 focus:border-[#9A7747] focus:ring-1 focus:ring-[#9A7747] sm:text-sm"
                        />
                    </div>

                    <div>
                        <label
                            htmlFor="password"
                            className="mb-2 block text-sm font-medium text-stone-800"
                        >
                            Password
                        </label>

                        <input
                            id="password"
                            type="password"
                            name="password"
                            autoComplete="current-password"
                            value={formData.password}
                            onChange={handleChange}
                            placeholder="Enter your password"
                            required
                            className="w-full min-w-0 border border-stone-300 bg-[#FDFCF9] px-4 py-3.5 text-base text-stone-900 outline-none transition placeholder:text-stone-400 focus:border-[#9A7747] focus:ring-1 focus:ring-[#9A7747] sm:text-sm"
                        />
                    </div>

                    <div className="flex justify-end">
                        <Link
                            to="/forgot-password"
                            className="text-sm font-medium text-[#9A7747] transition hover:underline"
                        >
                            Forgot Password?
                        </Link>
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-[#1C1917] px-4 py-4 text-sm font-medium uppercase tracking-[0.18em] text-white transition duration-300 hover:bg-[#9A7747] disabled:cursor-not-allowed disabled:opacity-60"
                    >
                        {loading ? 'Signing In...' : 'Sign In'}
                    </button>

                </form>

                <div className="my-7 flex items-center gap-3">
                    <div className="h-px flex-1 bg-stone-200" />
                    <span className="text-xs uppercase tracking-widest text-stone-400">
                        New to ShopSphere?
                    </span>
                    <div className="h-px flex-1 bg-stone-200" />
                </div>

                <Link
                    to="/signup"
                    className="block w-full border border-stone-300 px-4 py-3.5 text-center text-sm font-medium text-stone-900 transition hover:border-[#9A7747] hover:text-[#9A7747]"
                >
                    Create an Account
                </Link>

                <p className="mt-7 text-center text-xs leading-5 text-stone-400">
                    Experience timeless elegance with ShopSphere.
                </p>

            </div>
        </main>
    )
}

export default Login
