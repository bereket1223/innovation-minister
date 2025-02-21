"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

interface IndigenousData {
  _id: string;
  fullName: string;
  gender: string;
  age: string;
  nationality: string;
  region: string;
  phoneNumber: string;
  knowledgeTitle: string;
  fileUrl: string;
}

export default function DetailPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const { id } = params;
  const [data, setData] = useState<IndigenousData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/department/detail/${id}`);
        if (!response.ok) {
          throw new Error("Data not found");
        }
        const result = await response.json();
        setData(result);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (!data) return <p>Data not found.</p>;

  const handleDelete = async () => {
    const confirmDelete = window.confirm("Are you sure you want to delete?");
    if (confirmDelete) {
      await fetch(`http://localhost:5000/api/department/detail/${id}`, { method: "DELETE" });
      router.push("/");
    }
  };

  const handleApprove = async () => {
    alert("Approved Successfully!");
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Detail Page</h1>
      <p><strong>Full Name:</strong> {data.fullName}</p>
      <p><strong>Gender:</strong> {data.gender}</p>
      <p><strong>Age:</strong> {data.age}</p>
      <p><strong>Phone:</strong> {data.phoneNumber}</p>

      <Button onClick={handleApprove} variant="success" className="mr-2">Approve</Button>
      <Button onClick={handleDelete} variant="destructive">Delete</Button>
      {data.fileUrl && (
        <Button onClick={() => window.open(data.fileUrl, "_blank")} className="ml-2">View File</Button>
      )}
    </div>
  );
}
