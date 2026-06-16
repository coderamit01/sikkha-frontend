import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getAllSubject } from "@/services/subject.service";
import SubjectTable from "@/components/table/SubjectTable";
import { Subject } from "@/types/subject.types";
import { Category } from "@/types/category.types";
import { getAllCategory } from "@/services/category.service";
import SubjectAddForm from "@/components/forms/SubjectAddForm";

const TutorSubject = async () => {
  const data = await getAllSubject();
  const subjects: Subject[] = data?.data || [];
  const categoryData = await getAllCategory();
  const categories: Category[] = categoryData?.data;

  return (
    <div className="grid grid-cols-12 gap-5">
      <div className="col-span-12 lg:col-span-7">
        <Card className="gap-4">
          <CardHeader>
            <CardTitle>All Subject</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Subject Name</TableHead>
                  <TableHead className="text-end">Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {subjects.map((subject) => (
                  <SubjectTable key={subject.id} subject={subject} categories={categories} />
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
      <div className="col-span-12 lg:col-span-5">
        <SubjectAddForm categories={categories} />
      </div>
    </div>
  )
}

export default TutorSubject