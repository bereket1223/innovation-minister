import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

export function ResearchTable() {
  const researchProjects = [
    { id: 1, title: "AI in Healthcare", lead: "Dr. Smith", status: "Ongoing" },
    { id: 2, title: "Quantum Computing", lead: "Dr. Johnson", status: "Completed" },
    { id: 3, title: "Renewable Energy", lead: "Dr. Williams", status: "Planning" },
  ]

  return (
    <Table>
      <TableCaption>A list of research projects.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Title</TableHead>
          <TableHead>Lead Researcher</TableHead>
          <TableHead>Status</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {researchProjects.map((project) => (
          <TableRow key={project.id}>
            <TableCell>{project.title}</TableCell>
            <TableCell>{project.lead}</TableCell>
            <TableCell>{project.status}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}

