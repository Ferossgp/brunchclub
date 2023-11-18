import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { interests, objectives } from "./constants"
import { Avatar } from "@/components/ui/avatar"

export default function Component() {
  return (
    <div className="w-full max-w-3xl mx-auto space-y-6">
      <h1 className="text-3xl font-bold text-center">Profile Configuration</h1>
      <p className="text-zinc-500 dark:text-zinc-400 text-center">
        Customize your profile to get the most out of your brunch club chats
      </p>
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="avatar">Avatar</Label>
          <div className="flex justify-center space-x-4 items-center">
            <Avatar />
          </div>
        </div>
        <div className="space-y-2">
          <Label htmlFor="bio">Bio</Label>
          <Textarea className="min-h-[100px]" id="bio" placeholder="Tell us a little bit about yourself" />
        </div>
        <div className="space-y-2">
          <div>
            <p className="font-bold text-base">Objectives</p>
            <p className="text-base">Select up to 3 objectives. These will help us find relevant matches.</p>
          </div>
          <div className="flex flex-wrap gap-2" id="objectives">
            {objectives.map((item, index) => (
              <Button className="py-1 px-2 rounded" variant="outline" key={index}>
                {item.title}
              </Button>
            )
            )}
          </div>
        </div>
        <div className="space-y-2">
          <div>
            <p className="font-bold text-base">Interests and expertise</p>
            <p className="text-base">These will be public and users can attest them after a chat with you!</p>
          </div>
          <div className="flex flex-wrap gap-2" id="interests">
            {interests.map((item, index) => (
              <Button className="py-1 px-2 rounded" variant="outline" key={index}>
                {item.title}
              </Button>)
            )}
          </div>
        </div>
        <Button className="w-full" type="submit">
          Save Profile
        </Button>
      </div>
    </div>
  )
}

