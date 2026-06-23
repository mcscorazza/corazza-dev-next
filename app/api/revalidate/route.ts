import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";

export async function GET(request: NextRequest) {
  const path = request.nextUrl.searchParams.get("path");
  const token = request.nextUrl.searchParams.get("token");

  const secretToken = process.env.REVALIDATION_TOKEN;

  if (token !== secretToken) {
    return NextResponse.json(
      { message: "Acesso Negado: Token inválido ou ausente." },
      { status: 401 },
    );
  }

  if (path) {
    try {
      revalidatePath(path);
      return NextResponse.json({ revalidated: true, path, now: Date.now() });
    } catch (err) {
      return NextResponse.json(
        { message: "Erro ao revalidar o path fornecido." },
        { status: 500 },
      );
    }
  }

  return NextResponse.json(
    { revalidated: false, message: 'Falta o parâmetro "path" na URL.' },
    { status: 400 },
  );
}
