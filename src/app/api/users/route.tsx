import { createConnection } from "../../../../lib/db";
import { NextResponse } from "next/server";

export const GET = async () => {
  const qry = "SELECT * FROM users";
  try {
    const data = await createConnection({
      query: qry,
      values: [],
    });
    return NextResponse.json(
      {
        status: 200,
        data: data,
      },
      { status: 200 }
    );
  } catch (err) {
    console.error("DB Error:", err);
    return NextResponse.json(
      { error: "Failed to fetch data" },
      { status: 500 }
    );
  }
};

export const POST = async (req: Request) => {
  const { name, email, password, phone, surname, user_image } = await req.json();
  const qry = "INSERT INTO users (name, email, password, phone, surname, user_image) VALUES (?, ?, ?, ?, ?, ?)";
  try {
    const result = await createConnection({
      query: qry,
      values: [name, email, password, phone, surname, user_image],
    });

    // If your DB returns insertId, fetch the new user
    let newUser = null;
    if (result.insertId) {
      const userQry = "SELECT * FROM users WHERE id = ?";
      const userData = await createConnection({
        query: userQry,
        values: [result.insertId],
      });
      newUser = userData[0];
    }

    return NextResponse.json(
      {
        status: 201,
        message: "User created successfully",
        data: newUser || result,
      },
      { status: 201 }
    );
  } catch (err) {
    console.error("DB Error:", err);
    return NextResponse.json(
      { error: "Failed to create user" },
      { status: 500 }
    );
  }
}