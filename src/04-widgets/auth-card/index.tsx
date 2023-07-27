import Image from "next/image"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/01-shared/ui/card"

import Logo from "/public/favicon-64x64.png"

import AuthForm from "@/03-features/auth-form"

const AuthCard = () => {
  return (
    <Card className="max-w-[360px] w-full">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl text-center">
          Login to Bisky Dashboard
        </CardTitle>
        <CardDescription>Only admins or moderators can login.</CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4">
        <Image src={Logo} alt="bisky-logo" className="mx-auto" />
        <AuthForm />
      </CardContent>
    </Card>
  )
}

export default AuthCard
