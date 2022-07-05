import Head from 'next/head'
import { Button, Code, Flex, Heading, Icon, Text } from '@chakra-ui/react'
import { useAuth } from '@/lib/auth'
import EmptyState from '@/components/EmptyState'
import SiteTableSkeleton from '@/components/SiteTableSkeleton'
import DashboardShell from '@/components/DashboardShell'
import useSWR from 'swr'
import fetcher from '@/utils/fetcher'
import { SavedSiteData } from '@/lib/types'
import SiteTable from '@/components/SiteTable'

export default function Dashboard() {
  const auth = useAuth()
  const { data } = useSWR<{ sites: SavedSiteData[] }>('/api/sites', fetcher)
  console.log(`yoyoyoyoyo dashboard: data `, data)
  if (!data) {
    return (
      <DashboardShell>
        <SiteTableSkeleton />
      </DashboardShell>
    )
  }
  return (
    <DashboardShell>
      {data.sites ? <SiteTable sites={data.sites} /> : <EmptyState />}
    </DashboardShell>
  )
}
