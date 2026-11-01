
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import api from '../services/api'

function ForgotPassword() {
    const navigate = useNavigate()

    const [step, setStep] = useState(1)
    const [email, setEmail] = useState('')
    const [otp, setOtp] = useState('')
    const [newPassword, setNewPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')

    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')
    const [success, setSuccess] = useState('')

    const handleForgotPassword = async (e) => {
        e.preventDefault()
        setError('')
        setSuccess('')
        setLoading(true)

        try {
            const response = await api.post('/auth/forgot', { email })

            setSuccess(response.data.message)
            setStep(2)
        } catch (err) {
            setError(
                err.response?.data?.message ||
                'Unable to send OTP. Please try again.'
            )
        } finally {
            setLoading(false)
        }
    }

    const handleVerifyOTP = async (e) => {
        e.preventDefault()
        setError('')
        setSuccess('')
        setLoading(true)

        try {
            const response = await api.post('/auth/verify-otp', {
                email,
                otp,
            })

            setSuccess(response.data.message)
            setStep(3)
        } catch (err) {
            setError(
                err.response?.data?.message ||
                'Invalid or expired OTP.'
            )
        } finally {
            setLoading(false)
        }
    }

    const handleResetPassword = async (e) => {
        e.preventDefault()
        setError('')
        setSuccess('')

        if (newPassword !== confirmPassword) {
            setError('Passwords do not match.')
            return
        }

        if (newPassword.length < 8) {
            setError('Password must be at least 8 characters.')
            return
        }

        setLoading(true)

        try {
            const response = await api.post('/auth/reset-password', {
                email,
                otp,
                newPassword,
            })

            setSuccess(response.data.message)

            setTimeout(() => {
                navigate('/login')
            }, 1500)
        } catch (err) {
            setError(
                err.response?.data?.message ||
                'Unable to reset password. Please try again.'
            )
        } finally {
            setLoading(false)
        }
    }

    const steps = [
        'Enter Email',
        'Verify OTP',
        'New Password',
    ]

    return (
        <main className="flex min-h-screen items-center justify-center bg-[#F5F0E8] px-4 py-12">
            <div className="w-full max-w-md rounded-sm bg-white p-8 shadow-sm sm:p-10">

                <Link
                    to="/"
                    className="mb-8 block text-center font-serif text-3xl tracking-wide"
                >
                    ShopSphere<span className="text-[#B28A50]">.</span>
                </Link>

                <h1 className="text-center font-serif text-3xl">
                    Reset Password
                </h1>

                <p className="mt-2 text-center text-sm text-stone-500">
                    {step === 1 && 'Enter your registered email address.'}
                    {step === 2 && 'Enter the 6-digit OTP sent to your email.'}
                    {step === 3 && 'Create a new password for your account.'}
                </p>

                <div className="mt-8 flex items-center justify-between gap-2">
                    {steps.map((label, index) => (
                        <div key={label} className="flex flex-1 flex-col items-center gap-2">
                            <div
                                className={`flex h-8 w-8 items-center justify-center rounded-full text-sm ${step >= index + 1
                                        ? 'bg-[#9A7747] text-white'
                                        : 'bg-stone-200 text-stone-500'
                                    }`}
                            >
                                {index + 1}
                            </div>

                            <span className="text-center text-[10px] text-stone-500 sm:text-xs">
                                {label}
                            </span>
                        </div>
                    ))}
                </div>

                {error && (
                    <p className="mt-6 rounded bg-red-50 p-3 text-sm text-red-600">
                        {error}
                    </p>
                )}

                {success && (
                    <p className="mt-6 rounded bg-green-50 p-3 text-sm text-green-700">
                        {success}
                    </p>
                )}

                {step === 1 && (
                    <form onSubmit={handleForgotPassword} className="mt-8 space-y-5">
                        <div>
                            <label className="mb-2 block text-sm">
                                Email Address
                            </label>

                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Enter your registered email"
                                required
                                className="w-full border border-stone-300 px-4 py-3 text-sm outline-none focus:border-[#9A7747]"
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-black py-3 text-sm uppercase tracking-widest text-white transition hover:bg-[#9A7747] disabled:opacity-60"
                        >
                            {loading ? 'Sending OTP...' : 'Send OTP'}
                        </button>
                    </form>
                )}

                {step === 2 && (
                    <form onSubmit={handleVerifyOTP} className="mt-8 space-y-5">
                        <div>
                            <label className="mb-2 block text-sm">
                                6-Digit OTP
                            </label>

                            <input
                                type="text"
                                inputMode="numeric"
                                maxLength={6}
                                value={otp}
                                onChange={(e) =>
                                    setOtp(e.target.value.replace(/\D/g, ''))
                                }
                                placeholder="Enter OTP"
                                required
                                className="w-full border border-stone-300 px-4 py-3 text-center text-lg tracking-[0.5em] outline-none focus:border-[#9A7747]"
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={loading || otp.length !== 6}
                            className="w-full bg-black py-3 text-sm uppercase tracking-widest text-white transition hover:bg-[#9A7747] disabled:opacity-60"
                        >
                            {loading ? 'Verifying...' : 'Verify OTP'}
                        </button>

                        <button
                            type="button"
                            onClick={() => {
                                setStep(1)
                                setOtp('')
                                setError('')
                                setSuccess('')
                            }}
                            className="w-full text-sm text-[#9A7747] hover:underline"
                        >
                            Change Email
                        </button>
                    </form>
                )}

                {step === 3 && (
                    <form onSubmit={handleResetPassword} className="mt-8 space-y-5">
                        <div>
                            <label className="mb-2 block text-sm">
                                New Password
                            </label>

                            <input
                                type="password"
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                                placeholder="Minimum 8 characters"
                                minLength={8}
                                required
                                className="w-full border border-stone-300 px-4 py-3 text-sm outline-none focus:border-[#9A7747]"
                            />
                        </div>

                        <div>
                            <label className="mb-2 block text-sm">
                                Confirm New Password
                            </label>

                            <input
                                type="password"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                placeholder="Confirm your password"
                                minLength={8}
                                required
                                className="w-full border border-stone-300 px-4 py-3 text-sm outline-none focus:border-[#9A7747]"
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-black py-3 text-sm uppercase tracking-widest text-white transition hover:bg-[#9A7747] disabled:opacity-60"
                        >
                            {loading ? 'Resetting...' : 'Reset Password'}
                        </button>
                    </form>
                )}

                <p className="mt-7 text-center text-sm text-stone-600">
                    Remember your password?{' '}
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

export default ForgotPassword
