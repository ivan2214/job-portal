import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Briefcase, MapPin } from 'lucide-react';

export default function JobCard({ job }: { job: any }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{job.title}</CardTitle>
        <p className="text-sm text-muted-foreground">{job.company}</p>
      </CardHeader>
      <CardContent>
        <p>{job.description}</p>
        <div className="flex items-center mt-4 space-x-4 text-sm text-muted-foreground">
          <span className="flex items-center"><MapPin size={16} className="mr-1" /> {job.location}</span>
          <span className="flex items-center"><Briefcase size={16} className="mr-1" /> {job.type}</span>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Badge variant="secondary">{job.type}</Badge>
        <Button variant="outline">Ver Detalles</Button>
      </CardFooter>
    </Card>
  );
}
