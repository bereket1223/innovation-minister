import LoginForm from "../components/LoginForm"

export default function LoginPage() {
  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-xl">
      <h1 className="text-2xl font-bold mb-6 text-blue-600 text-center">Log In</h1>
      <LoginForm />

    </div>
  )
}

