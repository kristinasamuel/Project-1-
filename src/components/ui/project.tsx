"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "./input";
import { useState } from "react";
import { Button } from "./button";

interface Members {
  rollNumber: number;
  name: string;
  email: string;
}
export default function Project() {
  const [rollNumber, setRollNumber] = useState("");
  const [member, setMember] = useState<Members | null>(null);
  const [error, setError] = useState("");
  const [isLoading , setIsLoading] = useState(false)

  const handleCheckMember = async () => {
    if (!rollNumber.trim()) {
      setError("please enter your roll number");
      setMember(null);
      return;
    }
    if(parseInt(rollNumber ,10) <0){
      setError("roll number cannot be negative")
      setMember(null)
      return;
    }
    try {
      //  fetch the data members
      const responce = await fetch("/members.json");
      const parsedResponce: Members[] = await responce.json();
      //  find the roll number
      const foundMember = parsedResponce.find(
        (m) => m.rollNumber === parseInt(rollNumber, 10)
      );
      if (foundMember) {
        setMember(foundMember);
        setError("");
      } else {
        setMember(null);
        setError("you are not a member of team zeta group");
      }
    } catch (err) {
      console.error("error fetching to find a member: ", err);
      setError("Please verify your roll number and try again.");
    } finally{
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center bg-black min-h-screen p-4">
      <Card className="w-full max-w-md mx-auto flex  flex-col justify-center items-center ">
        <CardHeader>
          <h2 className="text-[26px] font-semibold text-center">
            GIAIC THURSDAY MORNING (9 TO 12).{" "}
          </h2>
          <CardTitle className="text-[32px]  text-center font-bold uppercase mt-4 ">
            Team Zeta
          </CardTitle>
          <CardDescription className="text-[16px] text-center text-gray-700  ">
          Are you a part of Team Zeta? Check now! 
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-col ">
            <Input
              id="rollNumber"
              type="number"
              placeholder="Your Roll Number"
              value={rollNumber}
              onChange={(e) => setRollNumber(e.target.value)}
              className="p-2 "
            />
            <Button
              onClick={handleCheckMember}
              className="text-[18px] mt-4 bg-neutral-700 hover:bg-neutral-600 text-white font-bold rounded"
            >
              Enter
            </Button>
          </div>
        </CardContent>
        <CardFooter className="text-center">
          {member ? (
            <div>
              <p className="text-lg font-semibold">Welcome, {member.name}!</p>
              <p></p>
              <p>Email: {member.email}</p>
            </div>
          ) : (
            error && <p className="text-red-500">{error}</p>
          )}
        </CardFooter>
      </Card>
    </div>
  );
}
