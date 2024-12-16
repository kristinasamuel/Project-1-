// A project to find and display group members; if not found, an error message is shown
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
  profession: string;
  skills: string;
}
export default function Project() {
  const [rollNumber, setRollNumber] = useState("");
  const [member, setMember] = useState<Members | null>(null);
  const [error, setError] = useState("");

  // check the members in this group
  const handleCheckMember = async () => {
    // We use trim() to remove whitespace 
    if (!rollNumber.trim()) {
      setError("please enter your roll number");
      setMember(null);
      return;
    }
    try {
      // fetch data from members.json
      const responce = await fetch("/members.json");
      const parsedResponce: Members[] = await responce.json();
      // find the members
      const foundMember = parsedResponce.find(
        (m) => m.rollNumber === parseInt(rollNumber)
      );
      // We use an if-else condition to display a welcome message when the member is found;
      // otherwise, an error message is shown
      if (foundMember) {
        setMember(foundMember);
        setError("");
      } else {
        setMember(null);
        setError("you are not a member of team zeta group");
      }
    } catch (err) {
      console.error("error fetching to find a member:", err);
      setError("Please verify your roll number and try again.");
    }
  };
  return (
    <div className="flex flex-col items-center justify-center bg-black h-screen p-4">
      <Card className="w-full max-w-md mx-auto flex flex-col justify-center items-center ">
        <CardHeader>
          <h2 className="text-[26px] font-semibold text-center mb-2">
            GIAIC THURSDAY MORNING (9 TO 12).
          </h2>
          <CardTitle className="text-[32px] text-center font-bold uppercase mt-4 ">
            Team Zeta
          </CardTitle>
          <CardDescription className="text-[16px] text-center text-gray-700  ">
            Are you a part of Team Zeta? Check now!
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div>
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
              className="text-[18px] mt-4 bg-neutral-700 hover:bg-neutral-600 text-white font-bold rounded w-full h-auto"
            >
              Enter
            </Button>
          </div>
        </CardContent>
        <CardFooter className="text-center">
          {member ? (
            <div className="space-y-2">
              <p className="text-[23px] font-semibold">
                Welcome, {member.name}!
              </p>
              <p>Title:{member.profession} </p>
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
