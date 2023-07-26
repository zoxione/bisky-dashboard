import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/01-shared/ui/card"
import AuthForm from "@/04-widgets/auth-form"

import Image from "next/image"

import Logo from "/public/favicon-64x64.png"

export default function AuthPage() {
  return (
    <main className="flex flex-col items-center justify-center p-4 min-h-screen">
      <Card className="max-w-[360px] w-full">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl text-center">
            Login to Bisky Dashboard
          </CardTitle>
          <CardDescription>
            Only admins or moderators can login.
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          <Image src={Logo} alt="bisky-logo" className="mx-auto" />
          <AuthForm />
        </CardContent>
      </Card>
    </main>
  )
}
