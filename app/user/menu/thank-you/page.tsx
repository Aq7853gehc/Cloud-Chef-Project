import { Button } from "@/components/ui/button";
import {  CheckIcon } from "lucide-react";
import Link from "next/link";
import React from "react";

const ThankYou = () => {
  return (
    <div className="text-5xl flex flex-col items-center justify-center h-screen w-full font-medium gap-2 ">
      <h1 className=" py-2 font-bold flex gap-2 items-center">
        {" "}
        <CheckIcon className="w-10 h-10 text-green-500 " />
        Order Placed!
      </h1>
      <div>
        {" "}
        Thank You for using
        <span className="text-green-500 px-2"> Cloud Chef.</span>
      </div>

      <Link href={"/user/menu"}>
        <Button className="text-green-500 text-sm mt-6" variant={"outline"}>
          Order More
        </Button>
      </Link>
    </div>
  );
};

export default ThankYou;
