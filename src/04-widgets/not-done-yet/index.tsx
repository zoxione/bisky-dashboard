import { SettingsIcon } from "lucide-react"

const NotDoneYet = () => {
  return (
    <div className=" h-full w-full flex flex-col items-center justify-center">
      <h2 className="scroll-m-20 mb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0 text-center">
        Functionality in development
      </h2>

      <p className="leading-7">
        Sorry, this feature is not ready yet. We are working on it and it will
        be available soon.
      </p>
      <SettingsIcon className="mt-6 animate-spin" size={80} />
    </div>
  )
}

export default NotDoneYet
