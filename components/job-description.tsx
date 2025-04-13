interface JobDescriptionProps {
  job: {
    description: string
    requirements: string[]
    responsibilities: string[]
  }
}

export function JobDescription({ job }: JobDescriptionProps) {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Description</h3>
        <p className="mt-2 text-muted-foreground">{job.description}</p>
      </div>
      <div>
        <h3 className="text-lg font-medium">Requirements</h3>
        <ul className="mt-2 list-disc pl-5 text-muted-foreground">
          {job.requirements.map((requirement, index) => (
            <li key={index}>{requirement}</li>
          ))}
        </ul>
      </div>
      <div>
        <h3 className="text-lg font-medium">Responsibilities</h3>
        <ul className="mt-2 list-disc pl-5 text-muted-foreground">
          {job.responsibilities.map((responsibility, index) => (
            <li key={index}>{responsibility}</li>
          ))}
        </ul>
      </div>
    </div>
  )
}
