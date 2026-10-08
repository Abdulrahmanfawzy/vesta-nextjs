"use client";
import Image from "next/image";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { MoreHorizontal } from "lucide-react";
type RefundDetails = {
  orderId: string;
  productName: string;
  image: string;
  refundReason: string;
  refundAmount: number;
  status: string;
  RequestDate: string;
  refundDate: string;
};
type Props = { refund: RefundDetails };
const RefundDetailsDialog = ({ refund }: Props) => {
  return (
    <Dialog>
      <DialogTrigger asChild  >
           <Button variant="outline" size="sm">
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>Refund Details</DialogTitle>{" "}
        </DialogHeader>{" "}
        <div className="flex items-center gap-4">
          <Image
            src={refund.image}
            alt={refund.productName}
            width={96}
            height={96}
            className="h-24 w-24 rounded-lg object-contain"
          />{" "}
          <div>
            {" "}
            <h3 className="font-semibold"> {refund.productName} </h3>{" "}
            <p className="text-sm text-muted-foreground">
              {" "}
              Order ID: {refund.orderId}{" "}
            </p>{" "}
    
          </div>{" "}
        </div>{" "}
        <div className="space-y-3 rounded-lg border p-4 text-sm">
          {" "}
          <div className="flex justify-between gap-4">
            {" "}
            <span className="text-muted-foreground">Status</span>{" "}
            <span className="font-medium">{refund.status}</span>{" "}
          </div>{" "}
          <div className="flex justify-between gap-4">
            {" "}
            <span className="text-muted-foreground">Refund Reason</span>{" "}
            <span>{refund.refundReason}</span>{" "}
          </div>{" "}
          <div className="flex justify-between gap-4">
            {" "}
            <span className="text-muted-foreground">Request Date</span>{" "}
            <span>{refund.RequestDate}</span>{" "}
          </div>{" "}
          <div className="flex justify-between gap-4">
            {" "}
            <span className="text-muted-foreground">Refund Date</span>{" "}
            <span>{refund.refundDate || "Not processed yet"}</span>{" "}
          </div>{" "}
        </div>{" "}
      </DialogContent>{" "}
    </Dialog>
  );
};
export default RefundDetailsDialog;
