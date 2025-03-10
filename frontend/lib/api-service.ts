const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api"

export async function fetchDepartmentById(id: string) {
  const response = await fetch(`${API_BASE_URL}/department/${id}`)

  if (!response.ok) {
    throw new Error(`Failed to fetch data: ${response.status} ${response.statusText}`)
  }

  return response.json()
}

export async function fetchDepartmentsByType(type: string) {
  const response = await fetch(`${API_BASE_URL}/department/type/${type}`)

  if (!response.ok) {
    throw new Error(`Failed to fetch ${type}: ${response.status} ${response.statusText}`)
  }

  return response.json()
}

export async function createDepartment(formData: FormData) {
  const response = await fetch(`${API_BASE_URL}/department/createDepartment`, {
    method: "POST",
    body: formData,
  })

  if (!response.ok) {
    const errorData = await response.json()
    throw new Error(errorData.message || "An error occurred during submission.")
  }

  return response.json()
}

export async function deleteDepartment(id: string) {
  const response = await fetch(`${API_BASE_URL}/department/delete/${id}`, {
    method: "DELETE",
  })

  if (!response.ok) {
    throw new Error(`Failed to delete: ${response.status} ${response.statusText}`)
  }

  return response.json()
}

export async function approveDepartment(id: string) {
  const response = await fetch(`${API_BASE_URL}/department/approve/${id}`, {
    method: "PUT",
  })

  if (!response.ok) {
    throw new Error(`Failed to approve: ${response.status} ${response.statusText}`)
  }

  return response.json()
}

