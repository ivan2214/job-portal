'use client'

import { Button } from "@/components/ui/button"
import { useRouter, useSearchParams } from 'next/navigation'

export default function ApplicationsPagination() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const currentPage = parseInt(searchParams.get('page') || '1')

  const handlePageChange = (newPage: number) => {
    const params = new URLSearchParams(searchParams)
    params.set('page', newPage.toString())
    router.push(`/admin/applications?${params.toString()}`)
  }

  return (
    <div className="flex justify-center space-x-2 mt-6">
      <Button
        variant="outline"
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        Previous
      </Button>
      <Button variant="outline" disabled>
        Page {currentPage}
      </Button>
      <Button
        variant="outline"
        onClick={() => handlePageChange(currentPage + 1)}
      >
        Next
      </Button>
    </div>
  )
}

