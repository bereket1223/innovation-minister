import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

export function InnovationTable() {
  const innovations = [
    { id: 1, name: "Smart Home Assistant", inventor: "Alice Brown", patentStatus: "Pending" },
    { id: 2, name: "Eco-friendly Packaging", inventor: "Charlie Green", patentStatus: "Approved" },
    { id: 3, name: "AR Learning Platform", inventor: "David Blue", patentStatus: "In Review" },
  ]

  return (
    <Table>
      <TableCaption>A list of innovations.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Innovation Name</TableHead>
          <TableHead>Inventor</TableHead>
          <TableHead>Patent Status</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {innovations.map((innovation) => (
          <TableRow key={innovation.id}>
            <TableCell>{innovation.name}</TableCell>
            <TableCell>{innovation.inventor}</TableCell>
            <TableCell>{innovation.patentStatus}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}

