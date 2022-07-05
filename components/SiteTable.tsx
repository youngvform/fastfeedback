import React from 'react'
import { Box, Skeleton } from '@chakra-ui/react'
import { Table, Tr, Th, Td } from './Table'
import { SavedSiteData } from '@/lib/types'
import Link from 'next/link'
import { format, parseISO } from 'date-fns'

const TableRow = ({ name, url, createdAt }: Omit<SavedSiteData, 'id'>) => (
  <Box as="tr">
    <Td fontWeight="medium">{name}</Td>
    <Td>{url}</Td>
    <Td>
      <Link href={url}>
        <a>View Feedback</a>
      </Link>
    </Td>
    <Td>{format(parseISO(createdAt), 'Y년 M월 d일 a h시 m분')}</Td>
  </Box>
)

const SiteTable = ({ sites }: { sites: SavedSiteData[] }) => {
  return (
    <Table>
      <thead>
        <Tr>
          <Th>Name</Th>
          <Th>Site Link</Th>
          <Th>Feedback Link</Th>
          <Th>Date Added</Th>
          <Th></Th>
        </Tr>
      </thead>
      <tbody>
        {sites.map((site) => (
          <TableRow
            key={site.id}
            name={site.name}
            authorId={site.authorId}
            createdAt={site.createdAt}
            url={site.url}
          />
        ))}
      </tbody>
    </Table>
  )
}

export default SiteTable
