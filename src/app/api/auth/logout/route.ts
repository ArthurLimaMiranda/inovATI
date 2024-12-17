//Esse arquivo é usado como rota para deslogar um usuário

import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest){  
  //Redireciona o usuário para a home
  const response = NextResponse.redirect(new URL('/', request.url))
  //Remove seu token de login
  response.cookies.delete('engsoft.token')
  return response
}