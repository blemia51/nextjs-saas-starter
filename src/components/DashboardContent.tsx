'use client'

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { StatCard } from '@/components/StatCard'
import {
  CreditCard,
  Cpu,
  TrendingUp,
  Wallet,
} from 'lucide-react'

export function DashboardContent() {
  return (
    <main className="space-y-10">
      {/* ───── 1 • Top stat cards ───────────────────────────── */}
      <section className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
        <StatCard title="Monthly MRR"   value="€ 4920" icon={TrendingUp} />
        <StatCard title="Active Plan"    value="Pro €9" icon={CreditCard} />
        <StatCard title="API Requests"   value="1 239"  icon={Cpu} />
        <StatCard title="Invoices paid"  value="24"     icon={Wallet} />
      </section>

      {/* ───── 2 • Plan & Usage cards ──────────────────────── */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="hover:shadow-cardHover">
          <CardHeader>
            <CardTitle>Active Plan</CardTitle>
          </CardHeader>
          <CardContent className="text-lg">Pro – €9 / month</CardContent>
        </Card>

        <Card className="hover:shadow-cardHover">
          <CardHeader>
            <CardTitle>Usage Stats</CardTitle>
          </CardHeader>
          <CardContent className="text-lg">
            API Calls: 1 239 this month
          </CardContent>
        </Card>
      </section>

      {/* ───── 3 • Invoices table ──────────────────────────── */}
      <Card className="hover:shadow-cardHover overflow-x-auto">
        <CardHeader>
          <CardTitle>Recent Invoices</CardTitle>
        </CardHeader>
        <CardContent>
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-black/5 dark:border-white/10 text-left">
                <th className="py-2">Date</th>
                <th>Amount</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {[
                { date: '2025-04-01', amount: '€9.00', status: 'Paid' },
                { date: '2025-03-01', amount: '€9.00', status: 'Paid' },
              ].map((inv) => (
                <tr
                  key={inv.date}
                  className="border-b border-black/5 dark:border-white/10 last:border-0"
                >
                  <td className="py-2">{inv.date}</td>
                  <td>{inv.amount}</td>
                  <td>{inv.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardContent>
      </Card>
    </main>
  )
}
