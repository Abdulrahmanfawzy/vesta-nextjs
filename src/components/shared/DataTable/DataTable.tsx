import { Pagination } from "@/components/ui/pagination";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Column, ReturnRequest } from "@/features/returns/types/types";
const DataTable = ({
  column,
  data,
}: {
  column: Column[];
  data: ReturnRequest[];
}) => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          {column.map((item: Column) => (
            <TableHead
              key={item.accessorKey}
              className="w-25 text-[22px] text-primary font-semibold "
            >
              {item.header}
            </TableHead>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((item: ReturnRequest) => (
          <TableRow key={item.id}>
            <TableCell className="font-medium">
              <img
                className="w-20 h-20"
                src={item.image.src}
                alt="this Image Product Refund "
              />{" "}
            </TableCell>
            <TableCell className="font-medium">
              {item.ReturnRequestID}{" "}
            </TableCell>
            <TableCell className="font-medium">{item.orderId} </TableCell>
            <TableCell className="font-medium">{item.itemID}</TableCell>
            <TableCell className="font-medium">{item.RequestDate}</TableCell>
            <TableCell className="font-medium">{item.status}</TableCell>
            <TableCell className="font-medium">{item.Action}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default DataTable;
