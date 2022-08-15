import Head from 'next/head'
import { Button, Code, Flex, Heading, Icon, Text } from '@chakra-ui/react'
import { useAuth } from '@/lib/auth'
import EmptyState from '@/components/EmptyState'
import SiteTableSkeleton from '@/components/SiteTableSkeleton'
import DashboardShell from '@/components/DashboardShell'
import useSWR from 'swr'
import fetcher from '@/utils/fetcher'
import { GetSitesResponse } from '@/lib/types'
import SiteTable from '@/components/SiteTable'
import { API_SITES } from '@/lib/apis'

export default function Dashboard() {
  const auth = useAuth()
  const { data } = useSWR<GetSitesResponse>(API_SITES, fetcher)
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
