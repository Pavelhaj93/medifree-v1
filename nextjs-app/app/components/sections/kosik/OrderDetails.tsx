"use client";

import { useSearchParams } from "next/navigation";
import React from "react";

const OrderDetails = ({ orderNumberLabel }: { orderNumberLabel: string }) => {
  const params = useSearchParams();
  const sessionId = params.get("session_id");

  return (
    sessionId && (
      <div className="text-xs text-gray-500 mb-6">
        {orderNumberLabel} {sessionId.slice(-8).toUpperCase()}
      </div>
    )
  );
};

export default OrderDetails;
