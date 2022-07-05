import Head from 'next/head'
import { Button, Code, Flex, Heading, Icon, Text } from '@chakra-ui/react'
import { useAuth } from '@/lib/auth'
import EmptyState from '@/components/EmptyState'
import SiteTableSkeleton from '@/components/SiteTableSkeleton'
import DashboardShell from '@/components/DashboardShell'

export default function Dashboard() {
  const auth = useAuth()

  if (!auth.user) {
    return (
      <DashboardShell>
        <SiteTableSkeleton />
      </DashboardShell>
    )
  }
  return (
    <DashboardShell>
      <EmptyState />
    </DashboardShell>
  )
}
