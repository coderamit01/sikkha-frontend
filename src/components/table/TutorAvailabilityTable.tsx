import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { IAvailability } from "@/types/availability.types";
import AvailabilityTableRow from "./AvailabilityTableRow";
const TutorAvailabilityTable = ({
  availability,
}: {
  availability: IAvailability[];
}) => {
  return (
    <Table className="text-base">
      <TableHeader>
        <TableRow>
          <TableHead>Date</TableHead>
          <TableHead>Start Time</TableHead>
          <TableHead>End Time</TableHead>
          <TableHead>Duration</TableHead>
          <TableHead>Status</TableHead>
          <TableHead className="text-right">Action</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {availability.map((available) => (
          <AvailabilityTableRow key={available.id} available={available} />
        ))}
      </TableBody>
    </Table>
  );
};

export default TutorAvailabilityTable;
