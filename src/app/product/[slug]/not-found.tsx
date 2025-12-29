import Link from "next/link"

import { Button } from "@/components/elements/Button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function NotFound() {
  return (
    <div className="base-container py-10">
      <Card className="border-border-primary shadow-card">
        <CardHeader>
          <CardTitle className="text-text-primary">محصول پیدا نشد</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-text-secondary text-sm">
            آگهی/محصول مورد نظر وجود ندارد یا حذف شده است.
          </p>
          <Button asChild>
            <Link href="/">بازگشت به صفحه اصلی</Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
