import { db } from "@/configs/FirebaseConfig";

import {
  doc,
  getDoc,
  setDoc
} from "firebase/firestore";

import { NextResponse } from "next/server";

export async function POST(req) {

  try {

    const body = await req.json();

    console.log("BODY:", body);

    const { userEmail, userName } = body;

    // Validation

    if (!userEmail || !userName) {

      return NextResponse.json(
        {
          error: "Missing user data"
        },
        {
          status: 400
        }
      );
    }

    // User reference

    const userRef = doc(
      db,
      "users",
      userEmail
    );

    // Check existing user

    const userSnap = await getDoc(userRef);

    if (userSnap.exists()) {

      console.log("USER EXISTS");

      return NextResponse.json(
        userSnap.data()
      );
    }

    // New user data

    const data = {

      name: userName,

      email: userEmail,

      credits: 5

    };

    // Save user

    await setDoc(
      userRef,
      data
    );

    console.log("USER CREATED");

    return NextResponse.json(data);

  } catch (e) {

    console.log(
      "FIREBASE ERROR:",
      e
    );

    return NextResponse.json(
      {
        error: e.message
      },
      {
        status: 500
      }
    );
  }
}