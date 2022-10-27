import {
  Table,
  TableCaption,
  TableContainer,
  Tbody,
  Td,
  Tfoot,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react'
import React from 'react'
export const TransactionTab = () => {
  const data = [
    {
      from: '0x785373cd490',
      to: '0xf8537vf349vf5',
      value: '0.000003',
    },
    {
      from: '0x785373cd490',
      to: '0xf8537vf349vf5',
      value: '0.000003',
    },
    {
      from: '0x785373cd490',
      to: '0xf8537vf349vf5',
      value: '0.000003',
    },
    {
      from: '0x785373cd490',
      to: '0xf8537vf349vf5',
      value: '0.000003',
    },
    {
      from: '0x785373cd490',
      to: '0xf8537vf349vf5',
      value: '0.000003',
    },
  ]
  return (
    <TableContainer w="full">
      <Table variant="simple">
        <Thead>
          <Tr>
            <Th>From</Th>
            <Th>To</Th>
            <Th isNumeric>Value</Th>
          </Tr>
        </Thead>
        <Tbody>
          {data.map((el, index) => {
            return (
              <Tr key={index}>
                <Td>{el?.from}</Td>
                <Td>{el?.to}</Td>
                <Td isNumeric>{el.value}</Td>
              </Tr>
            )
          })}
        </Tbody>
        <Tfoot>
          <Tr>
            <Th>From</Th>
            <Th>To</Th>
            <Th isNumeric>Value</Th>
          </Tr>
        </Tfoot>
      </Table>
    </TableContainer>
  )
}
