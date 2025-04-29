// src/components/StatCard.tsx
'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { BarChart3 } from 'lucide-react'

interface Props {
  title: string
  value: string | number
  icon?: React.ComponentType<{ size?: number; className?: string }>
}

export function StatCard({ title, value, icon: Icon = BarChart3 }: Props) {
  return (
    <Card className="transition-shadow hover:shadow-cardHover">
      <CardHeader className="flex items-center gap-3">
        <Icon className="text-brand" size={20} />
        <CardTitle className="text-sm">{title}</CardTitle>
      </CardHeader>
      <CardContent className="text-2xl font-semibold">{value}</CardContent>
    </Card>
  )
}
