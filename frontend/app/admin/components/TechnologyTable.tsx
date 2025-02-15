import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

export function TechnologyTable() {
  const technologies = [
    { id: 1, name: "5G Network", department: "Telecommunications", stage: "Deployment" },
    { id: 2, name: "CRISPR Gene Editing", department: "Biotechnology", stage: "Research" },
    { id: 3, name: "Autonomous Vehicles", department: "Transportation", stage: "Testing" },
  ]

  return (
    <Table>
      <TableCaption>A list of technologies.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Technology Name</TableHead>
          <TableHead>Department</TableHead>
          <TableHead>Development Stage</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {technologies.map((tech) => (
          <TableRow key={tech.id}>
            <TableCell>{tech.name}</TableCell>
            <TableCell>{tech.department}</TableCell>
            <TableCell>{tech.stage}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}

